/**
 * Created by wungcq on 15/2/13.
 */

function UI_Animate(){
    var obj = this;
    this.closeAnimate = function(){
        document.getElementsByClassName('full-screen')[0].classList.add("moving-disappear-animate");
    };
    this.bind = function(){
        $('body').beforeunload(function(){
          obj.closeAnimate();
        });
    };
    return this;
}

window.cookieMethods = {};
(function(){
    //JS操作cookies方法
//写cookies
    cookieMethods.setCookie = function (name,value) {
        var Days = 7;
        var exp = new Date();
        exp.setTime(exp.getTime() + Days*24*60*60*1000);
        //document.cookie = name + "="+ escape(value) + ";expires=" + exp.toGMTString();
        document.cookie = name + "="+ value + ";expires=" + exp.toGMTString();
    };
//读取cookies
    cookieMethods.getCookie = function(name) {
        var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
        if(arr=document.cookie.match(reg)) {
            //return unescape(arr[2])
            return arr[2];
        }
        else return null;
    };
//删除cookies
    cookieMethods.delCookie = function(name) {
        var exp = new Date();
        exp.setTime(exp.getTime() - 1);
        var cval=getCookie(name);
        if(cval!=null) document.cookie= name + "="+cval+";expires="+exp.toGMTString();
    };
//使用示例
    //cookie_methods.set_cookie("name","hayden");
//alert(cookie_methods.get_cookie("name"));
})();