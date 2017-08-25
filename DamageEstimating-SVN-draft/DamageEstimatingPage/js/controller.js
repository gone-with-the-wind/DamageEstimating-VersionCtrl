var app = angular.module('app',['MyService']);
    app.controller("ctrl",["$scope","$http","$window","urlService",function($scope,$http,$window,urlService){
         $window.urldata=urlService.getCommonUrl();
     }])
 $(function () {
    loginType =sessionStorage.getItem("loginType")
    var loginType=JSON.stringify(loginType)

    loginType=loginType.substring(1,loginType.length-1);


   $.ajax({
                type: 'POST',
                url: urldata+'person/getPerson',
                headers: {'accesskey':'acaaaa'},
                data: loginType,
                contentType: 'application/x-www-form-urlencoded',
                processData: false,
                
        
                
            success: function (data) {
               
            if (Number(data.code) === 0) {
               
        


//1.点击头像查看大图
    var imgp=$("#ImgPr");
    var imgshow=$("#imgshow");
    var bodychage={"position":"absolute","top":"0%","left":"0%","width":"100%","height":"100%","background-color":"black","z-index":"1001","-moz-opacity":"0.8","opacity":".80","filter":"alpha(opacity=80)"}
    var bodychage1={"background-color":"#f0f0f0","z-index":"1000","-moz-opacity":"0.8","opacity":".80","filter":"alpha(opacity=80)"}
    var  bodystart={"font-size": "14px","line-height": "1.42857143","color": "#333","background-color": "#f0f0f0","z-index":"1000","-moz-opacity":"1","opacity":"1","filter":"alpha(opacity=100)"}
    var imgpsrc=data.msg.headUrl;
    var   imgshowsrc=imgpsrc.substring(0,imgpsrc.indexOf("?"));
    console.log(imgpsrc)
    console.log(imgshowsrc)

    imgp.attr('src',imgpsrc);
    imgshow.attr('src',imgshowsrc);
    imgp.click(function () {
        imgshow.show();
        $("body").css(bodychage);
        $("#bodybod").css(bodychage1);
        $("#save").hide();
        $('body').click(function(e) {
            if(e.target.id != 'ImgPr' && e.target.id != 'imgshow')
                if ( $('#imgshow').is(':visible') ){
                    $('#imgshow').hide()
                    $("body").css(bodystart);
                    $("#bodybod").css(bodystart);
                    $("#save").show();

                }
        })
    });
    
        
        $("#up").on("change",function(){

            var file = $("#up").val();
            var fileName = getFileName(file);
            function getFileName(z){
                var pos=z.lastIndexOf("\\");
                return z.substring(pos+1);
            }
            //console.log(fileName);
 
            //2.获取图片二进制流
            
                     
            var pic = document.getElementById("up").files[0];//获取到图片的dome节点
            

            var img = new Image();
            img.src = URL.createObjectURL(pic);
            img.onload = function(){ 
            var canvas = document.createElement("canvas");
            var ctx = canvas.getContext("2d");
            // 图片宽度
            var picwidth = img.width;
            // 图片高度
            var picheght = img.height;
            canvas.width = picwidth;
            canvas.height = picheght;
            ctx.drawImage(img, 0, 0, picwidth, picheght);
            // 二进制流图片
            var dataURL = canvas.toDataURL('image/jpeg', 1);
           
            var byteString;  
            if (dataURL.split(',')[0].indexOf('base64') >= 0)  
               {
                byteString = atob(dataURL.split(',')[1]); 
                 
                 
            }

            else  
               { byteString = unescape(dataURL.split(',')[1]);  }

            var mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0];  
            var ia = new Uint8Array(byteString.length);  
            for (var i = 0; i < byteString.length; i++) {  
                ia[i] = byteString.charCodeAt(i);  
            }  


      
            var blob= new Blob([ia], {  
                type: mimeString  
            });  
        // console.log(blob)
      
            
       
            


            //将文件以二进制形式读入页面  
    


            
            
        //显示文件  
    
            //3.post到后台的头像图片交互
            var fd=new FormData();
            fd.append("file",blob);
            // console.log(dataURL)
            
            fd.append("fileName",fileName);
            fd.append("billType",4);
            fd.append("userID",1);

            $.ajax({
                type: 'POST',
                url: urldata+'file/upload',
                data:fd,
                contentType: false,
                processData: false,
                success: function (data) {
                        // console.log(data)
                    
                    if (data.code == 0) {
                        //console.log(data.msg);
                        // console.log(data.msg);
                        //console.log(data.headurl)
                        //var hurl=data.headurl.substring(0,data.headurl.lastIndexOf("?"))
                        
                        var hurl=data.headurl

                        // console.log(hurl)
                       $("#imgshow").attr('src',hurl);
                    }
                },
                error: function (data) {
                    console.log(data);
                }
            });
        }
    })

            }
        },
        error: function (data) {
            //console.log(data.msg);
        }

           });
        
   
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
    //console.log(users);

    $.ajax({
        type: 'POST',
        url: urldata+'person/edit',
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
            //console.log(data.msg);
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
        url:urldata+'person/pwd',
        headers: {'Content-Type':'application/x-www-form-urlencoded','accesskey':'1234'},
        data: "person_id="+1+'&pwd='+strtpwd+'&newPwd='+anewpass,
        contentType: 'application/x-www-form-urlencoded',
        processData: false,
        success:function(data){
            var d=eval("("+data+")");
            //console.log("获取权限成功"+d.msg);
        },
        error:function(data){
            //console.log(data.msg);
        }
    });
});
})
