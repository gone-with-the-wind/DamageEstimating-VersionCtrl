//1.点击头像查看大图
    var imgp=$("#ImgPr");
    var imgshow=$("#imgshow");
    var bodychage={"position":"absolute","top":"0%","left":"0%","width":"100%","height":"100%","background-color":"black","z-index":"1001","-moz-opacity":"0.8","opacity":".80","filter":"alpha(opacity=80)"}
    var bodychage1={"background-color":"#f0f0f0","z-index":"1000","-moz-opacity":"0.8","opacity":".80","filter":"alpha(opacity=80)"}
    var  bodystart={"font-size": "14px","line-height": "1.42857143","color": "#333","background-color": "#f0f0f0"}
    imgp.attr('src',"http://bxdf.oss-cn-hangzhou.aliyuncs.com/b115b09db5cf456ebf2b937f289ba406.jpg?x-oss-process=style/head80");
    imgp.click(function () {
        imgshow.show().attr('src',"http://bxdf.oss-cn-hangzhou.aliyuncs.com/b115b09db5cf456ebf2b937f289ba406.jpg");
        $("body").css(bodychage);
        $("#bodybod").css(bodychage1);
        $('body').click(function(e) {
            if(e.target.id != 'ImgPr' && e.target.id != 'imgshow')
                if ( $('#imgshow').is(':visible') ){
                    $('#imgshow').hide()
                    $("body").css(bodystart);

                }
        })
    });
    $("#up").click(function (){
        $("#up").on("change",function(){
            var file = $("#up").val();
            var fileName = getFileName(file);
            function getFileName(z){
                var pos=z.lastIndexOf("\\");
                return z.substring(pos+1);
            }
            console.log(fileName);

            //2.获取图片二进制流
            var canvas = document.createElement("canvas");
            var ctx = canvas.getContext("2d");
            var pic = document.getElementById("ImgPr");//获取到图片的dome节点
            var picwidth = pic.offsetWidth;//图片宽度
            var picheght = pic.offsetHeight;//图片高度
            canvas.width = picwidth;
            canvas.height = picheght;
            ctx.drawImage(pic, 0, 0, picwidth, picheght);
            var dataURL = canvas.toDataURL('image/jpeg', 1);//二进制流图片
            var fd=new FormData();
            //3.post到后台的头像图片交互
            fd.append("file",dataURL);
            fd.append("fileName",fileName);
            fd.append("billType",4);
            fd.append("userID",1);
            $.ajax({
                type: 'POST',
                url: 'http://116.62.174.175/DamageEstimating-1.0-SNAPSHOT/file/upload',
                data:fd,
                contentType: false,
                processData: false,
                success: function (data) {
                    if (data.code == 0) {
                        console.log(data.msg)
                    }
                },
                error: function (data) {
                    console.log(data.msg);
                }
            });
        })
    })
//4.上传本地图片和判断图片是否是jpg格式
    jQuery.fn.extend({
        uploadPreview: function (opts) {
            var _self = this, _this = $(this);
            opts = jQuery.extend({
                    Img: "ImgPr", Width: 100, Height: 100, ImgType: ["jpg"], Callback: function () { }
                }
                , opts || {});
            _self.getObjectURL = function (file) {
                var url = null;
                if (window.createObjectURL != undefined) {
                    url = window.createObjectURL(file)
                }
                else if (window.URL != undefined) {
                    url = window.URL.createObjectURL(file)
                }
                else if (window.webkitURL != undefined) {
                    url = window.webkitURL.createObjectURL(file)
                }
                return url
            };
            _this.change(function () {
                if (this.value) {
                    if (!RegExp("\.(" + opts.ImgType.join("|") + ")$", "i").test(this.value.toLowerCase())) {
                        alert("选择文件错误,图片类型必须是jpg");
                        this.value = "";
                        return false
                    }
                    if ($.browser.msie) {
                        try {
                            $("#" + opts.Img).attr('src', _self.getObjectURL(this.files[0]))
                        }
                        catch (e) {
                            var src = "";
                            var obj = $("#" + opts.Img);
                            var div = obj.parent("div")[0];
                            _self.select();
                            if (top != self) {
                                window.parent.document.body.focus()
                            }
                            else {
                                _self.blur()
                            }
                            src = document.selection.createRange().text;
                            document.selection.empty();
                            obj.hide();
                            obj.parent("div").css({
                                'filter': 'progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)', 'width': opts.Width + 'px', 'height': opts.Height + 'px'
                            });
                            div.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = src
                        }
                    }
                    else {
                        $("#" + opts.Img).attr('src', _self.getObjectURL(this.files[0]))
                    }
                    opts.Callback()
                }
            })
        }
    });
    $("#up").uploadPreview({ Img: "ImgPr", Width: 80, Height: 80, });

//5.修改个人资料
$(".mr10").click(function () {
    var address = $("#address").val();//地址
    var name = $("#name").val();//姓名
    var sex = $("#sex").val();//性别
    var phone = $("#phone").val();//电话
    var mail = $("#mail").val();//邮箱
    var wechat = $("#wechat").val();//微信
    var personId = $("#personId").val();//id
    var nickName = $("#nickName").val();//id
    var user = {
        "loginId": "admin",
        "personId": 1,
        "name": name,
        "sex": sex,
        "address": address,
        "phone": phone,
        "mail": mail,
        "wechat": wechat,
        "nickName": nickName,
        "lastEditUserId": personId
    };
    var users = JSON.stringify(user)
    console.log(users);

    $.ajax({
        type: 'POST',
        url: 'http://116.62.174.175/DamageEstimating-1.0-SNAPSHOT/person/edit',
        headers: {'accesskey': '1234'},
        data: users,
        contentType: 'application/json',
        processData: false,
        success: function (data) {
            if (data.code == 0) {
               alert("修改成功")
            }
        },
        error: function (data) {
            console.log(data.msg);
        }
    })
});
//修改密码
$("#submit").click(function () {
    var  oldpass=$("#oldpass").val();
    var  newpass=$("#newpass").val();
    var hidefa=$(".hidefa").innerHTML;
    var hideoldpsd=$(".hideoldpsd").innerHTML;
    var strtpwd=Base64.encode("123456");//初始加密
    var aoldpass=Base64.encode(oldpass);//旧密码加密
    var anewpass=Base64.encode(newpass);//新密码加密
    $.ajax({
        type: 'POST',
        url:'http://116.62.174.175/DamageEstimating-1.0-SNAPSHOT/person/pwd',
        headers: {'Content-Type':'application/x-www-form-urlencoded','accesskey':'1234'},
        data: "person_id="+1+'&pwd='+strtpwd+'&newPwd='+anewpass,
        contentType: 'application/x-www-form-urlencoded',
        processData: false,
        success:function(data){
            var d=eval("("+data+")");
            console.log("获取权限成功"+d.msg);
        },
        error:function(data){
            console.log(data.msg);
        }
    });
});