import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({ name: 'period' })

export class PeriodPipe implements PipeTransform {

    transform(visitTime: any, args: any[]) {

        let today = moment().format("YYYY-MM-DD");

        if (visitTime) {
            let startDate = new Date(today + ' ' + visitTime).getTime();
            let endDate = new Date().getTime();
            let Diff = endDate - startDate;
            let min = Math.floor(Diff / 60000);
            return min;
        }
        return;
    }

}