import { Injectable, ElementRef } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { Headers, RequestOptions } from "@angular/http";
import { ServelUrl } from "../app/ServelUrl";
import { HttpService } from "../http/http.Service"
import { Question } from "./utility/Question";
import { CourseList } from "./utility/CourseList";
import { Answer } from "./utility/Answer";


// Service 是单例模式
@Injectable()
export class EvalTeacherService {
    constructor(private http: HttpService) {
    }

    // 记录当前是第几个问题
    // private currentPageIndex: number = 0;

    private questionList: Question[] = null;
    private courseList: CourseList[] = null;

    private currentCourseCode: string;
    private currentAnswerList: Answer[] = [];
    private currentIsEvaluation: string;

    items: any;
    result: any;
    
    //获取所有的试题
    getQuestionListLength(): Promise<number> {
        if (this.questionList === null) {
            return this.getQuestionList().then(
                list => {
                    this.questionList = list;
                    if (this.questionList === null) {
                        return 0;
                    } else {
                    
                        return this.questionList.length;
                    }
                }
            )
        } else {
            return Promise.resolve(this.questionList.length).then(function (value) {
                return value;
            });
        }
    }


    // 获取当前的答案列表
    getCurrentAnswerList(): Answer[] {
        return this.currentAnswerList;
    }

    // 添加到当前的答案列表
    setAnswerByIndex(index: number, answer: Answer): boolean {
        // console.log("setAnswerByIndex " + index + " " + JSON.stringify(answer));
        this.currentAnswerList[index] = answer;
        return true;
    }

    // 在开始答题时设置当前的courseId 用于提交
    setCurrentCourseCode(courseCode: string) {
        // console.log("setCurrentCourseCode", courseCode);
        this.currentCourseCode = courseCode;
        this.currentAnswerList = [];
    }
    //获取当前的课程名称
    getCurrentCourseCode(): string {
        return this.currentCourseCode;
    }


    // service 本身是一个单例模式，获取question时有两种可能，一种是从服务器上获取question的列表，一种是从本地直接获取，即else里面的内容
    getQuestionByPageIndex(index: number): Promise<Question> {
        if (this.questionList === null) {
            return this.getQuestionList().then(
                list => {
                    this.questionList = list;
                    if (index <= this.questionList.length) {
                        return this.questionList[index];
                    } else {
                        console.error("getQuestionByPageIndex error");
                        return null;
                    }
                }
            ).catch(
                error => {
                    return null;
                }
                );
        } else {
            // return 
            if (index <= this.questionList.length) {
                return Promise.resolve(this.questionList[index]).then(function (value) {
                    return value;
                });
            } else {
                console.error("getQuestionByPageIndex error");
                return null;
            }
        }
        // return null;
    }



    //获取问题列表
    getQuestionList(): Promise<Question[]> {
        return this.http.postJSON({
            Router: ServelUrl.Url.gettestlist,
            Method: 'POST',
            Body: {}
        }).then(
            comments => {
                return this.items = comments.Data || [];
            }
            )
    }

    //获取课程列表
    getCourseList() {
        return this.http.postJSON({
            Router: ServelUrl.Url.querycourselist,
            Method: 'POST',
            Body: {}
        }).then(
            comments => {
                return this.items = comments.Data || [];
            });
    }



    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

}