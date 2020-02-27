import {Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router, Params } from '@angular/router';
import { HttpService } from '../../../../http/http.service';
import { ServelUrl } from '../../../ServelUrl';

@Component({
    selector: 'app-dormitorydata',
    templateUrl: './datadetail.component.html',
    styleUrls: ['./datadetail.component.css']
})
export class DataDetailComponent implements OnInit {
    _dataSet = [];
    _header = true;
    _fixHeader = false;
    sex = "";
    college: string;
    roomid = "";
    ddurname = "";
    roomremark = "";
    constructor(private route: Router, private httpService: HttpService, private router: ActivatedRoute) { }

    ngOnInit() {
        this.router.params.subscribe(Params => {
            console.log(Params);
            // this.DistrictId = Params["DistrictId"];
            // this.DormitoryId = Params["DormitoryId"];
            // this.UnitId = Params["UnitId"];
            this.roomid = Params["roomid"];
            this.ddurname = Params["ddurname"];
        })
        this.dormList();
    }
    dormList() {
        this.httpService.postJSON({
            Router: ServelUrl.Url.GetDormitoryMembers,
            Method: 'POST',
            Body: {
                roomid: this.roomid,
                ddurname: this.ddurname,
            }
        }).then(res => {
           // let _this = this;
            console.log(res);
            this._dataSet = res.Data.members;
            // this.sex = res.Data.sex;
            this.sex = res.Data.sex;
            this.college = res.Data.college;
            this.roomremark = res.Data.roomremark;
        })

        console.log("this.sex")
        console.log(this.sex)
    }
    return() {
        this.route.navigate(['./dormitorydata']);
    }

}