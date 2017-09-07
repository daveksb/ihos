import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VisitService } from './visit.service'

@Component({
    templateUrl: './visit.component.html',
    styleUrls: ['./visit.component.css']
})

export class VisitComponent implements OnInit {

    regno: any;
    diagReg: any;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private visitService: VisitService
    ) {
    }

    ngOnInit() {
        let param: any = this.route.snapshot.params;
        this.regno = param.regno;

        this.visitService.getDiagreg(this.regno).subscribe(
            res => this.diagReg = res//console.log('get diareg =', res)
        )
        //console.log('param =', param);
    }

}
