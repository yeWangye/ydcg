var config = {
	rootUrl: "http://192.168.0.166:8080/scss/",
	testUrl: "http://192.168.0.166:8080/scss/",
	destUrl: "http://ydcg.cpylss.com:8081/ydcg/",
}
$(function(){
	if(localStorage.getItem("yi_ding_cheng_gong_loginInfo")) {
		var _session=JSON.parse(localStorage.getItem("yi_ding_cheng_gong_loginInfo"));
		var roleId=_session.info.roleId;
		if(roleId== "1") {
			$(".zuyuan_yeji").parent().css("display", "none");
			$("#component-example ul").children("li").eq("1").css("display", "none");
			$("#dropdown-xinxi-guanli ul").children("li").eq("1").css("display", "none");
			$("#dropdown-xinxi-shenhe").parent(".dropdown").css("display", "none");
			$("#meiri_renwu ul").children("li").eq("3").css("display", "none");
			$("#meiri_renwu ul").children("li").eq("4").css("display", "none");
			$("#meiri_renwu ul").children("li").eq("5").css("display", "none");
			
		}
		if(_session.groupId=="0"||roleId!=2){
			if(roleId==3){
				$(".jituanjunBox").css("display", "block");
			}else{
				$(".jituanjunBox").css("display", "none");
			}

		}
		if(roleId != "5"&&roleId != "3") {
			$(".tongjiBox").css("display", "none");
		}
		if(roleId!="3"){
			$(".shezhi_renwu").css("display", "none");
		}
		if(roleId=="3"){
			$(".wode_renwu").css("display", "none");
			$(".jituanjunBox a").attr("href", "jituanjun/jituanjun_list.html");
		}
	}
	
})
function initLoading(){
    $("body").append("<!-- loading -->" +
            "<div class='modal fade' id='loading' tabindex='-1' role='dialog' aria-labelledby='myModalLabel' data-backdrop='static'>" +
            "<div class='modal-dialog' role='document'>" +
            "<div class='modal-content'>" +
            "<div class='modal-header'>" +
            "<h4 class='modal-title' id='myModalLabel'>提示</h4>" +
            "</div>" +
            "<div id='loadingText' class='modal-body'>" +
            "<span class='glyphicon glyphicon-refresh' aria-hidden='true'>1</span>" +
            "数据请求中，请稍候。。。" +
            "</div>" +
            "</div>" +
            "</div>" +
            "</div>"
    );
}
function showLoading(text){
    $("#loadingText").html(text);
    $("#loading").modal("show");
}
function hideLoading(){
    $("#loading").modal("hide");
}