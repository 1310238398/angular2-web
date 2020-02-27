import { Injectable } from "@angular/core";
import {HttpService} from "../http/http.Service";
import {ServelUrl} from "./ServelUrl";



@Injectable()
export class AppService {
    private currenttAcademy:string;
    private currentMajor;
    private currentClass;
    private currentUeserCode;
    private currentClassCode;
    constructor(private http: HttpService) {
    }
//学院信息（校徽）
    getCampusInfo(): any {
        return this.http.postJSON({
            Router: ServelUrl.Url.querycampus,
            Method: 'POST',
            Body: {}
        })
    }
    //各学院的报到情况
    getAcademyQuery():any{
        return this.http.postJSON({
            Router:ServelUrl.Url.queryacademy,
            Method:'POST',
            Body:{}
        })
    }
    //专业信息（校徽）
    getMajorInfo(currenttAcademy:string): Promise<any> {
        return this.http.postJSON({
            Router: ServelUrl.Url.querymajor,
            Method: 'POST',
            Body: {AcademyCode:currenttAcademy}
        })
    }
    //各专业的报到情况
    getMajorQuery(currenttAcademy:string): Promise<any>{
        return this.http.postJSON({
            Router:ServelUrl.Url.querymajorregist,
            Method:'POST',
            Body:{AcademyCode:currenttAcademy}
        })
    }
     //班级信息（校徽）
    getClassInfo(currentMajor:string): Promise<any> {
        return this.http.postJSON({
            Router: ServelUrl.Url.queryclasshead,
            Method: 'POST',
            Body: {MajorCode:currentMajor}
        })
    }
    
     //一个班级的报到情况
    getClassQuery(currentMajor:string): Promise<any>{
        return this.http.postJSON({
            Router:ServelUrl.Url.queryclass,
            Method:'POST',
            Body:{MajorCode:currentMajor}
        })
    }
    //各班级的报到情况(已报到)
    getClassnoe(currentClassCode:string): Promise<any>{
        return this.http.postJSON({
            Router:ServelUrl.Url.queryclassone,
            Method:'POST',
            Body:{ClassCode:currentClassCode,Status:'1'}
        })
    }
      //各班级的报到情况（未报到）
    getClassone(currentClassCode:string): Promise<any>{
        return this.http.postJSON({
            Router:ServelUrl.Url.queryclassone,
            Method:'POST',
            Body:{ClassCode:currentClassCode,Status:'0'}
        })
    }
 //个人情况
    getpersonQuery(currentUeserCode:string): Promise<any>{
        return this.http.postJSON({
            Router:ServelUrl.Url.seachpersonquery,
            Method:'POST',
            Body:{UserId:currentUeserCode}
        })
    }

    setCurrentAcademy(Academy) {
        this.currenttAcademy = Academy;
    }
    getCurrentAcademy(): any {
        // console.log(this.currenttAcademy);
        return this.currenttAcademy;
    }
    setCurrentMarjor(Marjor) {
        // console.log(this.currentMajor)
        this.currentMajor = Marjor;
    }
     getCurrentMajot(): any {
        // console.log(this.currentMajor);
        return this.currentMajor;
    }
    setCurrentClass(Class) {
        this.currentClass = Class;
    }
     getCurrentClass(): any {
        // console.log(this.currentClass);
        return this.currentClass;
    }
      setCurrentClassnoe(classCode) {
        this.currentClassCode = classCode;
    }
     getCurrentClassone(): any {
        // console.log(this.currentClassCode);
        return this.currentClassCode;
    }
     setCurrentPerson(person) {
        this.currentUeserCode = person;
    }
     getCurrentPerson(): any {
        // console.log(this.currentClassCode);
        return this.currentUeserCode;
    }
}