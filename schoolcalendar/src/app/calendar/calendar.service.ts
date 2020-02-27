import { Injectable } from '@angular/core';
import { Observable, throwError, of } from 'rxjs';
import { HttpService } from '../http.service';
// import { Signer } from 'crypto';

@Injectable()
export class CalendarService {
    baseUrl = '';
    AccessToken = '';

    constructor(private httpService: HttpService) { }

    schoolCalendar(search: any): Observable<any> {
        const params = {
            Router: '/api/system/schoolcalendar',
            Method: 'POST',
            Body: {}
        };
        for (const [key, value] of Object.entries(search)) {
            params.Body[key] = value || '';
        }
        return this.httpService.POST<any>(params);
    }

    queryWeeks(after: string, year: string, term: string): Observable<any> {
        const params = {
            Router: '/api/system/schoolcalendarweeks',
            Method: 'POST',
            Body: {
                After: after,
                AcademicYearCode: year || '',
                AcademicTermCode: term || ''
            }
        };
        return this.httpService.POST<any>(params);
    }

    deleteWeeks(recordid: string): Observable<any> {
        const params = {
            Router: '/api/system/schoolcalendardelbyrecordid',
            Method: 'POST',
            Body: {
                RecordId: recordid
            }
        };
        return this.httpService.POST<any>(params);
    }

    // 学年/学期
    queryParameterInit(code: string): Observable<any> {
        let parameter = [];
        parameter.push(code);
        const params = {
            Router: 'web/system/parameter/parameterinit',
            Method: 'POST',
            Body: {
                parameter: parameter
            }
        };
        return this.httpService.POST<any>(params);
    }
}
