//退出,头像修改,名称显示;
$(".logout").on("click", function () {
    /*$.ajax({
        type: "post",
        url: config.rootUrl + "user/logout.do",
        async: true,
        data: {
            userId: session_login.info.userId
        },
        success: function (data) {
            if (window.location.pathname == "/ydcgweb/html/index.html") {
                window.location.href = "login.html";

            } else {
                window.location.href = "../login.html";

            }
            if (localStorage.getItem("yi_ding_cheng_gong_loginInfo")) {
                localStorage.removeItem("yi_ding_cheng_gong_loginInfo");

            } else if (sessionStorage.getItem("yi_ding_cheng_gong_loginInfo")) {
                sessionStorage.removeItem("yi_ding_cheng_gong_loginInfo");
            }

        },
        error: function (data) {
            alert(data);
        }

    });*/
    if (window.location.pathname == "/ydcgweb/html/index.html") {
        window.location.href = "login.html";
    } else {
        window.location.href = "../login.html";
    }
    if (localStorage.getItem("yi_ding_cheng_gong_loginInfo")) {
        localStorage.removeItem("yi_ding_cheng_gong_loginInfo");

    } else if (sessionStorage.getItem("yi_ding_cheng_gong_loginInfo")) {
        sessionStorage.removeItem("yi_ding_cheng_gong_loginInfo");
    }

})
$(function () {
    var username = session_login.info.realName;

    $(".username").text(username);
    var grade = session_login.info.grade;
    var roleId = session_login.info.roleId;
    switch (roleId) {
        case 1:
            if (grade == 2) {
                $(".role").text("科长");
            } else {
                $(".role").text("组员");
            }
            break;
        case 2:
            if(session_login.info.groupId!=0){
                $(".role").text(session_login.info.groupName);
            }else{
                $(".role").text("经理");
            }
            break;
        case 3:
            $(".role").text("董事");
            break;
        case 4:
            $(".role").text("行政");
            break;
        case 5:
            $(".role").text("会计");
            break;
        case 6:
            $(".role").text("人事");
            break;
    }

    var teamName = session_login.info.teamName;

    if(session_login.info.groupId!=0){
        $(".teamName").text("总经理");
    }else{
        $(".teamName").text(teamName);
    }
    var headimg = session_login.info.headImage;
    $(".profile-img img").attr("src", headimg);
    $(".headimg_exchange").on("click", function (e) {
        e.preventDefault();
        $("#headimg_exchange").trigger("click");
    })
    //头像上传开始
    var input = document.getElementById("headimg_exchange"); //获取选择图片的input元素
    //这边是判断本浏览器是否支持这个API。
    if (typeof FileReader === 'undefined') {
        alert("浏览器版本过低，请先更新您的浏览器~");
        input.setAttribute('disabled', 'disabled');
    } else {
        input.addEventListener('change', readFile, false);

        //如果支持就监听改变事件，一旦改变了就运行readFile函数。
    }

    $(".totalMsg").text(0);
    var totalNow = 0;
    //待审核业绩dai_shen_yeji
    $(".dai_shen_yeji").text("");
    $(".totalMsg").text("");
    $(".zuyuan_yeji").text("");
    $(".wode_yeji").text("");
    /*$.ajax({
        url: config.rootUrl + "user/getSelfTreat.do",
        data: {
            deviceToken: "html5",
            deviceType: "html5",
            status: "verify",
            userId: session_login.info.userId,
            page: "1",
            rows: "1",
        },
        async: true,
        type: "post",
        success: function(data) {
            if(data.code == 1) {
                var info = data.info.length == 0 ? 0 : data.pageCount;
                $(".dai_shen_yeji").text(info);
                totalNow += info;
                $(".totalMsg").text(totalNow);
            } else {
                $(".dai_shen_yeji").parent().css("display", "none");
            }

        },
        error: function() {
            alert("网络错误");

        }
    })*/
    //组员业绩zuyuan_yeji

    /*$.ajax({
        url: config.rootUrl + "user/getTreatList.do",
        data: {
            deviceToken: "html5",
            deviceType: "html5",
            status: "verify",
            userId: session_login.info.userId,
            page: "1",
            rows: "1",
        },
        async: true,
        type: "post",
        success: function(data) {
            if(data.code == 1) {
                var info = data.info.length == 0 ? 0 : data.pageCount;
                $(".zuyuan_yeji").text(info);
                totalNow += info;
                $(".totalMsg").text(totalNow);
            } else {
                $(".zuyuan_yeji").parent().css("display", "none");
                $("#component-example ul").children("li").eq("1").css("display", "none");
                $("#dropdown-xinxi-guanli ul").children("li").eq("1").css("display", "none");
                $("#dropdown-xinxi-shenhe").parent(".dropdown").css("display", "none");
            }

        },
        error: function() {
            alert("网络错误");

        }
    })*/

    //我的业绩wode_yeji
    /*$.ajax({
        url: config.rootUrl + "user/getSelfTreat.do",
        data: {
            deviceToken: "html5",
            deviceType: "html5",
            status: "notverify",
            userId: session_login.info.userId,
            page: "1",
            rows: "1",
        },
        async: true,
        type: "post",
        success: function(data) {
            var info = data.info.length == 0 ? 0 : data.pageCount;
            $(".wode_yeji").text(info);
            totalNow += info;
            $(".totalMsg").text(totalNow);
        },
        error: function() {
            alert("网络错误");

        }
    })*/

    //我的任务
    /*$.ajax({
        url: config.rootUrl + "user/listTeamTask.do",
        data: {
            deviceToken: "html5",
            deviceType: "html5",
            teamId: session_login.info.teamId,
            userId: session_login.info.userId,
            page: "1",
            rows: "1",
        },
        async: true,
        type: "post",
        success: function(data) {
            var info = data.info.length == 0 ? 0 : data.pageCount;
            //			$(".wode_yeji").text(info);
            totalNow += info;
            $(".totalMsg").text(totalNow);
            var _notification = '<a href="../wode_renwu/renwu_index.html">' +
                '<li class="list-group-item"><span class="badge wode_ren_notifi">' + info + '</span>' +
                '<i class="fa fa-bell-o icon"></i> 日工作表' +
                '</li>' +
                '</a>';
            $(".notifications").prepend(_notification);
        },
        error: function() {
            alert("网络错误");

        }
    })*/
    var _notification = '<a href="../wode_renwu/renwu_index.html" class="ri_gong_zuo_biao">' +
        '<li class="list-group-item"><span class="badge wode_ren_notifi">' + '' + '</span>' +
        '<i class="fa fa-bell-o icon"></i> 日工作表' +
        '</li>' +
        '</a>';
    $(".notifications").prepend(_notification);
});
//sidebar统一;
$(function () {
    var _sideBar = '<nav class="navbar navbar-default" role="navigation">' +
        '<div class="side-menu-container">' +
        '<div class="navbar-header">' +
        '<a class="navbar-brand" href="#">' +
        '<div class="icon fa fa-paper-plane"></div>' +
        '<div class="title">感动自己,一定成功</div>' +
        '</a>' +
        '<button type="button" class="navbar-expand-toggle pull-right visible-xs">' +
        '<i class="fa fa-times icon"></i>' +
        '</button>' +
        '</div>' +
        '<ul class="nav navbar-nav">' +
        '<li class="active">'+
        '<a href="../pages/zhidu.html">'+
        '<span class="icon fa fa-file-word-o"></span><span class="title">规章制度</span>'+
        '</a>'+
        '</li>'+
        '<li>'+
        '<a href="../index.html">' +
        '<span class="icon fa fa-tachometer"></span><span class="title">一定成功</span>' +
        '</a>' +
        '</li>' +
        '<li class="wode_renwu flag3">' +
        '<a href="../wode_renwu/renwu_index.html">' +
        '<span class="icon fa fa-bell-o"></span><span class="title">日工作表</span>' +
        '</a>' +
        '</li>' +
        '<li class="wode_renwu flag3">' +
        '<a href="../wode_renwu/yeji_renwu.html">' +
        '<span class="icon fa fa-calendar-o"></span><span class="title">业绩任务</span>' +
        '</a>' +
        '</li>' +
        '<li class="guanliceng_renwu flag3">' +
        '<a href="../wode_renwu/guanliceng_renwu.html">' +
        '<span class="icon fa fa-bullhorn"></span><span class="title">管理层任务</span>' +
        '</a>' +
        '</li>' +
        '<li class="panel panel-default dropdown hua_jia">' +
        '<a data-toggle="collapse" href="#hua_jia">' +
        '<span class="icon fa fa-balance-scale"></span><span class="title">划价系统</span>' +
        '</a>' +
        '<div id="hua_jia" class="panel-collapse collapse">' +
        '<div class="panel-body">' +
        '<ul class="nav navbar-nav">' +
        '<li><a href="../hua_jia/yaopin_guanli.html">药品管理</a></li>' +
        '<li><a href="../hua_jia/addPresc.html">添加协定方</a></li>' +
        '</ul>' +
        '</div>' +
        '</div>' +
        '</li>'+
        '<li class="panel panel-collapse dropdown shezhi_renwu flag2">' +
        '<a data-toggle="collapse" href="#shezhi_renwu">' +
        '<span class="icon fa fa-calendar-plus-o"></span><span class="title">设置任务</span>' +
        '</a>' +
        '<div id="shezhi_renwu" class="panel-collapse collapse">' +
        '<div class="panel-body">' +
        '<ul class="nav navbar-nav">' +
        '<li><a href="../shezhi_renwu/renwu_index.html">每日任务</a></li>' +
        '<li><a href="../shezhi_renwu/yeji_renwu.html">业绩任务</a></li>' +
        '<li><a href="../shezhi_renwu/guanliceng_renwu.html">管理层任务</a></li>' +
        '</ul>' +
        '</div>' +
        '</div>' +
        '</li>' +
        '<li class="panel panel-collapse dropdown renwu_jiancha">' +
        '<a data-toggle="collapse" href="#renwu_jiancha">' +
        '<span class="icon fa fa-binoculars"></span><span class="title">任务检查</span>' +
        '</a>' +
        '<div id="renwu_jiancha" class="panel-collapse collapse">' +
        '<div class="panel-body">' +
        '<ul class="nav navbar-nav">' +
        '<li  class="meiri_renwu_jiancha"><a href="../kaohe/renwu_jiancha.html">每日任务</a></li>' +
        '<li class="flag3 yeji_renwu_jiancha"><a href="../kaohe/yeji_renwu_jiancha.html">业绩任务</a></li>' +
        ' <li class="flag3 yeji_renwu_jiancha"><a href="../kaohe/yue_kaohe_list.html">月业绩任务</a>' +
        '<li class="flag3 yeji_renwu_jiancha"><a href="../kaohe/guanliceng_renwu_jiancha.html">管理层任务</a></li>' +
        '<li class="meiri_renwu_jiancha"><a href="../kaohe/zongjie_jiancha.html">工作总结</a></li>'+
        '</ul>' +
        '</div>' +
        '</div>' +
        '</li>' +
        '<li class="flag3">' +
        '<a href="../xinxi_guanli/tianjiayeji.html">' +
        '<span class="icon fa fa-plus-square-o"></span><span class="title">添加信息</span>' +
        '</a>' +
        '</li>' +
        '<li class="panel panel-collapse dropdown meiri_renwu_box flag3">' +
        '<a data-toggle="collapse" href="#meiri_renwu">' +
        '<span class="icon fa fa-bell"></span><span class="title">每日任务</span>' +
        '</a>' +
        '<div id="meiri_renwu" class="panel-collapse collapse">' +
        '<div class="panel-body">' +
        '<ul class="nav navbar-nav">' +
        '<li><a href="../meiri_renwu/lianjie.html">链接类</a></li>' +
        '<li><a href="../meiri_renwu/shequ.html">社区类</a></li>' +
        '<li><a href="../meiri_renwu/tongxun.html">通讯类</a></li>' +
        '<li><a href="../meiri_renwu/zuyuan__shequ.html">组员社区</a></li>' +
        '<li><a href="../meiri_renwu/zuyuan__tongxun.html">组员通讯</a></li>' +
        '<li><a href="../meiri_renwu/zuyuan__lianjie.html">组员链接</a></li>' +
        '</ul>' +
        '</div>' +
        '</div>' +
        '</li>' +
        '<li class="panel panel-default dropdown flag3">' +
        '<a data-toggle="collapse" href="#dropdown-xinxi-guanli">' +
        '<span class="icon fa fa-file-text-o"></span><span class="title">信息管理</span>' +
        '</a>' +
        '<div id="dropdown-xinxi-guanli" class="panel-collapse collapse">' +
        '<div class="panel-body">' +
        '<ul class="nav navbar-nav">' +
        '<li><a href="../xinxi_guanli/wode_xinxi.html">我的信息</a></li>' +
        '<li><a href="../xinxi_guanli/zuyuan_xinxi.html">组员信息</a></li>' +
        '<li><a href="../xinxi_guanli/daishen_xinxi.html">待审信息</a></li>' +
        '<li><a href="../xinxi_guanli/fangqi_xinxi.html">放弃信息</a></li>' +
        '<li><a href="../xinxi_guanli/lizhi_xinxi.html">离职信息</a></li>' +
        '<li><a href="../xinxi_guanli/xinxi_hongbao.html">信息红包</a></li>' +
        '</ul>' +
        '</div>' +
        '</div>' +
        '</li>' +
        '<li class="panel panel-default dropdown flag3">' +
        '<a data-toggle="collapse" href="#dropdown-xinxi-shenhe">' +
        '<span class="icon fa fa-eyedropper"></span><span class="title">信息审核</span>' +
        '</a>' +
        '<div id="dropdown-xinxi-shenhe" class="panel-collapse collapse">' +
        '<div class="panel-body">' +
        '<ul class="nav navbar-nav">' +
        '<li><a href="../xinxi_shenhe/dai_shenhe.html">待审核</a></li>' +
        '<li><a href="../xinxi_shenhe/tongguo.html">通过</a></li>' +
        '<li><a href="../xinxi_shenhe/wei_tonguo.html">未通过</a></li>' +
        '</ul>' +
        '</div>' +
        '</div>' +
        '</li>' +
        '<li class="panel panel-default dropdown flag3">' +
        '<a data-toggle="collapse" href="#component-example">' +
        '<span class="icon fa fa-cubes"></span><span class="title">业绩管理</span>' +
        '</a>' +
        '<div id="component-example" class="panel-collapse collapse">' +
        '<div class="panel-body">' +
        '<ul class="nav navbar-nav">' +
        '<li><a href="../yeji_guanli/yeji_dai_shenhe.html">待审核</a></li>' +
        '<li><a href="../yeji_guanli/zuyuan_yeji.html">组员业绩</a></li>' +
        '<li><a href="../yeji_guanli/yeji.html">业绩信息</a></li>' +
        '<li><a href="../tongji/yeji_bili.html">业绩比例</a></li>' +
        '<li><a href="../yeji_guanli/yeji_jiangli.html">业绩奖励</a></li>'+
        '</ul>' +
        '</div>' +
        '</div>' +
        '</li>' +
        '<li class="panel panel-default dropdown flag3">' +
        '<a data-toggle="collapse" href="#tianjiayeji">' +
        '<span class="icon fa fa-line-chart"></span><span class="title">添加业绩</span>' +
        '</a>' +
        '<div id="tianjiayeji" class="panel-collapse collapse">' +
        '<div class="panel-body">' +
        '<ul class="nav navbar-nav">' +
        '<li><a href="../tianjia_yeji/guahao.html">挂号费</a></li>' +
        '<li><a href="../tianjia_yeji/goutong.html">沟通费</a></li>' +
        '<li><a href="../tianjia_yeji/yizhu.html">接诊</a></li>' +
        '<li><a href="../tianjia_yeji/yuan_chu.html">远程(初诊)</a></li>' +
        '<li><a href="../tianjia_yeji/yuan_fu.html">远程(复诊)</a></li>' +
        '<li><a href="../tianjia_yeji/lai_chu.html">来院(初诊)</a></li>' +
        '<li><a href="../tianjia_yeji/lai_fu.html">来院复诊(来院)</a></li>' +
        '<li><a href="../tianjia_yeji/you_fu.html">来院复诊(邮寄)</a></li>' +
        '<li><a href="../tianjia_yeji/yuan_you_fu.html">远程复诊(来院)</a></li>' +
        '</ul>' +
        '</div>' +
        '</div>' +
        '</li>' +
        '<li class="jituanjunBox flag3">' +
        '<a href="../jituanjun/jituanjun.html">' +
        '<span class="icon fa fa-flag"></span><span class="title">集团军</span>' +
        '</a>' +
        '</li>' +
        '<li class="kaohe">' +
        '<a href="../kaohe/kaohe_weidabiao.html">' +
        '<span class="icon fa fa-exclamation-triangle"></span><span class="title">考核未达标</span>' +
        '</a>' +
        '</li>' +
        '<li class="kao_qing">' +
        '<a href="../kaohe/kao_qing.html">' +
        '<span class="icon fa fa-calendar-check-o"></span><span class="title">考勤统计</span>' +
        '</a>' +
        '</li>'+
        '<li class="panel panel-default dropdown tongjiBox">' +
        '<a data-toggle="collapse" href="#tongji">' +
        '<span class="icon fa fa-calculator"></span><span class="title">统计</span>' +
        '</a>' +
        '<div id="tongji" class="panel-collapse collapse">' +
        '<div class="panel-body">' +
        '<ul class="nav navbar-nav">' +
        '<li><a href="../tongji/yeji_shenhe.html">业绩审核</a></li>' +
        '<li><a href="../tongji/verifyDeparTreat.html">科室业绩</a></li>' +
        '<li><a href="../tongji/yeji_bili.html">业绩比例</a></li>' +
        '<li><a href="../tongji/tixian_tongji.html">提现统计</a></li>' +
        '<li><a href="../tongji/xinxi_shenhe.html">信息提现审核</a></li>' +
        '<li><a href="../tongji/tixian_shenhe.html">业绩提现审核</a></li>' +
        '<li><a href="../hua_jia/listMedInvoice.html">发药审核</a></li>' +
        '<li><a href="../tongji/zuyuan_liucun.html">组员留存</a></li>' +
        '<li><a href="../tongji/zhanghu_ruzhang.html">账户收支</a></li>' +
        '<li><a href="../tongji/zhanqu_total.html">战区业绩和任务</a></li>' +
        //		'<li><a href="../tongji/qiandao_tongji.html">考勤统计</a></li>' +
        //												'<li><a href="../tongji/keshi_yeji.html">科室业绩审核</a></li>'+
        '<li><a href="../tongji/menzheng.html">门诊业绩</a></li>' +
        '<li><a href="../tongji/menzheng_total.html">门诊业绩总和</a></li>' +
        '</ul>' +
        '</div>' +
        '</div>' +
        '</li>' +
        '<li class="panel panel-default dropdown pai_hang_bang_Box">' +
        '<a data-toggle="collapse" href="#pai_hang_bang">' +
        '<span class="icon fa fa-area-chart"></span><span class="title">排行榜</span>' +
        '</a>' +
        '<div id="pai_hang_bang" class="panel-collapse collapse">' +
        '<div class="panel-body">' +
        '<ul class="nav navbar-nav">' +
        '<li><a href="../pai_hang_bang/achieveRankList.html">信息排行榜</a></li>' +
        '<li><a href="../pai_hang_bang/rankList.html">业绩排行榜</a></li>' +
        '<li><a href="../pai_hang_bang/departRankList.html">科室排行榜</a></li>' +
        '<li><a href="../pai_hang_bang/appointRankList.html">预约排行榜</a></li>' +
        '<li><a href="../pai_hang_bang/hospNewRankList.html">预约来院排行榜</a></li>' +
        '<li><a href="../pai_hang_bang/assistRankList.html">医助排行榜</a></li>' +
        '<li><a href="../pai_hang_bang/onlineRankList.html">远程排行榜</a></li>' +
        '</ul>' +
        '</div>' +
        '</div>' +
        '</li>'+
        '<li class="zuyuan_guanli flag3">' +
        '<a href="../zuyuan_guanli/zuyuan_guanli.html">' +
        '<span class="icon fa fa-users"></span><span class="title">组员管理</span>' +
        '</a>' +
        '</li>' +
        '<li class="zuyuan_guanli huajia">' +
        '<a href="../doctor_assistant/addMedcineRecord.html">' +
        '<span class="icon fa fa-balance-scale"></span><span class="title">划价</span>' +
        '</a>' +
        '</li>'+
        '<li class="zuyuan_guanli flag3">' +
        '<a href="../hua_jia/medRecord.html">' +
        '<span class="icon fa fa-adjust"></span><span class="title">发药</span>' +
        '</a>' +
        '</li>'+
        '<li class="keshi_yeji flag3">' +
        '<a href="../jituanjun/keshi_total.html">' +
        '<span class="icon fa fa-list-ol"></span><span class="title">科室业绩</span>' +
        '</a>' +
        '</li>'+
        '<li class="zuyuan_guanli">' +
        '<a href="../huiyi_jilu/huiyi_jilu.html">' +
        '<span class="icon fa fa-street-view"></span><span class="title">会议记录</span>' +
        '</a>' +
        '</li>' +
        '<li class="zuyuan_guanli">' +
        '<a href="../zhanghao_guanli/zhanghao_guanli.html">' +
        '<span class="icon fa fa-suitcase"></span><span class="title">账号管理</span>' +
        '</a>' +
        '</li>' +
        '<li class="zhanqu_guanli">' +
        '<a href="../zhanqu_guanli/zhanqu_guanli.html">' +
        '<span class="icon fa fa-key"></span><span class="title">战区管理</span>' +
        '</a>' +
        '</li>' +
        '<li class="gongzuo_zongjie">'+
        '<a href="../gongzuo_zongjie/zuyuan_tianjia.html" class="lable0">'+
        '<span class="icon fa fa-keyboard-o"></span><span class="title">工作总结</span>'+
        '</a>'+
         '<a href="../gongzuo_zongjie/jingli_tianjia.html" class="lable1">'+
        '<span class="icon fa fa-keyboard-o"></span><span class="title">工作总结</span>'+
        '</a>'+
        '</li>'+
        '<li class="panel panel-default dropdown">' +
        '<a data-toggle="collapse" href="#dropdown-element">' +
        '<span class="icon fa fa-desktop"></span><span class="title">界面设置</span>' +
        '</a>' +
        '<div id="dropdown-element" class="panel-collapse collapse">' +
        '<div class="panel-body">' +
        '<ul class="nav navbar-nav">' +
        '<li>' +
        '<a href="../ui-kits/theming.html">主题</a>' +
        '</li>' +
        '</ul>' +
        '</div>' +
        '</div>' +
        '</li>' +
        '<li class="panel panel-default dropdown">' +
        '<a data-toggle="collapse" href="#dropdown-example">' +
        '<span class="icon fa fa-slack"></span><span class="title">更多</span>' +
        '</a>' +
        '<div id="dropdown-example" class="panel-collapse collapse">' +
        '<div class="panel-body">' +
        '<ul class="nav navbar-nav">' +
        '<li><a href="../login.html">注销登陆</a></li>' +
        '<li><a href="http://www.bj11ss.com/index.html" target="_blank">公司官网</a></li>' +
        '</ul>' +
        '</div>' +
        '</div>' +
        '</li>' +
        '</ul>' +
        '</div>' +
        '</nav>';
    $("#sidebar").html(_sideBar);
//鉴权
    var roleId = session_login.info.roleId;
    if(roleId == "1") {
        $(".zuyuan_yeji").parent().css("display", "none");
        $("#component-example ul").children("li").eq("1").css("display", "none");
        $("#dropdown-xinxi-guanli ul").children("li").eq("1").css("display", "none");
        $("#dropdown-xinxi-shenhe").parent(".dropdown").css("display", "none");
        $("#meiri_renwu ul").children("li").eq("3").css("display", "none");
        $("#meiri_renwu ul").children("li").eq("4").css("display", "none");
        $("#meiri_renwu ul").children("li").eq("5").css("display", "none");
        $(".jituanjunBox").css("display", "none");
        $(".zuyuan_guanli").css("display", "none");
        $(".guanliceng_renwu").css("display", "none");
        $(".keshi_yeji").css("display", "none");
    }
    //科长
    if(roleId==1&&session_login.info.grade == 2){
        $(".keshi_yeji").css("display", "block");
        $(".huajia").css("display", "block");
        $(".guanliceng_renwu").css("display", "block");
    }
    if(session_login.info.groupId == "0") {
        $(".jituanjunBox").css("display", "none");
    }
    if(session_login.info.roleId != "2") {
        $(".zhanqu_guanli").css("display", "none");
    }
    if(session_login.info.label== "1") {
        $(".lable0").css("display","none");
    }else{
        $(".lable1").css("display","none");
    }
    if(roleId != "3") {
        $(".shezhi_renwu").css("display", "none");
    }

    if(roleId != "4") {
        $(".renwu_jiancha").css("display", "none");
    }
    if(roleId == "4"){
        $(".lable0").css("display","none");
        $(".lable1").css("display","none");
        $(".huajia").css("display", "none");
        $(".notifications").css("display","none");
    }
    if(roleId != "1"&roleId != "2"){
        $(".flag3").css("display", "none");
    }
    $(".temp").css("display", "none");
    if(roleId != "5") {
        $(".tongjiBox").css("display", "none");
        $(".hua_jia").css("display", "none");
        $(".kao_qing").css("display", "none");
    }
    if(roleId=="5"){
        $(".lable0").css("display","none");
        $(".lable1").css("display","none");
        $(".renwu_jiancha").css("display", "block");
        $(".meiri_renwu_jiancha").css("display","none");
        $(".notifications").css("display","none");
        $(".yeji_renwu_jiancha").css("display","block");
        $(".huajia").css("display", "none");
    }
    if(roleId != "6") {
        $(".kaohe").css("display", "none");
    }
    if(roleId == "6"){
        $(".lable0").css("display","none");
        $(".lable1").css("display","none");
        $(".notifications").css("display","none");
        $(".renwu_jiancha").css("display","block");
        $(".meiri_renwu_jiancha").css("display","block");
        $(".yeji_renwu_jiancha").css("display", "block");
        $(".huajia").css("display", "none");
    }
    if (roleId == "3") {
        $(".lable0").css("display","none");
        $(".lable1").css("display","none");
        $(".wode_renwu").css("display", "none");
        $(".notifications").css("display","none");
        $(".jituanjunBox").css("display", "block");
        $(".jituanjunBox a").attr("href", "../jituanjun/jituanjun_list.html");
        $(".tongjiBox").css("display", "block");
        $(".kaohe").css("display", "block");
        $(".renwu_jiancha").css("display", "block");
        $(".meiri_renwu_jiancha").css("display","block");
        $(".yeji_renwu_jiancha").css("display", "block");
    }
    if(session_login.info.userName=="scss10002"){
        $(".hua_jia").css("display", "block");
        $(".temp").css("display", "block");
    }
})