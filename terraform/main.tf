module "aws_vpc" {
  source          = "github.com/bozkayasalihx/AWS-VPC-terraform-module"
  networking      = var.networking
  security_groups = var.security_groups
}


resource "aws_eks_cluster" "eks-cluster" {
  name     = var.cluster_config.name
  role_arn = aws_iam_role.EKSClusterRole.arn
  version  = var.cluster_config.version

  vpc_config {
    subnet_ids             = flatten([module.aws_vpc.public_subnets_id, module.aws_vpc.private_subnets_id])
    security_group_ids     = flatten(module.aws_vpc.security_groups_id)
    endpoint_public_access = true
  }

  depends_on = [
    aws_iam_policy_attachment.AmazonEKSClusterPolicy
  ]

  tags = {
    "Name" = "eks-cluster"
  }
}


resource "aws_eks_node_group" "node_ec2" {
  cluster_name    = aws_eks_cluster.eks-cluster.name
  node_group_name = "m1_small_node_group"
  node_role_arn   = aws_iam_role.NodeGroupRole.arn
  subnet_ids      = flatten(module.aws_vpc.private_subnets_id)

  scaling_config {
    desired_size = 1
    max_size     = 2
    min_size     = 0
  }

  ami_type       = "AL2_x86_64"
  instance_types = ["m1.small"]
  capacity_type  = "ON_DEMAND"
  disk_size      = 20

  depends_on = [
    aws_iam_role_policy_attachment.AmazonEKSWorkerNodePolicy,
    aws_iam_role_policy_attachment.AmazonEC2ContainerRegistryReadOnly,
    aws_iam_policy_attachment.AmazonEKS_CNI_Policy
  ]



  tags = {
    "Name" = "eks_node_group"
  }
}
