var myVue = new Vue({
    el: '#calendar',
    data: {
        currentDay: 1,
        currentMonth: 1,
        currentYear: 1970,
        currentWeek: 1,
        orderMax: 30,
        toggle: true,
        doctors: [],
        doctorId: 1,
        canset:false,
        rest:false,
        searchDate: "",
        days: [],
        times: [],
        restArr:[
            "8:00","8:20","8:40",
            "9:00","9:20","9:40",
            "10:00","10:20","10:40",
            "11:00","11:20","11:40",
            "12:00","12:20","12:40",
            "13:00","13:20","13:40",
            "14:00","14:20","14:40",
            "15:00","15:20","15:40",
            "16:00","16:20","16:40",
            "17:00","17:20","17:40",
        ],
        leftobj: [    //存放剩余数量
            {count: 5},{count: 3},{count: 2},{count: 5},{count: 5},{count: 5},{count: 1},{count: 5},{count: 5},{count: 1},
        ],
    },
    computed: {
        date: function () {
            return this.searchDate;
        },
    },
    created: function () {  //在vue初始化时调用
        this.initData(null);
    },
    filters: {
        mask: function (value, userId) {
            if (userId == session_login.info.userId) {
                return value;
            } else {
                return value.split("")[0] + "**";
            }
        }
    },
    methods: {
        initData: function (cur) {
            if (this.doctors.length == 0) {
                this.getDoctor();
            }
            var leftcount = 0; //存放剩余数量
            var date;
            var index = 0;   //控制显示预定的天数 ，比如下面设置只能预定三天的
            //this.initleftcount(); 每次初始化更新数量
            //有两种方案  一种是每次翻页 ajax获取数据初始化   http请求过多会导致资源浪费
            // 一种是每次请求 ajax获取数据初始化    数据更新过慢会导致缺少实时性
            //还可以setTimeout 定时请求更新数据  实现数据刷新（可能会更好）

            if (cur) {
                date = new Date(cur);
            } else {
                var now = new Date();
                var d = new Date(this.formatDate(now.getFullYear(), now.getMonth(), 1));
                d.setDate(35);
                date = new Date(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1));
            }
            this.currentDay = date.getDate();
            this.currentYear = date.getFullYear();
            this.currentMonth = date.getMonth() + 1;

            this.currentWeek = date.getDay(); // 1...6,0
            if (this.currentWeek == 0) {
                this.currentWeek = 7;
            }
            var str = this.formatDate(this.currentYear, this.currentMonth, this.currentDay);
            this.days.length = 0;
            // 今天是周日，放在第一行第7个位置，前面6个
            //初始化本周
            for (var i = this.currentWeek - 1; i >= 0; i--) {
                var d = new Date(str);
                d.setDate(d.getDate() - i);
                var dayobject = {};
                dayobject.day = d;
                var now = new Date();
                if (d.getDate() === (now.getDate()) && d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()) {
                    dayobject.index = index++;//从今天开始显示供预定的数量
                }
                else if (index != 0 && index < this.orderMax)
                    dayobject.index = index++;//从今天开始3天内显示供预定的数量
                this.days.push(dayobject);//将日期放入data 中的days数组 供页面渲染使用

            }
            //其他周
            for (var i = 1; i <= 35 - this.currentWeek; i++) {
                var d = new Date(str);
                d.setDate(d.getDate() + i);
                var dayobject = {};
                dayobject.day = d;
                var now = new Date();
                if (d.getDate() === (now.getDate()) && d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()) {
                    dayobject.index = index++;
                }
                else if (index != 0 && index < this.orderMax)
                    dayobject.index = index++;
                this.days.push(dayobject);
            }

        },
        delay:function (val) {
          if(val>=new Date().getTime()){
              return true;
          }else{
              return false;
          }
        },
        order: function (day) {  //预定函数
            this.toggle = false;
            if (typeof day == "object") {
                var days = day.day;
                var day_temp = days.getDate();
                var year = days.getFullYear();
                var month = days.getMonth() + 1;
                this.searchDate = this.formatDate(year, month, day_temp);
                this.getOrderDays();
            } else if (typeof day == "string") {
                this.getOrderDays(day);
            }

            /*if (this.leftobj[day.index].count >= 1)
                this.leftobj[day.index].count--;
            else
                alert('已经没有位置了')*/
        },
        setDoctRest:function () {
            var that=this;
            $("body").mLoading("show");
            $.ajax({
                url: config.rootUrl + "user/setDoctRest.do",
                data: {
                    deviceToken: "html5",
                    deviceType: "html5",
                    userId: session_login.info.userId,
                    doctorId: that.doctorId,
                    date: that.searchDate,
                },
                async: true,
                type: "post",
                success: function (data) {
                    if (data.code == "1") {
                        that.rest=!that.rest;
                        if(!that.rest&&that.times.length==0){
                            that.getOrderDays();
                        }
                        alert(data.msg);
                    } else {
                        alert(data.msg);
                    }
                },
                error: function () {
                    alert("发生错误,联系技术人员");
                },
                complete: function () {
                    $("body").mLoading("hide"); //关闭loading组件
                }
            })
        },
        self: function (userId) {
            if (userId == session_login.info.userId) {
                return true;
            } else {
                return false;
            }
        },
        changeToggle: function () {
            this.toggle = true;
            this.times = [];
        },
        appoint: function (dsId) {
            $('#dsId').val(dsId);
            modal.cancel=false;
            $('#swt').modal('show');
        },
        see:function (dsId) {
            modal.cancel=true;
            modal.getDetail(dsId);
        },
        selectDoctor: function () {
            var doctorId = $("#doctor").val();
            this.doctorId = doctorId;
            if(this.toggle==false){
                this.getOrderDays();
            }
        },
        pickPre: function (year, month) {
            // setDate(0); 上月最后一天
            // setDate(-1); 上月倒数第二天
            // setDate(dx) 参数dx为 上月最后一天的前后dx天
            var d = new Date(this.formatDate(year, month, 1));
            d.setDate(0);
            this.initData(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1));
        },
        pickNext: function (year, month) {
            var d = new Date(this.formatDate(year, month, 1));
            d.setDate(35);
            this.initData(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1));
        },
        pickYear: function (year, month) {
            alert(year + "," + month);
        },
        // 获取医生排班
        getOrderDays: function () {
            var that = this;
            that.times = [];
            $("body").mLoading("show");
            $.ajax({
                url: config.rootUrl + "user/appointList.do",
                data: {
                    deviceToken: "html5",
                    deviceType: "html5",
                    userId: session_login.info.userId,
                    doctorId: that.doctorId,
                    page: 1,
                    rows: 60,
                    searchDate: that.searchDate,
                },
                async: true,
                type: "post",
                success: function (data) {
                    if(data.managerId==session_login.info.userId){
                        that.canset=true;
                    }else{
                        that.canset=false;
                    }
                    if (data.code == 1) {
                        if (data.info.length == 0) {
                            alert("该医生当天没有排班！");
                        }
                        for (var i in data.info) {
                            that.times.push(data.info[i]);
                        }
                        that.rest=false;
                    } else if(data.code==5){
                        that.rest=true;
                    }else{
                        alert(data.msg);
                    }
                },
                error: function () {
                    alert("发生错误,联系技术人员");
                },
                complete: function () {
                    $("body").mLoading("hide"); //关闭loading组件
                }
            })
        },
        //获取医生id
        getDoctor: function () {
            var that = this;
            $("body").mLoading("show");
            $.ajax({
                url: config.rootUrl + "user/getDoctor.do",
                data: {
                    deviceToken: "html5",
                    deviceType: "html5",
                    userId: session_login.info.userId,
                },
                async: true,
                type: "post",
                success: function (data) {
                    if (data.code == "1") {
                        for (var i in data.info) {
                            that.doctors.push(data.info[i]);
                        }
                    } else {
                        alert(data.msg);
                    }
                },
                error: function () {
                    alert("发生错误,联系技术人员");
                },
                complete: function () {
                    $("body").mLoading("hide"); //关闭loading组件
                }
            })
        },
        // 返回 类似 2016-01-02 格式的字符串
        formatDate: function (year, month, day) {
            var y = year;
            var m = month;
            if (m < 10) m = "0" + m;
            var d = day;
            if (d < 10) d = "0" + d;
            return y + "-" + m + "-" + d
        },


    },
});
var scrollVue = new Vue({
    el: ".list_lh",
    data: {
        items: [],
    },
    filters: {
        mask: function (value) {
            if(value){
                return value.split("")[0] + "**";
            }else{
                return "";
            }
        },
        toLocalTime:function (val) {
            return new Date(val).toLocaleString();
        }
    },
    mounted: function () {
        this.$nextTick(function () {
            scrollVue.doAjax();
            setInterval('scrollVue.doAjax()',600000);
        })
    },
    methods: {
        doAjax:function (){
            var that=this;
            $("body").mLoading("show");
            $.ajax({
                url: config.rootUrl + "user/appointDoctorList.do",
                data: {
                    deviceToken: "html5",
                    deviceType: "html5",
                    userId: session_login.info.userId,
                    // doctorId: doctorId,
                    page: 1,
                    rows: 60,
                },
                async: true,
                type: "post",
                success: function (data) {
                    if (data.code == "1") {
                        data.info.forEach(function (value,index) {
                            that.items.push(data.info[index]);
                        })
                    } else {
                        console.log(data.msg);
                    }
                },
                error: function () {
                    console.log("发生错误");
                },
                complete: function () {
                    $("body").mLoading("hide"); //关闭loading组件
                }
            })
        }

    }
})
var modal=new Vue({
    el:"#swt",
    data:{
        info:"",
        title:"预约",
        cancel:false,
        dsId:"",
    },
    filters:{
      type:function (val) {
          if(val==0){
              return "面诊";
          }else if(val == 1){
              return "视频";
          }
      }
    },
    computed:{
        title:function(){
            if(this.cancel){
                return "取消预约";
            }else{
                return "预约";
            }
        },
        time:function () {
            var that=this;
            return that.info.date+" "+ that.info.time;
        }

    },
    methods:{
        getDetail:function (dsId) {
            var that=this;
            that.dsId=dsId;
            $.ajax({
                url: config.rootUrl + "user/scheduleDetail.do",
                data: {
                    deviceToken: "html5",
                    deviceType: "html5",
                    userId: session_login.info.userId,
                    dsId: dsId,
                },
                async: true,
                type: "post",
                success: function (data) {
                    if(data.code==1){
                        that.info=data.info;
                        $('#swt').modal('show');
                    }else{
                        alert(data.msg);
                    }
                },
                error: function () {
                    alert("发生错误");
                },
                complete: function () {
                    $("body").mLoading("hide"); //关闭loading组件
                }
            })
        },
        cancelAppoint:function(){
            var that=this;
            $("body").mLoading("show");
            $.ajax({
                url: config.rootUrl + "user/cancelAppoint.do",
                data: {
                    deviceToken: "html5",
                    deviceType: "html5",
                    userId: session_login.info.userId,
                    dsId: that.dsId,
                },
                async: true,
                type: "post",
                success: function (data) {
                    alert(data.msg);
                    myVue.getOrderDays();
                },
                error: function () {
                    alert("发生错误,联系技术人员");
                },
                complete: function () {
                    $("#swt").modal('hide');
                    $("body").mLoading("hide"); //关闭loading组件
                }
            })
        },
        appoint:function () {
            //预约
            var dsId=$("#dsId").val();
            var patientName=$("#patientName").val();
            var patientPhone=$("#patientPhone").val();
            var dId=$("#dId").val();
            var dName=$("#dId").find("option:selected").text();
            var treatId=$("#treatId").val();
            var treatName=$("#treatId").find("option:selected").text();
            var type=$("#type").val();
            if(dId==""||treatId==""||type==""||patientName==""||patientPhone==""){
                alert("请补全所有信息！");
                return;
            }
            $("body").mLoading("show");
            $.ajax({
                url: config.rootUrl + "user/appointDoctor.do",
                data: {
                    deviceToken: "html5",
                    deviceType: "html5",
                    userId: session_login.info.userId,
                    dsId: dsId,
                    appointName: session_login.info.realName,
                    patientName: patientName,
                    patientPhone: patientPhone,
                    dId: dId,
                    dName: dName,
                    treatId: treatId,
                    treatName: treatName,
                    type: type,
                },
                async: true,
                type: "post",
                success: function (data) {
                    alert(data.msg);
                    myVue.getOrderDays();
                },
                error: function () {
                    alert("发生错误");
                },
                complete: function () {
                    $("#swt").modal('hide');
                    $("body").mLoading("hide"); //关闭loading组件
                }
            })

        }
    }
})