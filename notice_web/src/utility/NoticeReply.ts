import { UserReply } from "./UserReply";

export class NoticeReply {
    ReadCount: number;
    UNReadCount: number;
    REPLY: string;//"1"为查询已读用户，"0"为查询未读用户
    UserList: UserReply[];
}