$("#ticheng").on("focus",function(){
    var shifu = $("#shifu").val();
    var yingfu = $("#yingfu").val();

    if(shifu!=""&&yingfu!=""){
        $(this).val((shifu*0.02).toFixed(2));
        if($("#nianzhong").val()==""){
            $("#nianzhong").val((shifu*0.01).toFixed(2));
        }
    }
    setVal()
});

$("#nianzhong").on("focus",function(){
    var shifu = $("#shifu").val();
    var yingfu = $("#yingfu").val();
    if(shifu!=""&&yingfu!=""){
        $(this).val((shifu*0.01).toFixed(2));
        if($("#ticheng").val()==""){
            $("#ticheng").val((shifu*0.02).toFixed(2));
        }
    }
    setVal()
});
$("#ticheng").on("blur",function(){
    setVal()
});
$("#nianzhong").on("blur",function(){
    setVal()
});
$("#yizhu").on("blur",function(){
    setVal()
});
function setVal(){
    var shifu = $("#shifu").val();
    var yingfu = $("#yingfu").val();
    var yizhu = $("#yizhu").val();
    var ticheng = $("#ticheng").val();
    var nianzhong = $("#nianzhong").val();
    $("#monthAward").val(Number(yizhu)+Number(ticheng));
    $("#rewardMoney").val(Number(yizhu)+Number(ticheng)+Number(nianzhong));
}