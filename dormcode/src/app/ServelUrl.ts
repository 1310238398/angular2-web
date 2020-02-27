export class ServelUrl {
    static leavePrefix = '/api/leaveapplication';
    static question = '/api/questionnaire';
    static UniversityID='119061';
    static Url = {
        getUpToken: '/api/fproof/appget', //获取七牛上传凭证
        saveAttach: '/api/system/saveattach', //公共的文件上传
        apiUrl: '/api/staff/interface',
        fileUrl: '/api/staff/file',
        apiFlowUrl: '/api/flow/interface', // 工作流服务

        getaeccss: '/api/dormitoryqrcode/getaeccss',  //获取访问权限
        getqrcodebindstatus: '/api/dormitoryqrcode/getqrcodebindstatus',  //获取二维码是否被绑定接口
        getdistrict: '/api/dormitoryqrcode/getdistrict',  //获取园区
        getdormitory: '/api/dormitoryqrcode/getdormitory',  //获取宿舍楼
        getunit: '/api/dormitoryqrcode/getunit',  //获取单元
        getroom: '/api/dormitoryqrcode/getroom',  //获取宿舍
        getclasscadreroomlist: '/api/dormitoryqrcode/getclasscadreroomlist',  //班干部获取所属宿舍接口

        bindqrcodetoroom: '/api/dormitoryqrcode/bindqrcodetoroom',  //获取顶部标题

        gettoptitle: '/api/dormitoryqrcode/gettoptitle',  //获取顶部标题
        getroommember: '/api/dormitoryqrcode/getroommember',  //获取宿舍成员
        gethygiene: '/api/dormitoryqrcode/gethygiene',  //获取宿舍卫生检查结果
        getviolation: '/api/dormitoryqrcode/getviolation',  //获取宿舍违纪检查结果

        getqrcodebindhistory: '/api/dormitoryqrcode/getqrcodebindhistory',  //宿舍绑定二维码历史记录
        untieqrcodetoroom: '/api/dormitoryqrcode/untieqrcodetoroom',  //解绑二维码接口

        schoolcalendar: '/api/system/schoolcalendarnowyearterm',  //获取当前学年学期




        ssjc:'antlinker-ssjc',
        //任务详情列表
        tasklist: '/api/dormitorychecktask/ptask',
        //被分配宿舍楼页面头部
        dtasktop: '/api/dormitorychecktask/dtasktop',
        //被分配宿舍页面头部
        rtasktop: '/api/dormitorychecktask/rtasktop',
        // 被分配宿舍楼页面列表
        dtasklist: '/api/dormitorychecktask/dtasklist',
        //  被分配宿舍页面列表
        rtasklist: '/api/dormitorychecktask/rtasklist',
        //  被分配宿舍页面列表(离线)
        rtasklistoffline: '/api/dormitorychecktask/rtasklistoffline',
        //  检查是否完成代办(在提交答题完成时走这个接口)
        tododonecheck: '/api/dormitorychecktask/tododonecheck',
        //  提交检查完成
        submitoptions: '/api/dormitorychecktask/submitoptions',
        getWeek: "/api/system/schoolcalendarnowyearterm",
    
        //查询房间检查结果
        roomresult: '/api/dormitorychecktask/roomresult',
        //获取上传附件
        roomattach: '/api/dormitorychecktask/roomattach'












 









    }
}
