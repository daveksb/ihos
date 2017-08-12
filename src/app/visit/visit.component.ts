import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    templateUrl: './visit.component.html',
    styleUrls: ['./visit.component.css']
})

export class VisitComponent implements OnInit {

    regno: any;

    constructor(private route: ActivatedRoute) { }

    ngOnInit() {
        let param: any = this.route.snapshot.params;
        this.regno = param.regno;
        //console.log('param =', param);
    }

}
