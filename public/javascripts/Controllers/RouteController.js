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
    jRouter().setRouter(
        {
            name:'index',
            type:'get',
            url:'/index/',
            fun:[
                function(isReplace,path){
                    jump(isReplace,'/index/');
                    if(document.getElementsByClassName('active-modal').length>0){
                        document.getElementsByClassName('active-modal')[0].classList.remove('active-modal');
                    }
                    //显示主体页
                    document.getElementsByClassName('full-screen')[0]._css('visibility','visible')._css('display','block');
                    setActiveLink();
                    $('#banner').html('主页');

                }
            ]
        }
    );
    jRouter().setRouter(
        {
            name:'problem',
            type:'get',
            url:'/problem/',
            fun:[
                function(isReplace,path){
                    jump(isReplace,'/problem/');
                    if(document.getElementsByClassName('active-modal').length>0){
                        document.getElementsByClassName('active-modal')[0].classList.remove('active-modal');
                    }
                    //显示主体页
                    document.getElementsByClassName('full-screen')[0]._css('visibility','visible')._css('display','block');
                    setActiveLink();
                    var problemParams = currentPagejRouter.getUrlParam().params;
                    $('#banner').html('题目 '+problemParams[1]);
                    //setActiveLink();

                }
            ]
        }

    );
    jRouter().setRouter(
        {
            name:'contest',
            type:'get',
            url:'/contest/',
            fun:[
                function(isReplace,path){
                    jump(isReplace,'/contest/');
                    if(document.getElementsByClassName('active-modal').length>0){
                        document.getElementsByClassName('active-modal')[0].classList.remove('active-modal');
                    }
                    //显示主体页
                    document.getElementsByClassName('full-screen')[0]._css('visibility','visible')._css('display','block');
                    $('#banner').html('比赛');
                    setActiveLink();
                    //setActiveLink();

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
                    jump(isReplace,'/message/');
                    if(document.getElementsByClassName('active-modal').length>0){
                        document.getElementsByClassName('active-modal')[0].classList.remove('active-modal');
                    }
                    //显示主体页
                    document.getElementsByClassName('full-screen')[0]._css('visibility','visible')._css('display','block');
                    $('#banner').html('消息');
                    setActiveLink();
                    //setActiveLink();
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
                    jump(isReplace,'/group/');
                    if(document.getElementsByClassName('active-modal').length>0){
                        document.getElementsByClassName('active-modal')[0].classList.remove('active-modal');
                    }
                    //显示主体页
                    document.getElementsByClassName('full-screen')[0]._css('visibility','visible')._css('display','block');
                    $('#banner').html('小组');
                    setActiveLink();
                    //setActiveLink();
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

                    jump(isReplace,'/register/');
                    //隐藏主体页
                    document.getElementsByClassName('full-screen')[0]._css('visibility','hidden')._css('display','none');
                    //隐藏正在显示的页
                    if(document.getElementsByClassName('active-modal').length>0){
                        document.getElementsByClassName('active-modal')[0].classList.remove('active-modal');
                    }
                    jRouter.parseAnchor();

                    document.getElementById('register-window').classList.add('active-modal');
                }
            ]
        }

    );
    jRouter().setRouter(
        {
            name:'login',
            type:'get',
            url:'/login/',
            fun:[
                function(isReplace,path){
                    jump(isReplace,'/login/');
                    //隐藏主体页
                    document.getElementsByClassName('full-screen')[0]._css('visibility','hidden')._css('display','none');
                    //隐藏正在显示的页
                    if(document.getElementsByClassName('active-modal').length>0){
                        document.getElementsByClassName('active-modal')[0].classList.remove('active-modal');
                    }
                    jRouter.parseAnchor();
                    document.getElementById('login-window').classList.add('active-modal');
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