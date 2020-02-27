import { Injectable } from '@angular/core';

// 服务
import { HttpService } from '../http/http.service';

class Response<T>{
    feedbackCode: number;
    feedbackText: string;
    Data: T;
}
class DataItems {
    Total: number;
    Items: any[];
}

@Injectable()
export class RoomService {

    constructor(
        private httpService: HttpService,
    ) { }

    // 获取学校信息
    queryUniversityInfo(): Promise<Response<any>> {
        return this.httpService.PostJSON<Response<any>>({
            Router: '/api/yxinfofill/getschoollogoandname',
            Method: 'GET',
            Body: null
        })
    }

    // 获取宿舍入住情况接口【非饼状图】
    // queryRoomStatis(): Promise<Response<DataItems>> {
    //     return this.httpService.PostJSON<Response<DataItems>>({
    //         Router: '/api/pc/roominformationstatistics/getwholeschoolstatistics',
    //         Method: 'GET',
    //         Body: null
    //     })
    // }
    // 获取总宿舍数【非饼状图】
    queryWholeroom(): Promise<Response<any>> {
        return this.httpService.PostJSON<Response<any>>({
            Router: '/api/pc/roominformationstatistics/getwholeroom',
            Method: 'GET',
            Body: null
        })
    }

    // 获取总床位数【非饼状图】
    queryWholebeds(): Promise<Response<any>> {
        return this.httpService.PostJSON<Response<any>>({
            Router: '/api/pc/roominformationstatistics/getwholebeds',
            Method: 'GET',
            Body: null
        })
    }

    // 获取已入住宿舍数（男）【非饼状图】
    queryManRoom(): Promise<Response<any>> {
        return this.httpService.PostJSON<Response<any>>({
            Router: '/api/pc/roominformationstatistics/getwholealreadymanroom',
            Method: 'GET',
            Body: null
        })
    }

    // 获取已入住宿舍数（女）【非饼状图】
    queryWomanRoom(): Promise<Response<any>> {
        return this.httpService.PostJSON<Response<any>>({
            Router: '/api/pc/roominformationstatistics/getwholealreadywomanroom',
            Method: 'GET',
            Body: null
        })
    }

    // 获取已入住男生人数【非饼状图】
    queryManNumber(): Promise<Response<any>> {
        return this.httpService.PostJSON<Response<any>>({
            Router: '/api/pc/roominformationstatistics/getwholealreadyman',
            Method: 'GET',
            Body: null
        })
    }

    // 获取已入女生人数【非饼状图】
    queryWoManNumber(): Promise<Response<any>> {
        return this.httpService.PostJSON<Response<any>>({
            Router: '/api/pc/roominformationstatistics/getwholealreadywoman',
            Method: 'GET',
            Body: null
        })
    }

    // 获取入住率）【非饼状图】
    queryWholeOccupancyRate(): Promise<Response<any>> {
        return this.httpService.PostJSON<Response<any>>({
            Router: '/api/pc/roominformationstatistics/getwholeoccupancyrate',
            Method: 'GET',
            Body: null
        })
    }

    // 获取宿舍入住情况接口【饼状图】
    allRoomStatisPie(): Promise<any> {
        return this.httpService.PostJSON({
            Router: '/api/pc/roominformationstatistics/getwholedormitorystatistics',
            Method: 'GET',
            Body: null
        })
    }

    // 空床宿舍统计接口【饼状图】
    emptyBedRoomStatisPie(): Promise<any> {
        return this.httpService.PostJSON({
            Router: '/api/pc/roominformationstatistics/gethalfdormitorystatistics',
            Method: 'GET',
            Body: null
        })
    }

    // 空闲床位统计【饼状图】
    emptyBedStatisPie(): Promise<any> {
        return this.httpService.PostJSON({
            Router: '/api/pc/roominformationstatistics/getsparedormitorystatistics',
            Method: 'GET',
            Body: null
        })
    }

    // 空闲床位统计
    emptyRoomBedStatisPie(): Promise<any> {
        return this.httpService.PostJSON({
            Router: '/api/pc/roominformationstatistics/gethalfdormitorybedstatistics',
            Method: 'GET',
            Body: null
        })
    }

