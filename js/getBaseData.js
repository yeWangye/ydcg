(function() {
    $.ajax({
        url: config.rootUrl + "user/getBaseData.do",
        data: {},
        async: true,
        type: 'post',
        success: function(data) {
            //添加选项盒子
            var diseasesBox = $("#dId");
            //添加选项内容
            var diseases = data.diseases;
            //疾病名称
            for(var i in diseases) {
                var _option = document.createElement("option");
                _option.value = diseases[i].dId;
                _option.text = diseases[i].dName;
                diseasesBox.append(_option);
            }
        },
        error: function(xhr, type, errorThrown) {
            alert('网络异常，请稍后再试！');
        },
    });
    $.ajax({
        url: config.rootUrl + "user/getTreatWay.do",
        data: {
            deviceToken: "html5",
            deviceType: "html5",
            userId: session_login.info.userId,
        },
        async: true,
        type: 'post',
        success: function(data) {
            //添加选项盒子
            var diseasesBox = $("#treatId");
            //添加选项内容
            var diseases = data.info;
            //疾病名称
            for(var i in diseases) {
                var _option = document.createElement("option");
                _option.value = diseases[i].treatId;
                _option.text = diseases[i].treatName;
                diseasesBox.append(_option);
            }
        },
        error: function(xhr, type, errorThrown) {
            alert('网络异常，请稍后再试！');
        },
    });
})()