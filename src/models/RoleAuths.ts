import { Column, Entity, Index } from "typeorm";
import { UserTypes } from "../types/types";
import SuperEntity from "./SuperEntity";

@Entity("role_auths")
@Index(["role_name", "route_name"], { unique: true })
export default class RoleAuth extends SuperEntity {
    @Column({ type: "enum", enum: UserTypes, name: "role_name" })
    role_name: UserTypes;

    @Column({ type: "varchar", length: 100, name: "route_name" })
    route_name: string;

    @Column({ array: true, type: "varchar", name: "route_method" })
    route_method: Array<string>;
}
