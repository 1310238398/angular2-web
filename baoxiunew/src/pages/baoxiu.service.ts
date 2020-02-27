import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { ServelUrl } from '../app/ServelUrl';
import { ResponseData, SubRepair, RepairDetail, RepairPage, RepairPerson, RepairArea, PersonalTaskNum } from './baoxiu';

@Injectable()
export class BaoXiuService {
    param = {
        Router: '',
        Method: 'POST',
        Body: {}
    };
    constructor(private httpServise: HttpService) { }

    queryUpToken(name: string, size: string): Promise<ResponseData<any>> {
        this.param.Router = ServelUrl.Url.getUpToken;
        this.param.Method = 'POST';
        this.param.Body = {
            Name: name,
            Size: size,
            BizType: "BaoXiu"
        };
        return this.httpServise.postJSON<ResponseData<any>>(this.param);
    }

    // 获取当前登录用户手机号
    queryUserPhone(): Promise<ResponseData<any>> {
        this.param.Router = ServelUrl.Url.queryuserphone;
        this.param.Body = {};
        return this.httpServise.postJSON<ResponseData<any>>(this.param);
    }

    // 获取报修项目
    queryRepairItem(): Promise<ResponseData<any>> {
        this.param.Router = ServelUrl.Url.queryrepairitem;
        this.param.Body = {};
        return this.httpServise.postJSON<ResponseData<any>>(this.param);
    }

    // 获取报修区域
    queryRepairArea(): Promise<ResponseData<RepairArea[]>> {
        this.param.Router = ServelUrl.Url.queryrepairarea;
        this.param.Body = {};
        return this.httpServise.postJSON<ResponseData<RepairArea[]>>(this.param);
    }

    // 提交报修任务
    submitRepair(body: SubRepair): Promise<ResponseData<string>> {
        this.param.Router = ServelUrl.Url.submitrepair;
        this.param.Body = body;
        return this.httpServise.postJSON<ResponseData<string>>(this.param);
    }

    // 获取报修任务详情
    queryRepairOne(recordid: String): Promise<ResponseData<any>> {
        this.param.Router = ServelUrl.Url.queryrepairone;
        this.param.Method = 'POST';
        this.param.Body = {
            FlowInstanceRecordID: recordid
        };
        return this.httpServise.postJSON<ResponseData<any>>(this.param);
    }

    // 获取报修任务数量
    queryRepairQuantity(): Promise<ResponseData<any>> {
        this.param.Router = ServelUrl.Url.queryrepairquantity;
        this.param.Body = {};
        return this.httpServise.postJSON<ResponseData<any>>(this.param);
    }

    // 获取报修任务列表
    // 维修人员、物业管理: 如果不是待处理任务要判断角色，维修人员只返回他自己的任务，后勤要返回所有任务
    queryRepairList(pagenum: number, pagesize: number, status: string, usercode?: string): Promise<ResponseData<RepairPage>> {
        this.param.Router = ServelUrl.Url.queryrepairlist;
        this.param.Method = 'POST';
        if (usercode) {
            this.param.Body = {
                PageNum: pagenum,
                PageSize: pagesize,
                Status: status || '',
                RepairPersonnelUID: usercode
            };
        } else {
            this.param.Body = {
                PageNum: pagenum,
                PageSize: pagesize,
                Status: status || ''
            };
        }
        return this.httpServise.postJSON<ResponseData<RepairPage>>(this.param);
    }

    // 获取各维修人员任务数量
    queryPersonnelTaskNumber(status: string): Promise<ResponseData<PersonalTaskNum[]>> {
        this.param.Router = ServelUrl.Url.querypersonneltasknumber;
        this.param.Method = 'POST';
        this.param.Body = {
            Status: status
        };
        return this.httpServise.postJSON<ResponseData<PersonalTaskNum[]>>(this.param);
    }

    // 接单
    receiverepair(recordid: String): Promise<ResponseData<any>> {
        this.param.Router = ServelUrl.Url.receiverepair;
        this.param.Body = {
            TaskRecordID: recordid
        };
        return this.httpServise.postJSON<ResponseData<any>>(this.param);
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

        return this.httpServise.postJSON<ResponseData<RepairPerson[]>>(this.param);
    }

    // 派单
    repairDesignate(recordid: string, usercode: string): Promise<ResponseData<string>> {
        this.param.Router = ServelUrl.Url.repairdesignate;
        this.param.Body = {
            TaskRecordID: recordid,
            IntelUserCode: usercode
        };
        return this.httpServise.postJSON<ResponseData<string>>(this.param);
    }

