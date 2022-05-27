//@ts-nocheck
import path from "path";
import { DataSource } from "typeorm";
import SnakeNamingStrategy from "../configs/typeormNamingStrategy";
import { InvoiceInterface, PaymentScheduleInterface } from "../models";
import { __prod__ } from "../scripts/dev";
import { UserCreateSubs } from "../subscribers/userSubs";

const entityDir = path.join(__dirname, "../../dist/models/*.js");
const subsDir = path.join(__dirname, "../../dist/subscribers/*.js");
const migrationDir = path.join(__dirname, "../../dist/migrations/*.js");

export const appDataSource = new DataSource({
    type: "postgres",
    database: process.env.DB_NAME,
    host: process.env.HOST,
    port: +process.env.DB_PORT,
    username: process.env.DB_USER as string,
    password: process.env.DB_PASSWORD,
    namingStrategy: new SnakeNamingStrategy(),
    synchronize: true,
    entities: [entityDir],
    subscribers: !__prod__ ? [UserCreateSubs] : undefined,
    migrations: !__prod__ ? [migrationDir] : undefined,
    logger: "advanced-console",
});

const connectDb = async () => {
    await appDataSource.initialize();
    await appDataSource
        .getRepository(InvoiceInterface)
        .query(
            `CREATE SEQUENCE IF NOT EXISTS invoice_file_process_id INCREMENT 1 START 1;`
        );
    await appDataSource
        .getRepository(PaymentScheduleInterface)
        .query(
            `CREATE SEQUENCE IF NOT EXISTS ps_file_process_id INCREMENT 1 START 1;`
        );
};
export { connectDb };
