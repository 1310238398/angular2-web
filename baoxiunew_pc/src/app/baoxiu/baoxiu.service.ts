import { Injectable } from '@angular/core';
import { ServelUrl } from "./ServelUrl";

// 服务
import { HttpService } from './http/http.service';

// 模型
import { ResponseData, RepairArea, RepairPage, RepairPerson } from './baoxiu';
import * as moment from 'moment';

@Injectable()
export class BaoXiuService {
    param = {
        Router: '',
        Method: 'POST',
        Body: {}
    };
    constructor(
        private httpService: HttpService,
    ) { }

    queryUpToken(name: string, size: string): Promise<ResponseData<any>> {
        this.param.Router = ServelUrl.Url.getUpToken;
        this.param.Body = {
            Name: name,
            Size: size,
            BizType: "RoomCheck"
        };
        return this.httpService.postJSON<ResponseData<any>>(this.param);
    }


    // 获取报修项目
    queryRepairItem(): Promise<ResponseData<any>> {
        this.param.Router = ServelUrl.Url.queryrepairitem;
        this.param.Body = {};
        return this.httpService.postJSON<ResponseData<any>>(this.param);
    }

    // 获取报修区域
    queryRepairArea(): Promise<ResponseData<RepairArea[]>> {
        this.param.Router = ServelUrl.Url.queryrepairarea;
        this.param.Body = {};
        return this.httpService.postJSON<ResponseData<RepairArea[]>>(this.param);
    }


    // 获取报修任务详情
    queryRepairOne(flowinstancerecordid: String): Promise<ResponseData<any>> {
        this.param.Router = ServelUrl.Url.queryrepairone;
        this.param.Method = 'POST';
        this.param.Body = {
            FlowInstanceRecordID: flowinstancerecordid
        };
        return this.httpService.postJSON<ResponseData<any>>(this.param);
    }


    // 获取报修任务列表
    // 维修人员、物业管理: 如果不是待处理任务要判断角色，维修人员只返回他自己的任务，后勤要返回所有任务
    queryRepairList(pagenum: number, pagesize: number, body: any): Promise<ResponseData<RepairPage>> {
        this.param.Router = ServelUrl.Url.queryrepairlist;
        this.param.Method = 'POST';
        this.param.Body = {
            PageNum: pagenum,
            PageSize: pagesize,
            Status: '',
            AreaRecordID: '',
            CreateTime: '',
            SerialNumber: '',
            ItemCode: ''
        };
        for (let key in body) {
            let value = body[key]
            if ((key == 'CreateTime1' && value) || (key == 'CreateTime2' && value) || (key == 'EndTime1' && value) || (key == 'EndTime2' && value)) {
                this.param.Body[key] = this.getNewTime(value)
            } else if (value && Array.isArray(value) && value.length && value.length > 0) {
                this.param.Body[key] = value.join(',');
            } else if (value && value.length > 0 && typeof value == "string") {
                this.param.Body[key] = value
            }
        }

        return this.httpService.postJSON<ResponseData<RepairPage>>(this.param);
    }

    getNewTime(obj) {
        var date = new Date(obj);
        // var date_value = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
        var re = Math.round(Number(date) / 1000).toString()
        if (re == '0') {
            re = ''
        }
        return re
    }

    // 获取维修人员列表
    queryRepairPerson(recordid?: string): Promise<ResponseData<RepairPerson[]>> {
        this.param.Router = ServelUrl.Url.queryrepairperson;
        this.param.Method = 'POST';
        if (recordid) {
            this.param.Body = {
                TaskRecordID: recordid
            }
        } else {
            this.param.Body = {};
        }

        return this.httpService.postJSON<ResponseData<RepairPerson[]>>(this.param);
    }

    // 维修人员工作量统计
    WorkloadStatistics(body: any): Promise<ResponseData<any>> {
        this.param.Router = ServelUrl.Url.WorkloadStatistics;
        this.param.Method = 'POST';
        this.param.Body = body
        return this.httpService.postJSON<ResponseData<any>>(this.param);
    }

    // 维修项目统计
    ItemStatistics(body: any): Promise<ResponseData<any>> {
        this.param.Router = ServelUrl.Url.ItemStatistics;
        this.param.Method = 'POST';
        this.param.Body = body
        return this.httpService.postJSON<ResponseData<any>>(this.param);
    }

