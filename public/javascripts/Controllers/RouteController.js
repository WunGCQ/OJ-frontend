/**
 * Created by wungcq on 15/2/18.
 */
function setRouteController(){
    window.jump = function(isReplace,path) {
        if(isReplace==true){
            jRouter(path).redirect('current',true);
        }else{
            jRouter(path).redirect('current');
        }

    };
    window.hideMainSections = function()
    {
        var mainSections = document.getElementById('main-section').children;//强制其他版块消失
        for(var i = 0; i < mainSections.length; i++)
        {
            mainSections[i]._css('display','none');
        }
    };
    //主页
    jRouter().setRouter(
        {
            name:'index',
            type:'get',
            url:'/index/',
            fun:[
                function(isReplace,path){
                    jump(isReplace,path);
                    if(document.getElementsByClassName('active-modal').length>0){
                        document.getElementsByClassName('active-modal')[0].classList.remove('active-modal');
                    }
                    //显示主体页
                    document.getElementsByClassName('full-screen')[0]._css('visibility','visible')._css('display','block');
                    setActiveLink();
                    $('.main-blocks').css({"display":"block"});

                }
            ]
        }
    );

    //题目
    jRouter().setRouter(
        {
            name:'problem',
            type:'get',
            url:'/problem/',
            fun:[
                function(isReplace,path){
                    jump(isReplace,path);
                    if(document.getElementsByClassName('active-modal').length>0){
                        document.getElementsByClassName('active-modal')[0].classList.remove('active-modal');
                    }
                    //显示主体页
                    document.getElementsByClassName('full-screen')[0]._css('visibility','visible')._css('display','block');
                    setActiveLink();
                    var problemParam = jRouter.getUrlParam(path).params[1];
                    //TODO 补全参数解析部分
                    //setActiveLink();
                    document.getElementById('problem-section').innerHTML ='题目 '+problemParam;
                    hideMainSections();
                    document.getElementById('problem-section')._css("display","block");
                }
            ]
        }

    );
    //比赛
    jRouter().setRouter(
        {
            name:'contest',
            type:'get',
            url:'/contest/',
            fun:[
                function(isReplace,path){
                    jump(isReplace,path);
                    if(document.getElementsByClassName('active-modal').length>0){
                        document.getElementsByClassName('active-modal')[0].classList.remove('active-modal');
                    }
                    //显示主体页
                    document.getElementsByClassName('full-screen')[0]._css('visibility','visible')._css('display','block');
                    setActiveLink();
                    //setActiveLink();
                    //TODO 补全参数解析部分
                    hideMainSections();
                    document.getElementById('contest-section')._css("display","block");

                }
            ]
        }

    );
    jRouter().setRouter(
        {
            name:'message',
            type:'get',
            url:'/message/',
            fun:[
                function(isReplace,path){
                    jump(isReplace,path);
                    if(document.getElementsByClassName('active-modal').length>0){
                        document.getElementsByClassName('active-modal')[0].classList.remove('active-modal');
                    }
                    //显示主体页
                    document.getElementsByClassName('full-screen')[0]._css('visibility','visible')._css('display','block');
                    setActiveLink();
                    //setActiveLink();
                    hideMainSections();
                    document.getElementById('message-section')._css("display","block");
                }
            ]
        }

    );
    jRouter().setRouter(
        {
            name:'group',
            type:'get',
            url:'/group/',
            fun:[
                function(isReplace,path){
                    jump(isReplace,path);
                    if(document.getElementsByClassName('active-modal').length>0){
                        document.getElementsByClassName('active-modal')[0].classList.remove('active-modal');
                    }
                    //显示主体页
                    document.getElementsByClassName('full-screen')[0]._css('visibility','visible')._css('display','block');
                    setActiveLink();
                    //setActiveLink();
                    hideMainSections();
                    document.getElementById('group-section')._css("display","block");
                }
            ]
        }

    );
    jRouter().setRouter(
        {
            name:'register',
            type:'get',
            url:'/register/',
            fun:[
                function(isReplace,path){

                    jump(isReplace,path);
                    //隐藏主体页
                    document.getElementsByClassName('full-screen')[0]._css('visibility','hidden')._css('display','none');
                    //隐藏正在显示的页
                    if(document.getElementsByClassName('active-modal').length>0){
                        document.getElementsByClassName('active-modal')[0].classList.remove('active-modal');
                    }
                    jRouter.parseAnchor();

                    document.getElementById('register-window').classList.add('active-modal');
                    //启动注册控制器，若没有的话则生成实例。
                    if(typeof window.RegisterControllerEntity == 'undefined'){
                        window.RegisterControllerEntity = new registerController();
                    }
                }
            ]
        }

    );
    //登陆
    jRouter().setRouter(
        {
            name:'login',
            type:'get',
            url:'/login/',
            fun:[
                function(isReplace,path){
                    jump(isReplace,path);
                    //隐藏主体页
                    document.getElementsByClassName('full-screen')[0]._css('visibility','hidden')._css('display','none');
                    //隐藏正在显示的页
                    if(document.getElementsByClassName('active-modal').length>0){
                        document.getElementsByClassName('active-modal')[0].classList.remove('active-modal');
                    }
                    jRouter.parseAnchor();
                    document.getElementById('login-window').classList.add('active-modal');
                    //启动登陆控制器，若没有的话则生成实例。
                    if(typeof window.LoginControllerEntity == 'undefined'){
                        window.LoginControllerEntity = new loginController();
                    }
                    //将cookie中存储的用户名写入input中
                    window.LoginControllerEntity.getInput('username').value = cookieMethods.getCookie('username')
                }
            ]
        }

    );
    //忘记密码
    jRouter().setRouter(
        {
            name:'forgetPassword',
            type:'get',
            url:'/forgetPassword/',
            fun:[
                function(isReplace,path){
                    jump(isReplace,path);
                    //隐藏主体页
                    document.getElementsByClassName('full-screen')[0]._css('visibility','hidden')._css('display','none');
                    //隐藏正在显示的页
                    if(document.getElementsByClassName('active-modal').length>0){
                        document.getElementsByClassName('active-modal')[0].classList.remove('active-modal');
                    }
                    jRouter.parseAnchor();
                    document.getElementById('forget-password-window').classList.add('active-modal');
                }
            ]
        }

    );
    //登出
    jRouter().setRouter(
        {
            name:'log',
            type:'get',
            url:'/logout/',
            fun:[
                function(isReplace,path){
                    window.currentUser.logout();
                }
            ]
        }

    );
    //忘记密码
    jRouter().setRouter(
        {
            name:'user',
            type:'get',
            url:'/user/',
            fun:[
                function(isReplace,path){

                    if(document.getElementsByClassName('active-modal').length>0){
                        document.getElementsByClassName('active-modal')[0].classList.remove('active-modal');
                    }
                    //显示主体页
                    document.getElementsByClassName('full-screen')[0]._css('visibility','visible')._css('display','block');
                    setActiveLink();
                    //
                    var userParam = jRouter.getUrlParam(path).params;
                    if(userParam.length == 1){//参数长度只有1
                        //说明是默认  本用户
                        hideMainSections();
                        window.currentUser.showCurrentUserInfo();
                        UserInfoController.bind();
                    }
                    else{
                        //说明是某个具体用户的
                        //TODO 补全用户名解析部分
                    }
                    jump(isReplace,path);
                    //$('#main-section').html('题目 '+problemParam);
                    //setActiveLink();
                }
            ]
        }

    );

}



window.setActiveLink = function()
{
    var href = window.location.href;
    var navLinkArray = ['index','problem','contest','message','group'];
    var titleArray = ['主页','题目','比赛','消息','小组'];
    $('#nav a').removeClass('active-link');
    for(var i =0; i<navLinkArray.length; i++)
    {
        if(href.split('.html')[0].split('/').indexOf(navLinkArray[i])!=-1)
        {
            document.getElementById('nav').getElementsByTagName('a')[i].classList.add('active-link');
            document.title = 'OJ4th:'+titleArray[i];
            return;
        }
    }
};


jRouter.setRouterStates({
    '/index/':{
        title:'OJ4th:主页',
        paraList:['index'],
        action:function(){setActiveLink();}
    },
    '/problem/':{
        title:'题目:',
        paraList:['problem','number'],
        action:function(){setActiveLink();}
    },
    '//':{
        title:'OJ4th:主页',
        paraList:['para'],
        action:function(){}
    },
    '/index/':{
        title:'OJ4th:主页',
        paraList:['para'],
        action:function(){}
    }

});

