/**
 * Created by pillars on 2016/10/14.
 */

import {Attachment} from "./Attachment";
import {ReceiveObject} from "./ReceiveObject";
//
//"DEPARTMENT":"","ISREMIND":"1","ISRESEND":"","MUSTCREATOR":"AB0000035808","MUSTDESC":"","MUSTID":"100000000262",
//"MUSTTIME":"","MUSTTITLE":"201701170944210.jpg","RECEIVEOBJECTS":[],"REMINDTIME":"","STATUS":"0","VALIDTIME":""}
export class Notice {
    STATUS: string = ""; // 0代表保存，1代表发布
    MUSTID : string = "";
    MUSTTITLE : string = "";
    MUSTDESC : string = "";
    MUSTTIME : string = "";
    VALIDTIME : string = "";
    MUSTCREATOR : string = "";
    MUSTCREATORNAME: string = "";
    DEPARTMENT: string = "";
    DEPTNAME: string = "";
    MUSTHTML : string = "";
    UNIVERSITY :  string[] = [];
    ISREMIND : string = "0";
    REMINDTIME : string = "";
    ISRESEND : string = "";
    // RECEIVEOBJECTS : string[];
    ISPUBLISHREMIND : string = "";
    REMINDMUSTID : string = "";
    ISREAD: string = "";
    ISREADED: boolean = false;
    ATTACHMENTS: Attachment[] = [];
    RECEIVEOBJECTS: ReceiveObject[] = [];
}
