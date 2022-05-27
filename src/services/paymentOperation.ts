import {
    Payment,
    PaymentMatches,
    PaymentSchedule,
    PaymentScheduleInterface,
} from "../models";
import BaseService from "./BaseService";

export class PaymentOperation extends BaseService {
    private Models = {
        Payment,
        PaymentMatches,
        PaymentSchedule,
        PaymentScheduleInterface,
    };
    public get paymentRepo() {
        return this.source.getRepository(this.Models.Payment);
    }

    public get PSIRepo() {
        return this.source.getRepository(this.Models.PaymentScheduleInterface);
    }

    public get psRepo() {
        return this.source.getRepository(this.Models.PaymentSchedule);
    }

    public get pmRepo() {
        return this.source.getRepository(this.Models.PaymentMatches);
    }

    public createPSI(params: Partial<PaymentScheduleInterface>) {
        return this.PSIRepo.insert({ ...params });
    }

    public createPayment(params: Partial<Payment>) {
        return this.paymentRepo.insert({ ...params });
    }

    public createPS(params: Partial<PaymentSchedule>) {
        return this.psRepo.insert({ ...params });
    }

    public createPM(params: Partial<PaymentMatches>) {
        return this.pmRepo.insert({ ...params });
    }
}
export default new PaymentOperation();
