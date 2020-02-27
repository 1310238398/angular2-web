// 历史数据项
export class HistoryItem {
    record_id?: string;
    node_id?: string;
    node_code?: string;
    node_name?: string;
    processor?: string;
    processor_name?: string;
    process_time?: string;
    input_data?: string;
    out_data?: string;
    status?: number;
    form_type?: string;
    form_data?: string;
    title?: string;
    out_item?: OutItem;
}

// 输出数据项
export class OutItem {
    audit_comment: string = '';
    action: string = '';
}
