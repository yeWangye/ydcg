function getSocialCate() {
	$.ajax({
		url: config.rootUrl + "user/getSocialCate.do",
		data: {
			deviceToken: "html5",
			deviceType: "html5",
			userId: session_login.info.userId,
		},
		async: true,
		type: 'post',
		success: function(data) {
			console.log(data)
			//添加选项盒子
			var xinxi_laiyuan = $("#xinxi_laiyuan");
			//添加选项内容
			var info = data.info;
			//收款账户
			for(var i in info) {
				var _option = document.createElement("option");
				_option.value = info[i].sId;
				_option.text = info[i].sName;
				xinxi_laiyuan.append(_option);
			}

		},
		error: function(xhr, type, errorThrown) {
			alert('网络异常，请稍后再试！');
		},
		complete: function() {
			$('#xinxi_laiyuan').select2();
		}
	});
}
//图片获取上传开始
$(".f1").on("click", function(e) {
	e.preventDefault();
	$("input:file[name=f1]").trigger("click");
})
$(".f2").on("click", function(e) {
	e.preventDefault();
	$("input:file[name=f2]").trigger("click");
})
$(".f3").on("click", function(e) {
	e.preventDefault();
	$("input:file[name=f3]").trigger("click");
})
var input1 = $("input:file[name=f1]")[0]; //获取选择图片的input元素 
//这边是判断本浏览器是否支持这个API。 
if(typeof FileReader === 'undefined') {
	alert("浏览器版本过低，请先更新您的浏览器~");
	input1.setAttribute('disabled', 'disabled');
} else {
	input1.addEventListener('change', readFile1, false);
	//如果支持就监听改变事件，一旦改变了就运行readFile函数。 
}
var input2 = $("input:file[name=f2]")[0]; //获取选择图片的input元素 
//这边是判断本浏览器是否支持这个API。 
if(typeof FileReader === 'undefined') {
	alert("浏览器版本过低，请先更新您的浏览器~");
	input2.setAttribute('disabled', 'disabled');
} else {
	input2.addEventListener('change', readFile2, false);
	//如果支持就监听改变事件，一旦改变了就运行readFile函数。 
}
var input3 = $("input:file[name=f3]")[0]; //获取选择图片的input元素 
//这边是判断本浏览器是否支持这个API。 
if(typeof FileReader === 'undefined') {
	alert("浏览器版本过低，请先更新您的浏览器~");
	input3.setAttribute('disabled', 'disabled');
} else {
	input3.addEventListener('change', readFile3, false);
	//如果支持就监听改变事件，一旦改变了就运行readFile函数。 
}

function readFile1() {
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
		$(".f1").attr("src", this.result);
		$(".f1").attr("data-src", this.result);
	}
}

function readFile2() {
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
		$(".f2").attr("src", this.result);
		$(".f2").attr("data-src", this.result);

	}
}

function readFile3() {
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
		$(".f3").attr("src", this.result);
		$(".f3").attr("data-src", this.result);

	}
}
//图片上传结束...