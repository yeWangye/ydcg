// 选择框默认值
function checked(ele,val) {
    var target = ele.select2();
    target.val(val).trigger("change");
}
// 战区数据填充
$.ajax({
    url: config.rootUrl + "user/getListTeam.do",
    data: {
        deviceToken: "html5",
        deviceType: "html5",
        userId: session_login.info.userId,
        page: 1,
        rows: "200",
    },
    async: true,
    type: "post",
    success: function(data) {
        var zhanqu = $("#team");
        //添加选项内容
        var info = data.info;
        for(var i in info) {
            var _option = document.createElement("option");
            _option.value = info[i].teamId;
            _option.text = info[i].teamName;
            zhanqu.append(_option);
        }
    },
    error: function() {
        alert("发生错误");
    },
    complete: function() {
        if("teamId" in session_data){
            $(".team").css("display","block");
            checked($('#team'),session_data.teamId);
        }else{
            $('#team').select2("val", "")
        }
    }
})
// 科室数据填充
$.ajax({
    url: config.rootUrl + "user/getTreatWay.do",
    data: {
        deviceToken: "html5",
        deviceType: "html5",
        userId: session_login.info.userId,
        page: 1,
        rows: "200",
    },
    async: true,
    type: "post",
    success: function(data) {
        var depart = $("#depart");
        var deptInfo = data.deptInfo;
        for(var i in deptInfo) {
            var _option = document.createElement("option");
            _option.value = deptInfo[i].departId;
            _option.text = deptInfo[i].departName;
            depart.append(_option);
        }
        // 就诊方式数据填充
        var treat = $("#treat");
        var info = data.info;
        for(var i in info) {
            var _option = document.createElement("option");
            _option.value = info[i].treatId;
            _option.text = info[i].treatName;
            treat.append(_option);
        }
    },
    error: function() {
        alert("发生错误");
    },
    complete: function() {
        if("departId" in session_data){
            $(".depart").css("display","block");
            checked($('#depart'),session_data.departId);
        }else{
            $('#depart').select2("val", "");
        }
        if("treatId" in session_data){
            $(".treat").css("display","block");
            checked($('#treat'),session_data.treatId);
        }else{
            $('#treat').select2("val", "");
        }
    }
})
// 医生数据填充
$.ajax({
    url: config.rootUrl + "user/getDoctor.do",
    data: {
        deviceToken: "html5",
        deviceType: "html5",
        userId: session_login.info.userId,
        page: 1,
        rows: "200",
    },
    async: true,
    type: "post",
    success: function(data) {
        var doctor = $("#doctor");
        //添加选项内容
        var info = data.info;
        for(var i in info) {
            var _option = document.createElement("option");
            _option.value = info[i].doctorId;
            _option.text = info[i].doctorName;
            doctor.append(_option);
        }
    },
    error: function() {
        alert("发生错误");
    },
    complete: function() {
        if("doctorId" in session_data){
            $(".doctor").css("display","block");
            checked($('#doctor'),session_data.doctorId);
        }else{
            $('#doctor').select2("val", "")
        }
    }
})
// 医院数据填充
$.ajax({
    url: config.rootUrl + "user/getHospital.do",
    data: {
        deviceToken: "html5",
        deviceType: "html5",
        userId: session_login.info.userId,
        page: 1,
        rows: "200",
    },
    async: true,
    type: "post",
    success: function(data) {
        var hosp = $("#hosp");
        //添加选项内容
        var info = data.info;
        for(var i in info) {
            var _option = document.createElement("option");
            _option.value = info[i].hospId;
            _option.text = info[i].hospName;
            hosp.append(_option);
        }
    },
    error: function() {
        alert("发生错误");
    },
    complete: function() {
        if("hospId" in session_data){
            checked($('#hosp'),session_data.hospId);
        }else{
            $('#hosp').select2("val", "");
        }
    }
})
//组员数据填充
$.ajax({
    url: config.rootUrl + "user/searchUser.do",
    data: {
        deviceToken: "html5",
        deviceType: "html5",
        userId: session_login.info.userId,
        searchName:"",
        page: 1,
        rows: "1000",
    },
    async: true,
    type: "post",
    success: function(data) {
        $("#member").innerHTML="";
        var member = $("#member");
        //添加选项内容
        var info = data.info;
        for(var i in info) {
            var _option = document.createElement("option");
            _option.value = info[i].memberId;
            _option.text = info[i].realName;
            member.append(_option);
        }
    },
    error: function() {
        alert("发生错误");
    },
    complete: function() {
        if(session_data&&"memberId" in session_data){
            checked($('#member'),session_data.memberId);
        }else{
            $('#member').select2("val", "");
        }
    }
})
var session_data = sessionStorage.getItem("json_data");
var json_data={};
if(session_data) {
    session_data=JSON.parse(session_data);
    if("patientName" in session_data){
        $(".patientName").css("display","block");
        $(".patient_name").val(session_data.patientName);
        json_data.patientName=session_data.patientName;
    }
    if("appointName" in session_data){
        $(".appointName").css("display","block");
        $(".appoint_name").val(session_data.appointName);
        json_data.appointName=session_data.appointName;
    }
    if("payTime" in session_data){
        $(".payTime").css("display","block");
        $(".pay_time").val(session_data.payTime);
    }
    if("starTime" in session_data){
        $(".starTime").css("display","block");
        $(".star_time").val(session_data.starTime);
    }
    if("endTime" in session_data){
        $(".endTime").css("display","block");
        $(".end_time").val(session_data.endTime);
    }
    if("payMoney" in session_data){
        $(".payMoney").css("display","block");
        $(".pay_money").val(session_data.payMoney);
        json_data.payMoney=session_data.payMoney;
    }
    if("teamId" in session_data){
        $(".team").css("display","block");
        json_data.teamId=session_data.teamId;
    }
    if("departId" in session_data){
        $(".depart").css("display","block");
        json_data.departId=session_data.departId;
    }
    if("memberId" in session_data){
        $(".member").css("display","block");
        json_data.memberId=session_data.memberId;
    }
    if("hospId" in session_data){
        $(".hosp").css("display","block");
        json_data.doctorId=session_data.hospId;
    }
    if("treatId" in session_data){
        $(".treat").css("display","block");
        json_data.treatId=session_data.treatId;
    }
    if("accountId" in session_data){
        $(".account").css("display","block");
        json_data.accountId=session_data.accountId;
    }
    if("doctorId" in session_data){
        $(".doctor").css("display","block");
        json_data.doctorId=session_data.doctorId;
    }
    if("page" in session_data){
        $(".pageBox").css("display","block");
        $(".page").val(session_data.page);
        json_data.page=session_data.page;
    }
    if("status" in session_data){
        $(".sta").css("display","block");
        checked($('#sta'),session_data.status);
        json_data.status=session_data.status;
    }
}else{
    session_data={};
}