    // 宿舍楼统计接口
    dormitoryStatis(pageindex: number, pagesize: number): Promise<any> {
        return this.httpService.PostJSON({
            Router: '/api/pc/roominformationstatistics/getdormitorystatisticslist',
            Method: 'POST',
            Body: {
                "sex": "",
                "roomnums": "",
                "bednums": "",
                "emptyroomnums": "",
                "emptybednums": "",
                "halfroomnums": "",
                "halfbednums": "",
                "occupancy": "",
                "occupancyrate": "",
                "pageindex": pageindex,
                "pagesize": pagesize
            }
        })
    }

    // 学院统计接口
    academyStatis(pageindex: number, pagesize: number): Promise<any> {
        return this.httpService.PostJSON({
            Router: '/api/pc/roominformationstatistics/getacademystatisticslist',
            Method: 'POST',
            Body: {
                "pageindex": pageindex,
                "pagesize": pagesize
            }
        })
    }

    // 宿舍查询
    dormitoryQuery(pageindex: number, pagesize: number, type: string, dormitory: string, academy: string, roomnum: string): Promise<any> {
        return this.httpService.PostJSON({
            Router: '/api/pc/roominformationstatistics/getroomsearchlist',
            Method: 'POST',
            Body: {
                "type": type,
                "dormitory": dormitory,
                "academy": academy,
                "roomnum": roomnum,
                "pageindex": pageindex,
                "pagesize": pagesize
            }
        })
    }

    // 已住宿舍查询
    hasPeopleRoomQuery(pageindex: number, pagesize: number, roomnum: string, type: string): Promise<any> {
        return this.httpService.PostJSON({
            Router: '/api/pc/roominformationstatistics/getalreadyroomlist',
            Method: 'POST',
            Body: {
                "pageindex": pageindex,
                "pagesize": pagesize,
                "roomnum": roomnum,
                "type": type
            }
        })
    }

    // 已住宿舍查询
    noPeopleRoomQuery(pageindex: number, pagesize: number, roomnum: string): Promise<any> {
        return this.httpService.PostJSON({
            Router: '/api/pc/roominformationstatistics/getleisureroomlist',
            Method: 'POST',
            Body: {
                "pageindex": pageindex,
                "pagesize": pagesize,
                "roomnum": roomnum
            }
        })
    }

    // 空床宿舍查询
    emptybedRoomQuery(pageindex: number, pagesize: number, sex: string, roomnum: string): Promise<any> {
        return this.httpService.PostJSON({
            Router: '/api/pc/roominformationstatistics/getemptybedroomlist',
            Method: 'POST',
            Body: {
                "pageindex": pageindex,
                "pagesize": pagesize,
                "sex": sex,
                "roomnum": roomnum
            }
        })
    }


    // 空闲宿舍查询
    allEmptyRoomQuery(pageindex: number, pagesize: number, roomnum): Promise<any> {
        return this.httpService.PostJSON({
            Router: '/api/pc/roominformationstatistics/getleisureroomlist',
            Method: 'POST',
            Body: {
                "pageindex": pageindex,
                "pagesize": pagesize,
                "roomnum": roomnum
            }
        })
    }

    // 宿舍信息查询
    roomDetailQuery(code: string): Promise<any> {
        return this.httpService.PostJSON({
            Router: '/api/pc/roominformationstatistics/getroommemberlist',
            Method: 'POST',
            Body: {
                "roomcode": code,
            }
        })
    }

    // 宿舍成绩查询
    roomScoreQuery(code: string): Promise<any> {
        return this.httpService.PostJSON({
            Router: '/api/pc/roominformationstatistics/getroomcheckresultlist',
            Method: 'POST',
            Body: {
                "roomcode": code,
            }
        })
    }

    // 宿舍违纪查询
    roomViolationQuery(code: string, pageindex: number, pagesize: number): Promise<any> {
        return this.httpService.PostJSON({
            Router: '/api/pc/roominformationstatistics/getroomdisciplinelist',
            Method: 'POST',
            Body: {
                "roomcode": code,
                "pageindex": pageindex,
                "pagesize": pagesize,
            }
        })
    }

    // 宿舍违纪附件查询
    roomViolationAnnexQuery(record: string): Promise<any> {
        return this.httpService.PostJSON({
            Router: '/api/pc/roominformationstatistics/getimagespathlist',
            Method: 'POST',
            Body: {
                "record": record
            }
        })
    }

    // 查看权限接口
    isViewStudentinfo(code: string): Promise<any> {
        return this.httpService.PostJSON({
            Router: '/api/pc/roominformationstatistics/getviewpermissions',
            Method: 'POST',
            Body: {
                "studentcode": code,
            }
        })
    }
}
