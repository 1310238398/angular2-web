import util from '../utils/util';

// 表单数据
export class ApplyItem {
    title: string = '';
    content: string = '';
    apply_date: string = util.getDate();
    audit_comment: string = '';
    action: string = '';
}