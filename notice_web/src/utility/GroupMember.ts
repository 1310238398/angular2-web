export class GroupMember {
    UID: string;
    REALNAME: string;
    USERTYPE: string;
    DEPTNAME: string;
    USERCODE: string;
    CHECKED: boolean = false;
    STATE: number = 0; // 0 左侧未选中，1左侧选中，2右侧选中，3右侧未选中
}