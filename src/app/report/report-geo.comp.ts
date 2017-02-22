import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GridOptions } from 'ag-grid/main';
import { ReportService } from './report.service';

@Component({
    selector: 'report-geo',
    templateUrl: './report-geo.comp.html',
})

export class ReportGeoComp implements OnInit {

    rowData = [];
    private gridOptions: GridOptions;

    constructor(private _service: ReportService) {
    }

    ngOnInit() {
        this._service.getReportGeo().subscribe(data => this.rowData = data)
        this.gridOptions = <GridOptions>{};
        this.gridOptions.rowData = this.rowData;
        this.gridOptions.columnDefs = this.createColumnDefs();
        this.gridOptions.enableColResize = true;
        //this.gridOptions.forPrint = true;
        this.gridOptions.enableSorting = true;
        this.gridOptions.overlayLoadingTemplate = '<span class="ag-overlay-loading-center">กำลังโหลดข้อมูลรายงาน..</span>';
    }

    bindGrid(item: string[]) {
        this.gridOptions.api.showLoadingOverlay();
        this._service.getReport1(item).subscribe(data => this.rowData = data)
        //this.gridOptions.api.setRowData(this.rowData);
    }

    private createColumnDefs() {
        return [
            { headerName: "รหัส", field: "tambon", width: 80 },
            { headerName: "ตำบล", field: "name", width: 180 },
            { headerName: "มกราคม", field: "jan", width: 70 },
            { headerName: "กุมภาพันธ์", field: "feb", width: 70 },
            { headerName: "มีนาคม", field: "mar", width: 70 },
            { headerName: "เมษายน", field: "apr", width: 70 },
            { headerName: "พฤษภาคม", field: "may", width: 70 },
            { headerName: "มิถุนายน", field: "jun", width: 70 },
            { headerName: "กรกฎาคม", field: "jul", width: 70 },
            { headerName: "สิงหาคม", field: "aug", width: 70 },
            { headerName: "กันยายน", field: "sep", width: 70 },
            { headerName: "ตุลาคม", field: "oct", width: 70 },
            { headerName: "รวม", field: "Total", width: 80 },
        ];
    }



}
