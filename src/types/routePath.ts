import { UserTypes } from ".";

export enum Routes {
    REGISTER = "/register",
    LOGIN = "/login",
    ME = "/me",
    VENDOR_REGISTER = "/vendor-register",
    RESET_PASSWORD = "/reset-password",
    FORGOT_PASSWORD = "/forgot-password",
    REFRESH_TOKEN = "/refresh-token",
    PROCESS_INVOICE_UPLOAD = "/process-invoice-upload",
    PROCESS_PS_UPLOAD = "/process-ps-upload",
    CREATE_VENDOR = "/create-vendor",
    CREATE_VENDOR_REGION = "/create-vendor-region",
    CREATE_BUYER = "/create-buyer",
    CREATE_BUYER_SITE = "/create-buyersite",
    CREATE_DEALER = "/create-dealer",
    CREATE_DEALER_SITE = "/create-dealersite",
    CREATE_VDS_RELATION = "/vds-relations",
    CREATE_VDSBS_RELATION = "/vdsbs-relations",
    CREATE_USER_ENTITY = "/create-user-entity",
    CREATE_DEALER_USER_ROUTE = "/create-dealer-user-route",
    CREATE_DEPOSIT = "/create-deposit",
    CREATE_ADVANCE = "/create-advance",
    CREATE_INVOICE = "/create-invoice",
    CREATE_INVOICE_LINE = "/create-invoice_line",
    CREATE_PAYMENT_SCHEDULE = "/create-payment-schedule",
    CREATE_PAYMENT = "/create-payment",
    GET_USER_ACCESS = "/has-user-access",
}

export const accesableRoute = new Map<string, Array<string>>();
accesableRoute.set(UserTypes.BUYER_ADMIN, [
    "access-control",
    "buyer",
    "buyer-site",
]);
accesableRoute.set(UserTypes.DEALER_ADMIN, [
    "access-control",
    "dealer",
    "dealer-site",
]);
accesableRoute.set(UserTypes.VENDOR_ADMIN, [
    "access-control",
    "vendor",
    "vendor-region",
    "relations",
]);
accesableRoute.set(UserTypes.BUYER, ["access-control", "buyer-site"]);
accesableRoute.set(UserTypes.DEALER, ["access-control", "dealer-site"]);
accesableRoute.set(UserTypes.VENDOR, [
    "access-control",
    "vendor",
    "vendor-region",
    "relations",
]);
