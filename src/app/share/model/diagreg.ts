export class DiagReg {

    public regno: string;
    public hn: string;
    public qno: number;
    public date: Date;
    public time: string;
    public class: string;
    public stclass: string;
    public refer: string;
    public typedate: string;
    public count: number

    public stpatient: number;
    public stdiag: number;
    public stspclinic: number;
    public stsanita: number;
    public stdent: number;
    public sthp: number;
    public stlr: number;
    public ster: number;
    public stxray: number;
    public stlab: number;
    public stadmit: number;
    public stor: number;
    public stherbal: number;
    public stdrug: number;
    public stpay: number;
    public stopd: number;
    public stdrg: number;
    public stdrger: number;
    public stdead: number;
    public stadiag: number;
    public stobs: number;
    public stfree: number;
    public stherbal2: number;
    public stccc: number;
    public stpcard: number;

    public titles: string;
    public name: string;
    public surname: string;
    public an: string;
    public doctor: string;
    public amtpay: number;
    public amtreq: number;
    public amtsdisc: number;
    public netamt: number;
    public nurse: string;
    public datesick: Date;
    public room: string;
    public dateadmit: Date;
    public datedischarge: Date;

    public age: number;
    public hos1: string;
    public hos2: string;
    public noterefer: string;
    public logincode: string;

    constructor() {
        this.stpatient = 1;
        this.stdiag = 1;
        this.stspclinic = 1;
        this.stsanita = 1;
        this.stdent = 1;
        this.sthp = 1;
        this.stlr = 1;
        this.ster = 1;
        this.stxray = 1;
        this.stlab = 1;
        this.stadmit = 1;
        this.stor = 1;
        this.stherbal = 1;
        this.stdrug = 1;
        this.stpay = 1;
        this.stopd = 1;
        this.stdrg = 1;
        this.stdrger = 1;
        this.stdead = 1;
        this.stadiag = 1;
        this.stobs = 1;
        this.stfree = 1;
        this.stherbal2 = 1;
        this.stccc = 1;
        this.stpcard = 1;
    }
}
