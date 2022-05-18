import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { AdvanceStatusType, AdvanceType, Currency } from "../types/types";
import SuperEntity from "./SuperEntity";
import VendorToDealerSiteToBuyerSite from "./VendorToDealerSiteToBuyerSite";

@Entity("advances")
export default class Advance extends SuperEntity {
    @Column({ type: "enum", enum: AdvanceType })
    public advance_type: AdvanceType;

    @Column({ type: "real" })
    public amount: number;

    @Column({ type: "varchar", length: 3 })
    public currency: Currency;

    @Column({ type: "enum", enum: AdvanceStatusType })
    public status: AdvanceStatusType;

    @Column({ type: "timestamp" })
    public approval_date: Date;

    /** relations */
    @ManyToOne(() => VendorToDealerSiteToBuyerSite, (vdsbs) => vdsbs.advances)
    @JoinColumn({ name: "vdsbs_id" })
    public vdsbs: VendorToDealerSiteToBuyerSite;
}
