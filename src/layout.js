/**
 * Created by hasee on 2017/3/27.
 */
$(document).ready(function () {
    window.localStorage.setItem("currentpwd", "1235789");
    var bheight = window.screen.availHeight;
    var bwidth = window.screen.availWidth;
    console.log(bheight)
    console.log(bwidth)
    // var width = bwidth *0.8;
    var height = bheight * 0.6;
    var space = bwidth*5/24;
    var roundRadii = bwidth *3/48;
    var pointRadii = bwidth /48;
    $(".screen").height(bheight);
    $(".container").height(bheight*0.895);
    $(".notify").height(bheight*0.1);
    $("#setpwd").height(bheight*0.195);
    $("#gesturepwd").GesturePasswd({
        backgroundColor: "#F0F0F0",  //背景色
        color: "#E0E0E0",   //主要的控件颜色
        fillColor: "#ffffff",   //主要的控件颜色
        roundRadii: roundRadii,    //大圆点的半径
        pointRadii: pointRadii, //大圆点被选中时显示的圆心的半径
        space: space,  //大圆点之间的间隙
        width: bwidth,   //整个组件的宽度
        height: height,  //整个组件的高度
        lineColor: "#FFFF37",   //用户划出线条的颜色
        zindex: 100  //整个组件的css z-index属性
    });
    //监听手势输入
    $("#gesturepwd").on("haspwd", function (e, passwd) {
        var result;
        if (passwd.length >= 5) {
            if ($(":radio:checked").val() == "reset") {
                //  alert("change successed!")
                var newpwd = window.localStorage.getItem("newpwd");
                console.log(newpwd);
                if (newpwd == null) {
                    $("#gesturepwd").trigger("passwdRight");
                    window.localStorage.setItem("newpwd", passwd);
                    var m = "<p class='text'>请再次输入新密码</p>";
                    $("#notify>p").remove();
                    $("#notify").append(m);
                } else {
                    if (newpwd == passwd) {
                        $("#gesturepwd").trigger("passwdRight");
                        var m = "<p class='text'>设置新密码成功</p>";
                        $("#notify>p").remove();
                        $("#notify").append(m);
                        window.localStorage.clear();
                        window.localStorage.setItem("currentpwd", newpwd);
                    } else {
                        $("#gesturepwd").trigger("passwdWrong");
                        var m = "<p class='text'>两次输入的密码不同，请重新输入</p>";
                        $("#notify>p").remove();
                        $("#notify").append(m);
                        window.localStorage.removeItem("newpwd");
                    }
                }
            } else {
//                alert("checkIn!")
                var cpwd = window.localStorage.getItem("currentpwd");
                if (passwd == cpwd) {
                    result = true;
                }
                else {
                    result = false;
                }


                if (result == true) {
                    $("#gesturepwd").trigger("passwdRight");
                    var m = "<p class='text'>密码正确</p>";
                    $("#notify>p").remove();
                    $("#notify").append(m);
                    setTimeout(function () {
                        alert("密码正确！")
                    }, 500);  //延迟半秒以照顾视觉效果
                }
                else {
                    $("#gesturepwd").trigger("passwdWrong");
                    var m = "<p class='text'>密码错误，请重新输入！</p>";
                    $("#notify>p").remove();
                    $("#notify").append(m);
                }
            }
        } else {
            if(window.localStorage.getItem("newpwd") !== null) {
                window.localStorage.removeItem("newpwd");
            }
            $("#gesturepwd").trigger("passwdWrong");
            var m = "<p class='text'>密码太短，请输入至少5个点</p>";
            $("#notify>p").remove();
            $("#notify").append(m);
        }
    });
    //监听切换修改密码/输入密码事件
    $(":radio").click(function () {
        if ($(this).val() == "reset") {
            var m = "<p class='text'>请输入新密码</p>";
            $("#notify>p").remove();
            $("#notify").append(m);
        } else {
            var m = "<p class='text'>" + "初始密码为'Z'字形" + "</p>";
            $("#notify>p").remove();
            $("#notify").append(m);
        }
    })
    // console.log(document.body.clientHeight)
// alert("checkIn!")
})
