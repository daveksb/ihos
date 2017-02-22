import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GridOptions } from 'ag-grid/main';
import { ReportService } from './report.service';


@Component({
    selector: 'report-icd10',
    templateUrl: './report-icd10tm.comp.html',
})

export class ReportICD10tmComp implements OnInit {

    rowData = [];
    private gridOptions: GridOptions;
    item: string[] = ['2277310', '2277420', '2287310', '2331170'];

    constructor(private _service: ReportService) {
    }

    ngOnInit() {
        this._service.getReport1(this.item).subscribe(data => this.rowData = data)
        this.gridOptions = <GridOptions>{};
        this.gridOptions.rowData = this.rowData;
        this.gridOptions.columnDefs = this.createColumnDefs();
        this.gridOptions.enableColResize = true;
        //this.gridOptions.forPrint = true;
        this.gridOptions.enableSorting = true;
    }

    bindGrid(item: string[]) {
        //this.gridOptions.api.refreshView();
        this.gridOptions.api.showLoadingOverlay();
        this._service.getReport1(item).subscribe(data => this.rowData = data)
        //this.gridOptions.api.setRowData(this.rowData);
    }

    private createColumnDefs() {
        return [
            { headerName: "ICD10TM", field: "Item", width: 80 },
            { headerName: "ชื่อรายการ", field: "name", width: 260 },

            {
                headerName: 'มกราคม',
                children: [
                    { headerName: "ราย", field: "jan", width: 50 },
                    { headerName: "งาน", field: "jan2", width: 50 },
                ]
            }, {
                headerName: 'กุมภาพันธ์',
                children: [
                    { headerName: "ราย", field: "feb", width: 50 },
                    { headerName: "งาน", field: "feb2", width: 50 },
                ]
            }, {
                headerName: 'มีนาคม',
                children: [
                    { headerName: "ราย", field: "mar", width: 50 },
                    { headerName: "งาน", field: "mar2", width: 50 },
                ]
            }, {
                headerName: 'เมษายน',
                children: [
                    { headerName: "ราย", field: "apr", width: 50 },
                    { headerName: "งาน", field: "apr2", width: 50 },
                ]
            }, {
                headerName: 'พฤษภาคม',
                children: [
                    { headerName: "ราย", field: "may", width: 50 },
                    { headerName: "งาน", field: "may2", width: 50 },
                ]
            },
            {
                headerName: 'มิถุนายน',
                children: [
                    { headerName: "ราย", field: "jun", width: 50 },
                    { headerName: "งาน", field: "jun2", width: 50 },
                ]
            },
            {
                headerName: 'กรกฎาคม',
                children: [
                    { headerName: "ราย", field: "jul", width: 50 },
                    { headerName: "งาน", field: "jul2", width: 50 },
                ]
            }, {
                headerName: 'สิงหาคม',
                children: [
                    { headerName: "ราย", field: "aug", width: 50 },
                    { headerName: "งาน", field: "aug2", width: 50 },
                ]
            }, {
                headerName: 'กันยายน',
                children: [
                    { headerName: "ราย", field: "sep", width: 50 },
                    { headerName: "งาน", field: "sep2", width: 50 },
                ]
            }, {
                headerName: 'ตุลาคม',
                children: [
                    { headerName: "ราย", field: "oct", width: 50 },
                    { headerName: "งาน", field: "oct2", width: 50 },
                ]
            }, {
                headerName: 'พฤศจิกายน',
                children: [
                    { headerName: "ราย", field: "nov", width: 50 },
                    { headerName: "งาน", field: "nov2", width: 50 },
                ]
            }, {
                headerName: 'ธันวาคม',
                children: [
                    { headerName: "ราย", field: "dec", width: 50 },
                    { headerName: "งาน", field: "dec2", width: 50 },
                ]
            }, {
                headerName: 'รวม',
                children: [
                    { headerName: "ราย", field: "total", width: 70 },
                    { headerName: "งาน", field: "total2", width: 70 },
                ]
            },

        ];
    }

}
