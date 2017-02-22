import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'period' })

export class PeriodPipe implements PipeTransform {

    transform(visitDate: any, args: any[]) {

        if (visitDate) {
            let startDate = new Date(visitDate).getTime();
            let endDate = new Date().getTime();
            let Diff = endDate - startDate;
            let min = Math.floor(Diff / 60000);
            return min;
        }
        return;
    }

}