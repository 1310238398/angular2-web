import { Component, OnInit } from '@angular/core';
import { HttpRequest, HttpClient, HttpResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DatePipe } from "@angular/common";
import { NzMessageService } from "ng-zorro-antd";

import { HttpService } from "../../http/http.service";
import { NoticeService } from "./notice.service";
import { CheckMenuFieldService } from "../service/checkMenuField.service";

import { ServelUrl } from "../ServelUrl";
import { Dept } from './notice';

@Component({
    selector: 'app-noticeadd',
    templateUrl: './add.html',
    styleUrls: ['notice.css']
})
export class NoticeAddComponent implements OnInit {
    uploadAnnex = false;
    uploadLogo = false;
    noticeid = '';
    valForm: FormGroup;
    isVisible = false;
    universitycode = '';
    campusList = [];
    academyList = [];
    majorList = [];
    gradeList = [];
    classList = [];
    scope = {
        campus: [],
        academy: [],
        major: [],
        grade: [],
        class: []
    };
    config: any = {
        height: 250,
        language: 'zh_CN',
        theme: 'modern',
        allow_html_in_named_anchor: true,
        // powerpaste advcode toc tinymcespellchecker a11ychecker mediaembed linkchecker help
        plugins: [
            'advlist autolink lists link image charmap  preview anchor textcolor',
            'code fullscreen',
            'insertdatetime media table contextmenu paste code  wordcount'
        ],
        toolbar: 'formatselect fontselect fontsizeselect | bold italic strikethrough forecolor backcolor | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent',
        image_advtab: true,
        imagetools_toolbar: 'rotateleft rotateright | flipv fliph | editimage imageoptions',
        images_upload_url: '',
        images_upload_handler: (blobInfo, success, failure) => {
            const formdata = new FormData();
            formdata.append('Filedata', blobInfo.blob());
            formdata.append('BuType', 'notice');
            formdata.append('router', '/app/file/upload');
            this.httpService.postFormData(formdata, (res => {
                if (res.RE === 0) {
                    success('../../../' + res.Data.FileLink);
                }
            }), '/api/appsrv/file');

        },
        media_live_embeds: false,
        media_alt_source: false,
        media_poster: false,
        media_dimensions: false
        // media_live_embeds: true,
        // media_url_resolver: function (data, resolve) {
        //     debugger;
        //     var embedHtml = '<iframe src="' + data.url +
        //     '" width="400" height="400" ></iframe>';
        //     resolve({html: embedHtml});
        //     if (data.url.indexOf('YOUR_SPECIAL_VIDEO_URL') !== -1) {
        //       var embedHtml = '<iframe src="' + data.url +
        //       '" width="400" height="400" ></iframe>';
        //       resolve({html: embedHtml});
        //     } else {
        //       resolve({html: ''});
        //     }
        //   }
    }
    constructor(
        private fb: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private datePipe: DatePipe,
        private msgsrv: NzMessageService,
        public httpService: HttpService,
        private noticeService: NoticeService,
        private checkMenuFieldService: CheckMenuFieldService
    ) { }

    ngOnInit() {
        this.valForm = this.fb.group({
            NOTICEID: [this.noticeid],
            NOTICELOGO: [''],
            NOTICETITLE: ['', [Validators.required, this.checkMenuFieldService.checkSpace]],
            NOTICEHTML: ['', [Validators.required]],
            NOTICEDESC: ['', [Validators.required, this.checkMenuFieldService.checkSpace]],
            CAMPUS: [[]],
            ACADEMY: [[]],
            MAJOR: [[]],
            CLASS: [[]],
            GRADE: [[]],
            ACADEMYNAME: [[]],
            MAJORNAME: [[]],
            CLASSNAME: [[]],
        });
        this.getUniversity(); // 请求学校
        this.route.queryParams.subscribe((params: Params) => {
            if (params['id']) {
                this.noticeid = params['id'];
            }
        });
    }

    beforeUpload = (file: any) => {
        if (!file) {
            return;
        }
      const limit=1024*1024*1;
      if (file.size > limit) {
        this.msgsrv.error('请上传小于1M的照片', {nzDuration: 5000});
        return false;
      }
        const fileType = file.name.substring(file.name.lastIndexOf('.'));
        const imageTypes = '.jpg.jpeg.png.JPG.JPEG.PNG';
        if (imageTypes.indexOf(fileType) === -1) {
            this.msgsrv.error('上传失败，图标只能上传jpg、jpeg、png类型的图片', { nzDuration: 5000 });
            return false;
        }
        this.handleUpload(file, 'logo');
        return false;
    }

    beforeUploadAnnex = (file: any) => {
        this.handleUpload(file, 'annex');
        return false;
    }

