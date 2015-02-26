function get_style(elem,attr) {
    if(elem.style[attr]){
        //若样式存在于html中,优先获取
        return elem.style[attr];
    }
    else if(document.defaultView && document.defaultView.getComputedStyle){
        //W3C标准方法获取CSS属性最终样式(同于CSS优先级)
        //注意,此法属性原格式(text-align)获取的,故要转换一下
        attr=attr.replace(/([A-Z])/g,'-$1').toLowerCase();
        //获取样式对象并获取属性值
        return document.defaultView.getComputedStyle(elem,null).getPropertyValue(attr);
    }
    else if(elem.currentStyle){
        //IE下获取CSS属性最终样式(同于CSS优先级)
        return elem.currentStyle[attr];
    }
    else{
        return null;
    }
}
function set_style(elem,css) {
    if(elem!=null || typeof(elem)!=undefined){
        elem.style.cssText = css;
        return true;
    }
    else{
        return false;
    }

}
//扩展 css
if(Node){
    Node.prototype._css = function(attr,value){
        if(value!=null && typeof value!="undefined" ){
            if(typeof value!="")
                this.style[attr]=value;

            return this;//返回本对象，方便链式调用~
        }
        else{
            if(this.style[attr]){
                //若样式存在于html中,优先获取
                return this.style[attr];
            }
            else if(document.defaultView && document.defaultView.getComputedStyle){
                //W3C标准方法获取CSS属性最终样式(同于CSS优先级)
                //注意,此法属性原格式(text-align)获取的,故要转换一下
                attr=attr.replace(/([A-Z])/g,'-$1').toLowerCase();
                //获取样式对象并获取属性值
                return document.defaultView.getComputedStyle(this,null).getPropertyValue(attr);
            }
            else if(this.currentStyle){
                //IE下获取CSS属性最终样式(同于CSS优先级)
                return this.currentStyle[attr];
            }
            else{
                return null;
            }
        }

    };
}



function load_picture(src){
    var pic = new Image();
    //pic.src = "http://b.zol-img.com.cn/desk/bizhi/image/6/2560x1600/1423190828665.jpg";
    document.body.appendChild(pic);

    //pic.
    //pic.style["border"] = "2px solid #000";
    //var x = document.createElement('div');
    //x.innerHTML = "width "+ pic.width + " height "+pic.height;
    console.log("width "+ pic.width + " height "+pic.height);
    setTimeout(function(){
            console.log("width "+ pic.width + " height "+pic.height);
        },200);

    //document.body.appendChild(x);
}

//获取浏览器信息
function get_browser() {
    var Sys = {};
    var ua = navigator.userAgent.toLowerCase();
    var s;
    (s = ua.match(/msie ([\d.]+)/)) ? Sys.ie = s[1] :
        (s = ua.match(/firefox\/([\d.]+)/)) ? Sys.firefox = s[1] :
            (s = ua.match(/chrome\/([\d.]+)/)) ? Sys.chrome = s[1] :
                (s = ua.match(/opera.([\d.]+)/)) ? Sys.opera = s[1] :
                    (s = ua.match(/version\/([\d.]+).*safari/)) ? Sys.safari = s[1] : 0;

    //以下进行测试
    if (Sys.ie) return ('IE: ' + Sys.ie);
    if (Sys.firefox) return('Firefox: ' + Sys.firefox);
    if (Sys.chrome) return('Chrome: ' + Sys.chrome);
    if (Sys.opera) return('Opera: ' + Sys.opera);
    if (Sys.safari) return('Safari: ' + Sys.safari);
    else return('IE: 11');
}

function loadScriptOrStyleSheet(filename,filetype)
{
    if(filetype == "js")
    {
        var fileref = document.createElement('script');
        fileref.setAttribute("type","text/javascript");
        fileref.setAttribute("src",filename);

    }
    else if(filetype == "css")
    {
        var fileref = document.createElement('link');
        fileref.setAttribute("rel","stylesheet");
        fileref.setAttribute("type","text/css");
        fileref.setAttribute("href",filename);
    }
    if(typeof fileref != "undefined")
    {
        document.getElementsByTagName("head")[0].appendChild(fileref);
    }
}

