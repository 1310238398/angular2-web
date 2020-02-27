import { Injectable } from "@angular/core";
import { HttpService } from "../../http/http.Service";
import { ServelUrl } from "../ServelUrl";
/**
 * Created by hanzhendong on 2017/1/13.
 */
@Injectable()
export class CommonService {
    private pushFlag:boolean=false;
    constructor(private http: HttpService) {

    }
     getPushFlag() {
        return this.pushFlag;
    }

     setPushFlag() {
        this.pushFlag = true;
    }
    /**
     * 获取用户信息
     */
    getUserInfo(): any {
        this.http.postJSON({
            Router: ServelUrl.Url.queryleavestudentmessage,
            Method: 'POST',
            Body: {}
        }).then(
            comments => {
                if (!comments.FeedbackCode) {
                    return comments
                }
            });
    }

    /**
     * 获取学生销假位置及不批准原因
     * @param params
     * @returns {Promise<TResult>}
     * @return array[lan，lon]
     */
    getStudentApplyLocationAndAuthReason(params): Promise<any> {
        return this.http.postJSON({
            Router: ServelUrl.Url.queryapplyrefuse,
            Method: 'POST',
            Body: params
        }).then(comments => {
            if (!comments.FeedbackCode) {
                return comments;
            }
        });
    }

    /**
     * 获取学校位置
     *@return obj{center,radius}
     */
    getSchoolLocation(): Promise<any> {
        return this.http.postJSON({
            Router: ServelUrl.Url.QueryCampusLocation,
            Method: 'POST',
            Body: {}
        }).then(comments => {
            if (!comments.FeedbackCode) {
                return comments;
            }
        });
    }

    getStudentLeaveApply(params): Promise<any> {
        return this.http.postJSON({
            Router: ServelUrl.Url.querystudentleaveapplication,
            Method: 'POST',
            Body: params
        }).then(comments => {
            if (!comments.FeedbackCode) {
                return comments;
            }
        });
    }
    getFlow(params):Promise<any>{
      return this.http.postJSON({
        Router: ServelUrl.Url.getFlow,
        Method: 'POST',
        Body: params
      }).then(comments => {
        if (!comments.FeedbackCode) {
          return comments;
        }
      });
    }

}
