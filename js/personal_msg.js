//退出,头像修改,名称显示;
$(".logout").on("click", function() {
	$.ajax({
		type: "post",
		url: config.rootUrl + "user/logout.do",
		async: true,
		data: {
			userId: session_login.info.userId
		},
		success: function(data) {
			if(window.location.pathname == "/ydcgweb/html/index.html") {
				window.location.href = "login.html";

			} else {
				window.location.href = "../login.html";

			}

			localStorage.removeItem("yi_ding_cheng_gong_loginInfo");
		},
		error: function(data) {
			alert(data);
		}

	});

})
$(function() {
	var username = session_login.info.realName;

	$(".username").text(username);
	var grade = session_login.info.grade;
	var roleId = session_login.info.roleId;
	switch(roleId) {
		case 1:
			$(".role").text("组员");
			break;
		case 2:
			$(".role").text("经理");
			break;
		case 3:
			$(".role").text("总经理");
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
	$(".teamName").text(teamName);
	var headimg = session_login.info.headImage;
	$(".profile-img img").attr("src", headimg);
	$(".headimg_exchange").on("click", function(e) {
		e.preventDefault();
		$("#headimg_exchange").trigger("click");
	})
	//头像上传开始
	var input = document.getElementById("headimg_exchange"); //获取选择图片的input元素 
	//这边是判断本浏览器是否支持这个API。 
	if(typeof FileReader === 'undefined') {
		alert("浏览器版本过低，请先更新您的浏览器~");
		input.setAttribute('disabled', 'disabled');
	} else {
		input.addEventListener('change', readFile, false);

		//如果支持就监听改变事件，一旦改变了就运行readFile函数。 
	}

	$(".totalMsg").text(0);
	var totalNow = 0;
	//待审核业绩dai_shen_yeji
	$.ajax({
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
	})
	//组员业绩zuyuan_yeji

	$.ajax({
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
				$("#component-example ul").children("li").eq("1").css("display","none");
				$("#dropdown-xinxi-guanli ul").children("li").eq("1").css("display","none");
				$("#dropdown-xinxi-shenhe").parent(".dropdown").css("display","none");
			}

		},
		error: function() {
			alert("网络错误");

		}
	})

	//我的业绩wode_yeji
	$.ajax({
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
	})

});
//提示信息总数totalMsg;