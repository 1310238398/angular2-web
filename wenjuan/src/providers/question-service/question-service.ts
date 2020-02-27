import {Injectable} from '@angular/core';
import {HttpService} from "../../http/http.Service";

@Injectable()
export class QuestionServiceProvider {
  /*
  * 全部问卷题目(包含选项)
  * */
  Questions = [];
  /**
   * 当前题目下标
   * @type {number}
   */
  QuestIndex = 0;
  /**
   *
   * @type {string}
   */
  wCode='';
  /**
   *
   * @type {string}
   */
  WenjuanName = '';

  constructor(private http: HttpService) {
  }

   getQuestionList() {
    return this.Questions;
  }

  setQuestionList(Questions) {
    /*  this.http.get('assets/data.json').then(res => {
        console.log(res);
        this.Questions=res.question || [];
      })*/
    this.Questions = Questions;
  }

  getQuestIndex() {
    return this.QuestIndex;
  }

  /**
   * 问卷编号
   */
  setCode(code){
    this.wCode=code;
  }
  getCode(){
    return this.wCode
  }
  /**
   * 问卷
   */
  getWenjuanName() {
    return this.WenjuanName;
  }

  setWenjuanName(WenjuanName) {
    this.WenjuanName = WenjuanName;
  }

  addQuestionIndex() {
    this.QuestIndex = this.QuestIndex + 1;
  }
  setQuestionIndex(index) {
    this.QuestIndex = index;
  }

  reduceQuestionIndex() {
    this.QuestIndex = this.QuestIndex - 1;
  }
}
