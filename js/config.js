var config = {
	rootUrl: "http://ydcg.cpylss.com:8081/ydcg/",
	testUrl: "http://192.168.0.166:8080/scss/",
	destUrl: "http://ydcg.cpylss.com:8081/ydcg/",
}
if(localStorage.getItem("yi_ding_cheng_gong_loginInfo")&&JSON.parse(localStorage.getItem("yi_ding_cheng_gong_loginInfo")).info.roleId == "1") {
	$(".zuyuan_yeji").parent().css("display", "none");
	$("#component-example ul").children("li").eq("1").css("display","none");
	$("#dropdown-xinxi-guanli ul").children("li").eq("1").css("display","none");
	$("#dropdown-xinxi-shenhe").parent(".dropdown").css("display","none");
	$("#meiri_renwu ul").children("li").eq("3").css("display","none");
	$("#meiri_renwu ul").children("li").eq("4").css("display","none");
	$("#meiri_renwu ul").children("li").eq("5").css("display","none");
	
}