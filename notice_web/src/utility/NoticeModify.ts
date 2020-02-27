/**
 * Created by pillars on 2016/10/14.
 */

export class NoticeModify {
    STATUS: string; // 0代表保存，1代表发布
    MUSTID : string;
    MUSTDESC : string;
    ISREMIND : string;
    REMINDTIME : string;
    VALIDTIME : string;
    REMINDCHECKED: boolean = false;
}