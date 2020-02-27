import { Injectable } from '@angular/core';
import { ServelUrl } from "../ServelUrl";

// 服务
import { HttpService } from '../../http/http.service';

// 模型
import { Dept, Search } from './activity';

@Injectable()
export class ActivityService {

    constructor(
        private httpService: HttpService,
    ) { }

    // 精确查询
    queryOne(id: string): Promise<any> {
        return this.httpService.PostJSON({
            Router: ServelUrl.Url.activityone,
            Method: 'POST',
            Body: {
                ACTIVITYID: id
            }
        })
    }

    audit(id: string, result: string, reason: string): Promise<any> {
        return this.httpService.PostJSON({
            Router: ServelUrl.Url.activityaudit,
            Method: 'POST',
            Body: {
                ACTIVITYID: id,
                EXAMINERESULT: result,
                EXAMINEDESC: reason,
            }
        })
    }

    // 统计查询
    queryInfoStatis(id: string, pageindex: number, pagesize: number, search: Search): Promise<any> {
        return this.httpService.PostJSON({
            Router: ServelUrl.Url.infostatistic,
            Method: 'POST',
            Body: {
                INFOID: id,
                // Page: pageindex,
                // Count: pagesize,
                CAMPUS: search.campus || '',
                ACADEMY: search.academy || '',
                MAJOR: search.major || '',
                GRADE: search.grade || '',
                CLASS: search.class || ''
            }
        })
    }

    // 查询学校
    queryUniversity(): Promise<any> {
        return this.httpService.PostJSON({
            Router: ServelUrl.Url.queryuniversity,
            Method: 'POST',
            Body: null
        })
    }

    // 查询校区
    queryCampus(ids: string): Promise<any> {
        const universityids = [ids];
        return this.httpService.PostJSON({
            Router: ServelUrl.Url.querycampus,
            Method: 'POST',
            Body: {
                UniversityID: universityids
            }
        })
    }

    // 查询学院
    queryAcademy(id: string): Promise<any> {
        return this.httpService.PostJSON({
            Router: ServelUrl.Url.queryacademy,
            Method: 'POST',
            Body: {
                University: id
            }
        })
    }

    // 查询专业
    queryMajor(universityid: string, academyids: string[]): Promise<any> {
        return this.httpService.PostJSON({
            Router: ServelUrl.Url.querymajor,
            Method: 'POST',
            Body: {
                University: universityid,
                Academy: academyids
            }
        })
    }

    // 查询年级
    queryGrade(id: string): Promise<any> {
        return this.httpService.PostJSON({
            Router: ServelUrl.Url.querygrade,
            Method: 'POST',
            Body: {
                University: id
            }
        })
    }

    // 查询专业
    queryClass(universityid: string, majorids: string[], gradeids: string[]): Promise<any> {
        return this.httpService.PostJSON({
            Router: ServelUrl.Url.queryclass,
            Method: 'POST',
            Body: {
                University: universityid,
                Major: majorids,
                Grade: gradeids
            }
        })
    }

}