    // 文件上传
    handleUpload(file: any, type: string): void {

        if (file.size > 10 * 1024 * 1024) {
            this.msgsrv.error('文件最大限制10M');
            return;
        }
        // const target = event.target || event.srcElement;
        // const file = target.files[0];
        const fileType = file.name.substring(file.name.lastIndexOf('.'));
        const formdata = new FormData();
        formdata.append('Filedata', file);
        formdata.append('BuType', 'notice');
        formdata.append('router', '/app/file/upload');
        type === 'annex' ? this.uploadAnnex = true : this.uploadLogo = true;
        this.httpService.postFormData(formdata, (res => {
            if (res.RE === 0) {
                if (type === 'logo') {
                    this.valForm.patchValue({ NOTICELOGO: '/' + res.Data.FileLink });
                } else if (type === 'annex') {
                    let oldhtml = this.valForm.value.NOTICEHTML;
                    console.log(oldhtml);
                    oldhtml = oldhtml.replace('<!DOCTYPE html>', '');
                    oldhtml = oldhtml.replace('<html>', '');
                    oldhtml = oldhtml.replace('<head>', '');
                    oldhtml = oldhtml.replace('</head>', '');
                    oldhtml = oldhtml.replace('<body>', '');
                    oldhtml = oldhtml.replace('</body>', '');
                    oldhtml = oldhtml.replace('</html>', '');
                    console.log(oldhtml);
                    const htmlstr = oldhtml + `<p>附件：<a href='${res.Data.FileLink}'>${res.Data.FileName}</a></p>`;
                    this.valForm.patchValue({ NOTICEHTML: htmlstr });
                    this.msgsrv.success('上传成功，内容显示在富文本框中');
                }
            } else {
              if (res.status == '413') {
                this.msgsrv.error('文件总体积过大!');
              } else {
                this.msgsrv.error("出错了");
              }
            }
            this.uploadAnnex = false;
            this.uploadLogo = false;
        }), '/api/appsrv/file');
    }

    // 精确查询
    getInfoOne(id: string): void {
        this.noticeService.queryOne(id).then(res => {
            this.valForm.reset(res.Data);
            this.valForm.value.CAMPUS ? this.scope.campus = this.valForm.value.CAMPUS : [];
            this.valForm.value.GRADE ? this.scope.grade = this.valForm.value.GRADE : [];
            this.valForm.value.ACADEMY ? this.scope.academy = this.valForm.value.ACADEMY : [];
            this.valForm.value.MAJOR ? this.scope.major = this.valForm.value.MAJOR : [];
            this.valForm.value.CLASS ? this.scope.class = this.valForm.value.CLASS : [];
            if (this.scope.academy.length > 0) {
                this.academyChange(this.scope.academy, 'edit');
            }
            if (this.scope.grade.length > 0 && this.scope.major.length > 0) {
                this.gradeChange(this.scope.grade, 'edit');
            }
        });
    }

    // 请求学校
    getUniversity(): void {
        this.noticeService.queryUniversity().then(res => {
            this.universitycode = res.Data.University;

            this.getCampus(this.universitycode); // 请求校区
            this.getAcademy(this.universitycode); // 请求学院
            this.getGrade(this.universitycode); // 请求年级
            if (this.noticeid) {
                this.getInfoOne(this.noticeid);
            }
        });
    }

    // 请求校区
    getCampus(universitycode: string): void {
        this.noticeService.queryCampus(universitycode).then(res => {
            this.campusList = res.Data;
        });
    }

    // 请求学院
    getAcademy(universitycode: string): void {
        this.noticeService.queryAcademy(universitycode).then(res => {
            this.academyList = res.Data;
        });
    }

    // 请求专业
    getMajor(universitycode: string, academyids: string[]): void {
        this.noticeService.queryMajor(universitycode, academyids).then(res => {
            this.majorList = res.Data;
        });
    }

    // 请求年级
    getGrade(universitycode: string): void {
        this.noticeService.queryGrade(universitycode).then(res => {
            this.gradeList = res.Data;
        });
    }

    // 请求班级
    getClass(universitycode: string, majorids: string[], gradeids: string[]): void {
        this.noticeService.queryClass(universitycode, majorids, gradeids).then(res => {
            this.classList = res.Data;
        });
    }

    // 学院变化
    academyChange(academyids: string[], type: string): void {
        console.log('academychange');
        if (!academyids) {
            return;
        }
        if (academyids.length === 0) {
            this.majorList.length = 0;
            this.scope.major = [];
        }
        if (type === 'select') {
            this.scope.major ? this.scope.major = [] : []; // 清空班级列表
        }

        // 专业
        this.getMajor(this.universitycode, academyids);
    }

