import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Headers, RequestOptions } from '@angular/http';
import { HttpService } from './http.service';

export class Status {
    CheckinStatus: number;
}
export class Campus {
    CampusLogo: string;
    CampusName: string;
}
export class CheckIndetails {
    ReportedNum: number;
    RecruitNum: number;
    ReportedRate: string;
    Peoples: any[];
    Academys: AcademyElem[];
    Time: string;
}

export class FlyPeople {
    Name: string;
    AcademyName: string;
    State: string;
    Show: boolean;
    constructor(public id: number) {
    }

}

export class FlyAcademy {
    // Show: boolean;
    // Empty = true;
    One: FlyAcademyItem;
    Two: FlyAcademyItem;
    constructor(public id: number) {
        this.One = new FlyAcademyItem('in');
        this.Two = new FlyAcademyItem('out');
    }

    next(elem: AcademyElem): void {
        this.Two.Elem = elem;
        this.One.State = 'out';
        this.Two.State = 'in';
    }
    chgEnd(): void {
        this.One.State = 'in';
        this.Two.State = 'out';
        this.One.Elem = this.Two.Elem;
    }
}
export class FlyAcademyItem {

    Elem: AcademyElem = new AcademyElem('', '', 0, 0, '');
    constructor(public State: String) {
    }

}
export class AcademyElem {

    constructor(public AcademyCode: string, public AcademyName: string, public RecruitNum: number, public ReportedNum: number, public ReportedRate: string) {
    }

}
export class QueryResult<T> {
    constructor(public FeedbackCode: string, public FeedbackText: string, public Data: T) {
    }
}

@Injectable()
export class AppService {
    constructor(private httpService: HttpService) { }

    // 报道状态
    queryRegStatus(): Promise<QueryResult<Status>> {
        return this.httpService.postJSON<QueryResult<Status>>('/pc/yxcheckinthrow/status', null);
    }

    // 校名、校徽
    queryCampus(): Promise<QueryResult<Campus>> {
        return this.httpService.postJSON<QueryResult<Campus>>('/pc/yxcheckinthrow/campus', null);
    }

    // 实时报到数据
    queryCheckDetails(time?: string): Promise<QueryResult<CheckIndetails>> {
        const body = {
            Time: ''
        };
        if (time) {
            body.Time = time;
        }
        return this.httpService.postJSON<QueryResult<CheckIndetails>>('/pc/yxcheckinthrow/details', body);
    }


}