    // DormitoryAreaStatistics 宿舍楼维修区域统计
    DormitoryAreaStatistics(body: any): Promise<ResponseData<any>> {
        this.param.Router = ServelUrl.Url.DormitoryAreaStatistics;
        this.param.Method = 'POST';
        this.param.Body = body
        return this.httpService.postJSON<ResponseData<any>>(this.param);
    }

    // CampusAreaStatistics 校区维修区域统计
    CampusAreaStatistics(body: any): Promise<ResponseData<any>> {
        this.param.Router = ServelUrl.Url.CampusAreaStatistics;
        this.param.Method = 'POST';
        this.param.Body = body
        return this.httpService.postJSON<ResponseData<any>>(this.param);
    }

    // DistrictAreaStatistics 园区维修区域统计
    DistrictAreaStatistics(body: any): Promise<ResponseData<any>> {
        this.param.Router = ServelUrl.Url.DistrictAreaStatistics;
        this.param.Method = 'POST';
        this.param.Body = body
        return this.httpService.postJSON<ResponseData<any>>(this.param);
    }

    // 处理流程
    flowsHandle(recordid: string, form: any): Promise<any> {
        this.param.Router = '/api/v1/flows/handle';
        this.param.Method = 'POST';
        this.param.Body = {
            record_id: recordid,
            form_data: JSON.stringify(form)
        };
        return this.httpService.postFlowJSON<any>(this.param);
    }

    // 查询流程历史数据
    flowsHistory(id: string): Promise<any> {
        this.param.Router = ServelUrl.Url.flowshistory;
        this.param.Method = 'GET';
        this.param.Body = {
            flow_instance_id: id
        };
        return this.httpService.postFlowJSON<any>(this.param);
    }

    // 查询流程已办数据
    flowsDone(id: string): Promise<ResponseData<any>> {
        this.param.Router = `/api/v1/flows/done/${id}`;
        this.param.Method = 'GET';
        this.param.Body = {};
        return this.httpService.postFlowJSON<ResponseData<any>>(this.param);
    }

    // 查询流程待办数据
    flowsToDo(id: string): Promise<ResponseData<any>> {
        this.param.Router = `/api/v1/flows/done/${id}`;
        this.param.Method = 'GET';
        this.param.Body = {};
        return this.httpService.postFlowJSON<ResponseData<any>>(this.param);
    }


    // 派单
    repairDesignate(recordid: string, usercode: string): Promise<ResponseData<string>> {
        this.param.Router = ServelUrl.Url.repairdesignate;
        this.param.Body = {
            TaskRecordID: recordid,
            IntelUserCode: usercode
        };
        return this.httpService.postJSON<ResponseData<string>>(this.param);
    }

    // 无需处理
    repairNotNeed(recordid: string, explanation: string): Promise<ResponseData<string>> {
        this.param.Router = ServelUrl.Url.repairnotneed;
        this.param.Body = {
            TaskRecordID: recordid,
            Explanation: explanation
        };
        return this.httpService.postJSON<ResponseData<string>>(this.param);
    }

    // 维修人员维修完成
    repairAccomplish(recordid: string, attachs?: string): Promise<ResponseData<string>> {
        this.param.Router = ServelUrl.Url.repairaccomplish;
        this.param.Body = {
            TaskRecordID: recordid,
            Attachs: attachs
        };
        return this.httpService.postJSON<ResponseData<string>>(this.param);
    }


    // 添加备注
    repairAddRemark(recordid: string, remark: string): Promise<ResponseData<string>> {
        this.param.Router = ServelUrl.Url.repairaddremark;
        this.param.Method = 'POST';
        this.param.Body = {
            TaskRecordID: recordid,
            Remark: remark
        };
        return this.httpService.postJSON<ResponseData<string>>(this.param);
    }

    // 获取当前登录用户手机号
    queryUserPhone(): Promise<ResponseData<any>> {
        this.param.Router = ServelUrl.Url.queryuserphone;
        this.param.Body = {};
        return this.httpService.postJSON<ResponseData<any>>(this.param);
    }

}
