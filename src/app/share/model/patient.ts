export class Patient {

    public hn: string;
    public titles: string;
    public name: string;
    public surname: string;
    public lastdate: Date;
    public lastdateTH: string;
    public sex: string;
    public blood: string;
    public birthday: Date;
    public birthdayTH: string;
    public age: number;
    public addr: string;
    public moo: string;
    public tambon: string;
    public ampur: string;
    public province: string;
    public phone: string;
    public father: string;
    public mother: string;
    public contact: string;
    public count: number;
    public class: string;
    public classTH: string;
    public personId: string;
    public marriage: string;
    public occupa: string;
    public occupaTH: string;
    public nation: string;
    public nationTH: string;
    public race: string;
    public raceTH: string;
    public insureCard: string;
    public insureBdate: Date;
    public insureEdate: Date;
    public insBdateTH: string;
    public insEdateTH: string
    public status: string;
    public hos1: string;
    public hos2: string;
    public note: string;
    public todayTH: string;

    constructor(hn: string) {
        this.hn = hn;
    }
}
