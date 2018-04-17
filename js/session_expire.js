var expireTime = 7 * 24 * 60 * 60 * 1000; //过期时间7天
if(localStorage.getItem("yi_ding_cheng_gong_loginInfo")) {
	var session_login = JSON.parse(localStorage.getItem("yi_ding_cheng_gong_loginInfo"));
	if(new Date().getTime() - session_login.timstamp > expireTime) {
		localStorage.clear();
		window.location.href = "../login.html";
	}
} else if(sessionStorage.getItem("yi_ding_cheng_gong_loginInfo")) {
	session_login = JSON.parse(sessionStorage.getItem("yi_ding_cheng_gong_loginInfo"));
} else {
	window.location.href = "../login.html";
}
$(function() {
	var teamName = session_login.info.teamName;
	$(".teamName").text(teamName);
	var headimg = session_login.info.headImage;
	$(".profile-img img").attr("src", headimg);
	$(".headimg_exchange").on("click", function(e) {
		e.preventDefault();
		$("#headimg_exchange").trigger("click");
	})
	var input = document.getElementById("headimg_exchange"); //获取选择图片的input元素 
	//这边是判断本浏览器是否支持这个API。 
	if(typeof FileReader === 'undefined') {
		alert("浏览器版本过低，请先更新您的浏览器~");
		input.setAttribute('disabled', 'disabled');
	} else {
		input.addEventListener('change', readFile, false);

		//如果支持就监听改变事件，一旦改变了就运行readFile函数。 
	}

	function readFile() {
		var file = this.files[0]; //获取file对象 
		//判断file的类型是不是图片类型。 
		if(!/image\/\w+/.test(file.type)) {
			alert("请上传一张图片~");
			return false;
		}

		var reader = new FileReader(); //声明一个FileReader实例 
		reader.readAsDataURL(file); //调用readAsDataURL方法来读取选中的图像文件 
		//最后在onload事件中，获取到成功读取的文件内容，并以插入一个img节点的方式显示选中的图片 
		reader.onload = function(e) {
			// 创建一个新增的图片和文字input 
			$(".profile-img img").attr("src", this.result);
			uploadHead(this.result);
		}
	}
	//上传头像图片 
	function uploadHead(imgPath) {
		var image = new Image();
		image.src = imgPath;
		image.onload = function() {
			console.log('开始上传...');
			var imgData = getBase64Image(image);
			//						imgPath.replace("data:image/png;base64,", "");
			/*在这里调用上传接口*/
			$.ajax({
				url: config.rootUrl + "user/saveImageUrl.do",
				data: {
					headImage: imgData
				},
				async: true,
				type: 'post',
				success: function(data) {
					console.log(data);
					$.ajax({
						url: config.rootUrl + "user/uploadUserHead.do",
						data: {
							userId: session_login.info.userId,
							deviceToken: "html5",
							deviceType: "html5",
							userHead: data.absolutePath,
						},
						async: true,
						type: 'post',
						success: function(data) {
							alert(data.msg);
						},
						error: function(xhr, type, errorThrown) {
							alert('网络异常，请稍后再试！');
						}
					});
					console.log('上传成功');
				},
				error: function(xhr, type, errorThrown) {
					alert('网络异常，请稍后再试！');
				}
			});
		}
	}
	//将图片压缩转成base64 
	function getBase64Image(img) {
		var canvas = document.createElement("canvas");
		var width = img.width;
		var height = img.height;
		// 计算宽高
		if(width > height) {
			if(width > 800) {
				height = Math.round(height *= 800 / width);
				width = 800;
			}
		} else {
			if(height > 800) {
				width = Math.round(width *= 800 / height);
				height = 800;
			}
		}
		canvas.width = width; /*设置新的图片的宽度*/
		canvas.height = height; /*设置新的图片的长度*/
		var ctx = canvas.getContext("2d");
		ctx.drawImage(img, 0, 0, width, height); /*绘图*/
		var dataURL = canvas.toDataURL("image/png", 0.99);
		return dataURL.replace("data:image/png;base64,", "");
	}
});
//获取通知内容
$.ajax({
	url: config.rootUrl + "user/getSelfWallet.do",
	data: {
		userId: session_login.info.userId,
		deviceToken: "html5",
		deviceType: "html5",
	},
	async: true,
	type: 'post',
	success: function(data) {
		$("marquee").text(data.info.taskAward);
		sessionStorage.setItem("taskAward",data.info.taskAward);
	},
	error: function(xhr, type, errorThrown) {
		alert('网络异常，请稍后再试！');
	}
});
