import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GridOptions } from 'ag-grid/main';
import { ReportService } from './report.service';

@Component({
    selector: 'report-age',
    templateUrl: './report-age.comp.html',
    styleUrls: ['./report.css'],
})

export class ReportAgeComp implements OnInit {

    rowData = [];
    private gridOptions: GridOptions;
    data: any;
    data2: any;

    constructor(private _service: ReportService) {
        this.data = {
            labels: ['2556', '2557', '2558', '2559', '2560'],
            datasets: [
                {
                    label: 'คน',
                    data: [3608, 4096, 4117, 4490, 199],
                    backgroundColor: '#42A5F5',
                },
                {
                    label: 'ครั้ง',
                    data: [6610, 7689, 8039, 9185, 221],
                    backgroundColor: '#9CCC65',
                }
            ]
        }

        this.data2 = {
            labels: ['2556', '2557', '2558', '2559', '2560'],
            datasets: [
                {
                    label: '0-2',
                    data: [173, 196, 226, 264, 1],
                    backgroundColor: '#42A5F5',
                },
                {
                    label: '3-5',
                    data: [200, 225, 275, 281, 4],
                    backgroundColor: '#9CCC65',
                },
                {
                    label: '6-12',
                    data: [496, 606, 645, 733, 23],
                    backgroundColor: '#F1C40F',
                },
                {
                    label: '33-59',
                    data: [2274, 2537, 2379, 2505, 122],
                    backgroundColor: '#C769F3',
                },
                {
                    label: '>60',
                    data: [460, 529, 587, 704, 49],
                    backgroundColor: '#F14A5E',
                }
            ]
        }
    }

    ngOnInit() {
        this._service.getReportAge().subscribe(data => this.rowData = data)
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
            { headerName: "กลุ่มอายุ (ปี)", field: "age", width: 80 },
            { headerName: "ตุลาคม", field: "oct", width: 70 },
            { headerName: "พฤศจิกายน", field: "nov", width: 70 },
            { headerName: "ธันวาคม", field: "dec", width: 70 },
            { headerName: "มกราคม", field: "jan", width: 70 },
            { headerName: "กุมภาพันธ์", field: "feb", width: 70 },
            { headerName: "มีนาคม", field: "mar", width: 70 },
            { headerName: "เมษายน", field: "apr", width: 70 },
            { headerName: "พฤษภาคม", field: "may", width: 70 },
            { headerName: "มิถุนายน", field: "jun", width: 70 },
            { headerName: "กรกฎาคม", field: "jul", width: 70 },
            { headerName: "สิงหาคม", field: "aug", width: 70 },
            { headerName: "กันยายน", field: "sep", width: 70 },
            { headerName: "รวม", field: "Total", width: 80 },
        ];
    }

}
