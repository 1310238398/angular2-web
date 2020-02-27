/**
 * Created by pillars on 2016/10/14.
 */
//import { InMemoryWebApiModule } from 'angular2-in-memory-web-api';

export class InMemoryDataService {

    createDb() {

        let notices = [
            {
                // _id : "57fda8618e3b76f0e3cf43de",
                STATUS : "1",                                              // 状态：0:未发布，1:已发布，2:已过期
                MUSTID : "100000000285",                                      // 通知ID
                MUSTTITLE : "[回执提醒]通知消息",                                // 通知标题
                MUSTDESC : "您2016-10-12发布的《[外语学院]test》还有3人未读。",     // 通知内容（描述）
                MUSTTIME : "20161012110505",                                   // 通知发布时间
                VALIDTIME : "20161012120301",                                   // 有效期
                MUSTCREATOR : "AB0000035815",                                   // 创建人
                DEPARTMENT: "",                                                  // 发布单位
                MUSTHTML : "您2016-10-12发布的《[外语学院]test》还有3人未读。",        // 通知内容（富文本）
                UNIVERSITY : [],                                                   // 学校代码
                ISREMIND : "0",                                                   // 是否需要通知提醒(0：否,1：是)
                REMINDTIME : "",                                                  // 通知提醒时间
                ISRESEND : "",                                                    // 是否已经通知更正(1：是)
                RECEIVEOBJECTS : [],                                                // 通知接收对象
                ISPUBLISHREMIND : "",                                               // 是否已经发送通知提醒(1：是)
                REMINDMUSTID : "100000000284",                                       // 提醒通知ID
                ISREADED: false
            },
            {
                // _id : "57fda8618e3b76f0e3cf43de",
                STATUS : "1",
                MUSTID : "100000000286",
                MUSTTITLE : "[回执提醒]通知消息",
                MUSTDESC : "您2016-10-12发布的《[外语学院]test》还有3人未读。",
                MUSTTIME : "20161012110505",
                VALIDTIME : "20161012120301",
                MUSTCREATOR : "AB0000035815",
                DEPARTMENT: "",
                MUSTHTML : "您2016-10-12发布的《[外语学院]test》还有3人未读。",
                UNIVERSITY : [],
                ISREMIND : "0",
                REMINDTIME : "",
                ISRESEND : "",
                RECEIVEOBJECTS : [],
                ISPUBLISHREMIND : "",
                REMINDMUSTID : "100000000284",
                ISREADED: true
            },
            {
                // _id : "57fda8618e3b76f0e3cf43de",
                STATUS : "1",
                MUSTID : "100000000287",
                MUSTTITLE : "[回执提醒]通知消息",
                MUSTDESC : "您2016-10-12发布的《[外语学院]test》还有3人未读。花果山的横加干涉的规划公司的地方环境就会打击黑手党结婚的脚后跟盎司挨打" +
                "就打韩国打韩国还给就啊说水电费水电费史可法老地方洛杉矶对科技的开始的风景对肌肤的健康形成选择从第三方地方法 就是短发；了反馈反馈刷卡饭卡快卡饭卡收费口" +
                "水看胡椒粉还分缴费煎豆腐快递费孔达科夫肯定会看见发货客家话快离开酒店副科级刷卡机看世界看见的看见的反馈贷款打卡机就是短发就是分手的看到还是反抗精神 " +
                "绝代风华就是短发 就是对健身房山东警方介绍就是存在史蒂夫开始打开肌肤时刻的打开房间大哭看得见风景地方打开就是看到肌肤就开始看的风景涉及到可就是打开房间",
                MUSTTIME : "20161012110505",
                VALIDTIME : "20161012120301",
                MUSTCREATOR : "AB0000035815",
                DEPARTMENT: "",
                MUSTHTML : "您2016-10-12发布的《[外语学院]test》还有3人未读。",
                UNIVERSITY : [],
                ISREMIND : "0",
                REMINDTIME : "",
                ISRESEND : "",
                RECEIVEOBJECTS : [],
                ISPUBLISHREMIND : "",
                REMINDMUSTID : "100000000284",
                ISREADED: false
            },
            {
                // _id : "57fda8618e3b76f0e3cf43de",
                STATUS : "1",
                MUSTID : "100000000288",
                MUSTTITLE : "[回执提醒]通知消息",
                MUSTDESC : "您2016-10-12发布的《[外语学院]test》还有3人未读。结束倒计时涉及到就好克赖斯基放得开看到飞机上看见的可怜的技术开发建设的看见的快速减肥德吕吉斯会计法跨世纪地方" +
                "还是多哈说的世界的风很舒服就是短发哈健身房阿斯顿发哈健身房阿结束多哈的阿时间的话就撒谎就撒的话就是阿时间的哈时间就啊还是多久啊很多事就是对的时间啊啊多少电脑电脑电脑电脑电脑的aKakakak" +
                "ajshdjashjdfh结合实际发生跨世纪的教科书圣诞节时间啊阿拉山口对空射击的阿卡就是短发煞风景卡收到回复",
                MUSTTIME : "20161012110505",
                VALIDTIME : "20161012120301",
                MUSTCREATOR : "AB0000035816",
                DEPARTMENT: "",
                MUSTHTML : "您2016-10-12发布的《[外语学院]test》还有3人未读。",
                UNIVERSITY : [],
                ISREMIND : "0",
                REMINDTIME : "",
                ISRESEND : "",
                RECEIVEOBJECTS : [],
                ISPUBLISHREMIND : "",
                REMINDMUSTID : "100000000284",
                ISREADED: false
            },
            {
                // _id : "57fda8618e3b76f0e3cf43de",
                STATUS : "0",
                MUSTID : "100000000289",
                MUSTTITLE : "[回执提醒]通知消息",
                MUSTDESC : "您2016-10-12发布的《[外语学院]test》还有3人未读。",
                MUSTTIME : "20161012110505",
                VALIDTIME : "20161012120301",
                MUSTCREATOR : "AB0000035816",
                DEPARTMENT: "",
                MUSTHTML : "您2016-10-12发布的《[外语学院]test》还有3人未读。",
                UNIVERSITY : [],
                ISREMIND : "0",
                REMINDTIME : "",
                ISRESEND : "",
                RECEIVEOBJECTS : [],
                ISPUBLISHREMIND : "",
                REMINDMUSTID : "100000000284",
                ISREADED: false
            }

        ];

        return {notices};
    }
}
