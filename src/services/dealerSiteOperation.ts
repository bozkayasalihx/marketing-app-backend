import { appDataSource } from "../loaders";
import { DealerSite } from "../models";

export class DealerSiteOperation {
    private get source() {
        return appDataSource;
    }

    public get repo() {
        return this.source.getRepository(DealerSite);
    }

    public async insertDealerSite(params: Partial<DealerSite>) {
        const dealerSite = await this.repo.insert(params);
        return dealerSite;
    }

    public createDealerSite(params: Partial<DealerSite>) {
        return this.repo.create(params);
    }

    public async updateDealerSite(params: Partial<DealerSite>) {
        const dealerSite = await this.repo.save(params);
        return dealerSite;
    }
}

export default new DealerSiteOperation();