    // 无需处理
    repairNotNeed(recordid: string, explanation: string): Promise<ResponseData<string>> {
        this.param.Router = ServelUrl.Url.repairnotneed;
        this.param.Body = {
            TaskRecordID: recordid,
            Explanation: explanation
        };
        return this.httpServise.postJSON<ResponseData<string>>(this.param);
    }

    // 维修人员维修完成
    repairAccomplish(recordid: string, attachs?: string): Promise<ResponseData<string>> {
        this.param.Router = ServelUrl.Url.repairaccomplish;
        this.param.Body = {
            TaskRecordID: recordid,
            Attachs: attachs
        };
        return this.httpServise.postJSON<ResponseData<string>>(this.param);
    }

    // 返工
    repairRework(recordid: string, reason: string): Promise<ResponseData<string>> {
        this.param.Router = ServelUrl.Url.repairrework;
        this.param.Body = {
            TaskRecordID: recordid,
            Reason: reason
        };
        return this.httpServise.postJSON<ResponseData<string>>(this.param);
    }

    // 添加备注
    repairAddRemark(recordid: string, remark: string): Promise<ResponseData<string>> {
        this.param.Router = ServelUrl.Url.repairaddremark;
        this.param.Method = 'POST';
        this.param.Body = {
            TaskRecordID: recordid,
            Remark: remark
        };
        return this.httpServise.postJSON<ResponseData<string>>(this.param);
    }

    // 学生确认维修已完成
    repairEnd(recordid: string): Promise<ResponseData<string>> {
        this.param.Router = ServelUrl.Url.repairend;
        this.param.Body = {
            TaskRecordID: recordid
        };
        return this.httpServise.postJSON<ResponseData<string>>(this.param);
    }

    // 获取报修单编号
    querySerialNumber(): Promise<ResponseData<any>> {
        this.param.Router = '/api/reportrepair/getserialnumber';
        this.param.Body = null;
        return this.httpServise.postJSON<ResponseData<any>>(this.param);
    }

    // 发起流程
    flowsLaunch(form: any): Promise<any> {
        this.param.Router = '/api/v1/flows/launch';
        this.param.Body = {
            flow_code: 'Process_Repairs',
            form_data: JSON.stringify(form)
        };
        return this.httpServise.postFlowJSON<any>(this.param);
    }

    // 处理流程
    flowsHandle(recordid: string, form: any): Promise<any> {
        this.param.Router = '/api/v1/flows/handle';
        this.param.Method = 'POST';
        this.param.Body = {
            record_id: recordid,
            form_data: JSON.stringify(form)
        };
        return this.httpServise.postFlowJSON<any>(this.param);
    }

    // 查询流程待办列表
    flowsToDoList(): Promise<any[]> {
        this.param.Router = '/api/v1/flows/todo';
        this.param.Method = 'GET';
        this.param.Body = {
            flow_code: 'Process_Repairs'
        };
        return this.httpServise.postFlowJSON<any[]>(this.param);
    }

    // 查询流程已办列表
    flowsDoneList(time: number, count: string): Promise<any[]> {
        this.param.Router = '/api/v1/flows/done';
        this.param.Method = 'GET';
        this.param.Body = {
            flow_code: 'Process_Repairs',
            last_time: time.toString(),
            count: count
        };
        return this.httpServise.postFlowJSON<any[]>(this.param);
    }

    // 查询流程历史数据
    flowsHistory(id: string): Promise<any[]> {
        this.param.Router = ServelUrl.Url.flowshistory;
        this.param.Method = 'GET';
        this.param.Body = {
            flow_instance_id: id
        };
        return this.httpServise.postFlowJSON<any[]>(this.param);
    }

    // 查询流程待办数据
    flowsToDoOne(id: string): Promise<any> {
        this.param.Router = `/api/v1/flows/todo/${id}`;
        this.param.Method = 'GET';
        this.param.Body = {};
        return this.httpServise.postFlowJSON<any>(this.param);
    }

    // 查询流程已办数据
    flowsDoneOne(id: string): Promise<any> {
        this.param.Router = `/api/v1/flows/done/${id}`;
        this.param.Method = 'GET';
        this.param.Body = {};
        return this.httpServise.postFlowJSON<any>(this.param);
    }
}