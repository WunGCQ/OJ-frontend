/**
 * Created by wungcq on 15/2/13.
 */

//功能概述
//基本实现后端服务器的路由功能
//同时轻度集成转场动画，包括加载模板文件的淡入处理，以及页面跳转时的消失动画。
//扫描所有a标签，检查其中href元素是否为不是以#锚点开头&&不是以javascript:开头的字符串，进行正则处理，
//并且支持Restful的URL路径解析
//同时支持页面路径自检,方便分享
//使用historyAPI做AJAX无刷新跳转
//依赖一个全局的实例currentPagejRouter来实现对当前页面的控制和路由的注册;

//    需要在窗口初始化完之后，页面跳转之前实例化一个currentPagejRouter
//模板可以存放在model中。
//模板由统一的标签 <div class="jRouter-template" data-template-model="modelname" data-template-path="url"></div>
//

//路由需要用户自己写实现再由function添加到currentPagejRouter中去；

(function(url)
{

    //var document = window.document,navigator = window.navigator,location = window.location;

    var jRouter = function(url)
    {
        return new jRouter.fn.init(url);
    };

    window.localDomainName = window.location.href.split('://')[1].toString().split('/')[0];

    jRouter.fn = jRouter.prototype = {

        constructor:jRouter,
        init:function(url)
        {
            var _jRouter = this;
            this.url = url||window.location.href;

            this.domainName =  this.getdomainName();
            //this.localDomainName = window.location.href.split('://')[1].toString().split('/')[0];
            if(!this.isSupportsHistoryApi())
            {//错误提示及处理
                alert( '本站基于HTML5构建，检测到您在使用'+this.getBrowserInfo()[0]+'' +
                '浏览器，版本号'+this.getBrowserInfo()[1]+'过低，' +
                '请升级您的浏览器(IE请升级到10或11)');
            }
            return this;
        },
        root:'/index/',

        jRouter:"1.0",

        url:this.url,

        domainName:(function(){return this.getdomainName();}),
        //协议
        protocol:function()
        {
            return this.url.split('://')[0];
        },
        //获取域名
        getdomainName:function()
        {
            return RegExp('http?://').test(this.url) ? this.url.split('://')[1].toString().split('/')[0] : window.localDomainName;
        },
        //添加历史
        addHistory:function(url)
        {
            //console.log(this);
            //console.log('');
            var URL = url||this.url;
            history.pushState({url:this.url},'',URL);
        },

        //解析a标签，如果a标签href是路径的话则替换为jRouter的函数

        //跳转
        redirect : function(para_mode,isReplace)
        {
            var mode = para_mode||'current';
            if(mode=='current')
            {
                //判断是否为外部链接
                if(this.domainName==window.localDomainName)
                {//本地链接
                    if(isReplace!=true){
                        this.addHistory();
                    }
                    //alert(this.url);
                    var currentPageRouter = this.currentPagejRouter();
                    this.initWindow(currentPageRouter.initDomFunction);
                    //this.clearDisappearClass();
                }
                else
                {
                    location.href = jRouter.url;
                }
                //this.jumpAnimation(function()
                //{
                //    //判断是否为外部链接
                //    if(this.domainName==window.localDomainName)
                //    {//本地链接
                //        this.addHistory();
                //        var currentPageRouter = this.currentPagejRouter();
                //        this.initWindow(currentPageRouter.initDomFunction);
                //        //this.clearDisappearClass();
                //    }
                //    else
                //    {
                //        location.href = jRouter.url;
                //    }
                //
                //});
            }
            else
            {
                this.jumpAnimation(
                    function()
                    {
                        window.open(this.url);
                    });
            }
        },
        //跳转动画
        jumpAnimation : function(para_callback)
        {
            document.getElementsByClassName('full-screen')[0].classList.add('moving-disappear-animate');
            var callback = para_callback||function()
                {
                    return false;
                };
            var _jRouter = this;
            setTimeout(
                function()
                {
                    _jRouter.c = callback;
                    _jRouter.c(_jRouter.url);
                }

            , 500);
        },
        Controllers:{},
        ControllerList:[],
        Models:{},
        ModelTemplates:[],
        RouterRules:{}
    };



    //对HTML5的history API兼容性检查
    jRouter.fn.isSupportsHistoryApi = function()
    {
        return !!(window.history && history.pushState);
    };

    //检查浏览器版本
    jRouter.fn.getBrowserInfo = function()
    {
        var Sys = {};
        var ua = navigator.userAgent.toLowerCase();
        var s;
        (s = ua.match(/msie ([\d.]+)/)) ? Sys.ie = s[1] :
            (s = ua.match(/firefox\/([\d.]+)/)) ? Sys.firefox = s[1] :
                (s = ua.match(/chrome\/([\d.]+)/)) ? Sys.chrome = s[1] :
                    (s = ua.match(/opera.([\d.]+)/)) ? Sys.opera = s[1] :
                        (s = ua.match(/version\/([\d.]+).*safari/)) ? Sys.safari = s[1] : 0;

        if (Sys.ie) return ['IE', Sys.ie];
        if (Sys.firefox) return['Firefox', Sys.firefox];
        if (Sys.chrome) return['Chrome', Sys.chrome];
        if (Sys.opera) return['Opera', Sys.opera];
        if (Sys.safari) return['Safari', Sys.safari];
        else return['IE', 11];
    };
    //初始化页面结构的外部函数的存储
    jRouter.fn.initDomFunction = function(){};

    //初始化页面
    jRouter.fn.initWindow = function(setNavfun)
    {
        jRouter.fn.clearDisappearClass();
        if(typeof setNavfun=="function")
        {
            setNavfun();
        }

        jRouter.fn.addShowingClass();
    };

    //清除滑出动画类
    jRouter.fn.clearDisappearClass = function()
    {
        document.getElementsByClassName('full-screen')[0].className='full-screen';
    };

    //添加化入动画类
    jRouter.fn.addShowingClass = function()
    {
        document.getElementsByClassName('full-screen')[0].classList.add('moving-show-animate');
    };

    //设置初始化页面的函数
    jRouter.fn.setInitDomFunction = function(fun)
    {
        this.initDomFunction = fun;
    };

    //获得当前页面的路由
    jRouter.currentPagejRouter = jRouter.fn.currentPagejRouter = function()
    {
        return window.currentPagejRouter;
    };

    //设定controller
    jRouter.setRouter = jRouter.fn.setRouter = function(argObj)
    {
        var variableName = argObj.type+argObj.name+'Controller';
        jRouter.prototype.Controllers[variableName] = argObj.fun[0];
        jRouter.prototype.ControllerList.push(
            {
                url:argObj.url,
                controllerFunction:argObj.fun[0]
            }
        );
    };
    //选取controller
    jRouter.getControllerByUrl = jRouter.fn.getControllerByUrl = function(url)
    {
        if(url==null||url=='')
        {
            console.error('url地址不能为空');
            return false;
        }
        else{
            for( var i =0;i<jRouter.prototype.ControllerList.length;i++)
            {
                //var x = jRouter(url).getUrlParam().params[0];
                //console.log(x);
                //这种抓取方法仅适用于本站的路径规则，既所有路径都在根路径之后，并且
                // 路径中去除根路径后若仅有一层，则最后一层表示控制器，
                //否则表示参数
                //TODO
                //todo 以后扩展为在路由规则表中查找
                //为了本地调试用的
                var url = new RegExp('.html').test(url) ? url.split('.html')[0] : url;
                var urlPara = jRouter.getUrlParam(url).params;
                var controllerUrl = '';
                if(urlPara.length>1){
                    controllerUrl = urlPara[urlPara.length-2];//最后一项为参数项，获取前一项即为控制器的名称
                }
                else if(urlPara.length == 1){
                    controllerUrl = urlPara[urlPara.length-1];
                }
                else{
                    controllerUrl = 'index';
                }
                if(jRouter.prototype.ControllerList[i].url== ('/'+controllerUrl+'/') )
                {
                    return [jRouter.prototype.ControllerList[i].controllerFunction,i];
                }
            }
        }
        return false;
    };
    //将URL切片去掉.html后缀后返回参数
    jRouter.getUrlParam =  jRouter.fn.getUrlParam = function(path)
    {
        var res = new Object();
        var protocolTester = new RegExp('http?:');
        var path = path || window.location.href;

        res.protocol = protocolTester.test(path)?protocolTester.exec(path)[0]:'';

        res.domainName = protocolTester.test(path) ? path.split('://')[1].toString().split('/')[0] : window.localDomainName;
        var params = path.split('.html')[0].split('/');
        res.params = [];
        for(var i=0; i< params.length; i++)
        {
            //删除参数
            if(params[i]!=(res.protocol) && params[i]!=res.domainName && params[i]!='' )
            {
                res.params.push(params[i]);
            }
        }
        return res;
    };

    jRouter.initPage =jRouter.prototype.initPage = function(isReplace){
        var params = this.getUrlParam().params;
        var childUrl;
        if(params.length==0){
            childUrl = jRouter.prototype.root;
        }
        else{
            childUrl = '/'+params[0]+'/';
        }
        var fun = jRouter.getControllerByUrl(childUrl)[0];
        if(typeof fun =='function')
        {
            //todo 添加路径参数
            //console.log(this.url);
            if(isReplace=='replace'){
                fun(true);
            }
            else{
                fun();
            }
        }



    };

    jRouter.resumeState = function(){

    };
    //试验用，此功能已解耦，转移到Model类
    jRouter.loadTemplate = jRouter.fn.loadTemplate = function()
    {
        var path = 'user.html';
        ajax.send(
            {
                url: path,
                data: null,
                type: "GET",
                dataType: "html",
                success: function(Template)
                {
                    jRouter.prototype.ModelTemplates.push(Template);
                }
            }
        );
    };
    //试验用，此功能已解耦，转移到Model类
    jRouter.loadModelData = jRouter.fn.loadModelData = function()
    {
        var path = '../JSON/get_user.json';
        ajax.send(
            {
                url: path,
                data: null,
                type: "GET",
                dataType: "json",
                success: function(data)
                {
                    if(data.status==1)
                    {
                        $('#banner').html( nanoRenderer(jRouter.prototype.ModelTemplates[0],data));
                    }
                }
            }
        );
    };

    //载入model
    jRouter.Model = jRouter.prototype.Model = function(name,fun)
    {
        eval('jRouter.prototype.Models.'+name+' = '+fun.toString()+';');
    };

    jRouter.Models = jRouter.prototype.Models;

    //解析a标签，支持多种参数传递，包括无参、节点数组、节点
    jRouter.parseAnchor = function(Anchor)
    {
        //这个函数可以接收一个参数Anchor来解析指定的a标签

        if(Anchor == null || typeof Anchor == "undefined")
        {
            var Anchors = document.getElementsByTagName('a');//遍历DOM找到所有a标签
        }
        else if(Anchor instanceof Array)
        {   //如果是节点数组的话
            var Anchors = Anchor;
        }
        else{
            //如果是节点的话,包装成节点的数组
            var Anchors = [Anchor];
        }
        //然后开心地调用咯
        var temp;
        for(var i = 0; i<Anchors.length; i++)
        {
            //找到a标签的链接地址
            temp = Anchors[i].getAttribute("href");
            if(temp!=null && temp.length>0)
            {
                if(temp[0]!='#' && temp.indexOf('javascript:')==-1 && Anchors[i].getAttribute('target')!='_blank')//
                {
                    var target = Anchors[i].getAttribute('target')=='_blank' ? 'new' : 'current';
                    var fun = jRouter.fn.getControllerByUrl(temp);
                    if(fun)
                    {
                        //console.log(temp);
                        var functionLocation = fun[1];
                        Anchors[i].setAttribute('data-controller',functionLocation);//在标签中记录
                        Anchors[i].setAttribute('data-href',temp);
                        Anchors[i].removeAttribute('href');
                        Anchors[i].addEventListener('click',function(){
                            var functionLocation = parseInt(this.getAttribute('data-controller'));
                            var url = this.getAttribute('data-href');//href暂存
                            var fun = jRouter.prototype.ControllerList[functionLocation].controllerFunction;
                            fun(false,url);
                        });


                    }
                    else
                    {
                        var str = "javascript:"+"jRouter('"+temp+"').redirect('"+target+"')";
                        Anchors[i].setAttribute("href",str);
                    }

                }
            }
        }
    };
    jRouter.parseTemplateElment = function(templatename)
    {
        //若templatename为空的话就扫描文档中所有的template
        if(templatename==null)
        {
            var templateElements = document.getElementsByClassName('jRouter-template');
        }
        else
        {
            var templateElements = document.querySelectorAll('div [data-template-model="'+templatename+'"]');
        }
        if(templateElements.length>0)
        {
            for(var i= 0; i< templateElements.length; i++)
            {
                //var template
            }
        }
    };
    //TODO
    //设定路由状态
    //这些状态包含:title,paraList,action;
    //唯一标识为path
    jRouter.setRouterStates = function(arg){
        jRouter.prototype.RouterRules = arg;
    };
    //TODO
    //查找路由规则,利用正则字符串匹配
    jRouter.queryRouterRules = function(url){

    };



    //原型
    jRouter.fn.init.prototype = jRouter.fn;
    //实例化一个
    window.jRouter = jRouter;



})(window.location.href);

/* Nano Templates - https://github.com/trix/nano */
function nanoRenderer(template, data)
{
    return template.replace(/\{([\w\.]*)\}/g,
        function(str, key)
        {
            var keys = key.split("."), v = data[keys.shift()];
            for (var i = 0, l = keys.length; i < l; i++) v = v[keys[i]];
            return (typeof v !== "undefined" && v !== null) ? v : "";
        }
    );
}
