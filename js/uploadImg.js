function readFile() {
	$("body").mLoading("show");//显示loading组件
	
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
		$("body").mLoading("hide");//显示loading组件		
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
						alert('上传成功,请退出登录查看');
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
		if(width > 2024) {
			height = Math.round(height *= 2024 / width);
			width = 2024;
		}
	} else {
		if(height > 2024) {
			width = Math.round(width *= 2024 / height);
			height = 2024;
		}
	}
	canvas.width = width; /*设置新的图片的宽度*/
	canvas.height = height; /*设置新的图片的长度*/
	var ctx = canvas.getContext("2d");
	ctx.drawImage(img, 0, 0, width, height); /*绘图*/
	var dataURL = canvas.toDataURL("image/png", 0.99);
	return dataURL.replace("data:image/png;base64,", "");
}