    // 专业变化
    majorChange(majorids: string[], type: string): void {
        if (!majorids || !this.scope.grade) {
            return;
        }
        if (majorids.length === 0 || this.scope.grade.length === 0) {
            this.scope.class = [];
            this.classList = [];
            return;
        }
        if (type === 'select') {
            this.scope.class ? this.scope.class = [] : []; // 清空班级列表
        }
        // 班级
        this.getClass(this.universitycode, majorids, this.scope.grade);
    }

    // 年级变化
    gradeChange(grade: string[], type: string): void {
        if (!grade || !this.scope.major) {
            return;
        }
        if (grade.length === 0 || this.scope.major.length === 0) {
            this.scope.class = [];
            this.classList = [];
            return;
        }
        if (type === 'select') {
            this.scope.class ? this.scope.class = [] : []; // 清空班级列表
        }
        // const majorids = [];
        // this.scope.major.forEach((value, index) => {
        //     majorids.push(value.deptcode);
        // });
        // 班级
        this.getClass(this.universitycode, this.scope.major, grade);
    }

    handleOk = (e) => {
        this.isVisible = false;
        // 学院
        const academynames = [];
        this.scope.academy.forEach((value) => {
            for (let i = 0; i < this.academyList.length; i++) {
                if (this.academyList[i].deptcode === value) {
                    academynames.push(this.academyList[i].deptname);
                }
            }
        });
        this.valForm.patchValue({ ACADEMY: this.scope.academy });
        this.valForm.patchValue({ ACADEMYNAME: academynames });

        // 班级
        const classnames = [];
        this.scope.class.forEach((value) => {
            for (let i = 0; i < this.classList.length; i++) {
                if (this.classList[i].deptcode === value) {
                    classnames.push(this.classList[i].deptname);
                }
            }
        });
        this.valForm.patchValue({ CLASS: this.scope.class });
        this.valForm.patchValue({ CLASSNAME: classnames });

        // 专业
        const majornames = [];
        this.scope.major.forEach((value) => {
            for (let i = 0; i < this.majorList.length; i++) {
                if (this.majorList[i].deptcode === value) {
                    majornames.push(this.majorList[i].deptname);
                }
            }
        });
        this.valForm.patchValue({ MAJOR: this.scope.major });
        this.valForm.patchValue({ MAJORNAME: majornames });

        this.valForm.patchValue({ CAMPUS: this.scope.campus || [] });
        this.valForm.patchValue({ GRADE: this.scope.grade || [] });
    }

    handleCancel = (e) => {
        this.isVisible = false;
    }

    // 列表请求
    save(): void {
        for (const i in this.valForm.controls) {
            this.valForm.controls[i].markAsDirty();
        }
        if (!this.valForm.valid) {
            return;
        }

        let url = '';
        this.noticeid ? url = ServelUrl.Url.noticemodify : url = ServelUrl.Url.noticesave;
        this.httpService.PostJSON({
            Router: url,
            Method: 'POST',
            Body: {
                NOTICEID: this.noticeid,
                NOTICELOGO: this.valForm.value.NOTICELOGO,
                NOTICETITLE: this.valForm.value.NOTICETITLE.trim(),
                NOTICEHTML: this.valForm.value.NOTICEHTML,
                NOTICEDESC: this.valForm.value.NOTICEDESC.trim(),
                CAMPUS: this.valForm.value.CAMPUS.length > 0 ? this.valForm.value.CAMPUS : [''],
                ACADEMY: this.valForm.value.ACADEMY.length > 0 ? this.valForm.value.ACADEMY : [''],
                MAJOR: this.valForm.value.MAJOR.length > 0 ? this.valForm.value.MAJOR : [''],
                CLASS: this.valForm.value.CLASS.length > 0 ? this.valForm.value.CLASS : [''],
                GRADE: this.valForm.value.GRADE.length > 0 ? this.valForm.value.GRADE : [''],
                ACADEMYNAME: this.valForm.value.ACADEMYNAME.length > 0 ? this.valForm.value.ACADEMYNAME : [''],
                MAJORNAME: this.valForm.value.MAJORNAME.length > 0 ? this.valForm.value.MAJORNAME : [''],
                CLASSNAME: this.valForm.value.CLASSNAME.length > 0 ? this.valForm.value.CLASSNAME : ['']
            }
        }).then(res => {
            if (res.RE === 0) {
                this.msgsrv.success(res.Text);
                this.router.navigate(['/notice']);
            } else {
                this.msgsrv.error(res.Text);
            }
        })
    }

    cancle(): void {
        this.router.navigate(['/notice']);
    }
}
