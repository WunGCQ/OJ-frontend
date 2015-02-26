window.UserModel = function(UserData)
{
    if(typeof this.UserData == "undefined" && typeof UserData != "undefined")
    {
        this.UserData = UserData;
        this.init(UserData);

    }
    //避免重复加载原型模板
    if(this.template==null || typeof this.template == "undefined"){
        this.loadTemplate();
    }

    return this;
};

//User 继承自数据模型类
UserModel.prototype = new Model();

//需要设置每个数据模型的增删改查路径和参数
(
    function()
    {
        UserModel.prototype.templatePath = 'http://wungcq.github.io/public/templates/user.html';
        UserModel.prototype.AddPath      = 'http://wungcq.github.io/public/JSON/register.json';
        UserModel.prototype.RetrievePath = 'http://wungcq.github.io/public/JSON/get_user.json';
        UserModel.prototype.UpdatePath   = 'http://wungcq.github.io/public/JSON/update_user.json';
        UserModel.prototype.LoginPath    = 'http://wungcq.github.io/public/JSON/login.json';
        UserModel.prototype.LogoutPath   = 'http://wungcq.github.io/public/JSON/logout.json';
        UserModel.prototype.Retrievemethod = 'GET';
    }
)();

UserModel.prototype.init = function(UserData){
    var UserData = UserData||this.UserData;
    if(typeof UserData != "undefined"){
        this.username   = UserData.username;
        this.nickname   = UserData.nickname;
        this.student_id = UserData.student_id;
        this.school     = UserData.school;
        this.college    = UserData.college;
        this.email      = UserData.email;
        this.head       = UserData.head;
    }
    this.isUserInfoShown = false;
};
//检查登陆等一系列行为
//已登录的补全信息，包括用户名补全等，未登录的不处理
UserModel.prototype.checkIsLogin = function(){
    var isLogin = cookieMethods.getCookie('isLogin');
    if(isLogin == 'true')
    {
        var username = cookieMethods.getCookie('username');
        //是否已经有了当前的用户实例
        if(typeof window.currentUser == "undefined")
        {
            window.currentUser = new UserModel();
            window.currentUser.RETRIEVE();
            window.currentUser.setUserBarLog(username);
        }
        else
        {
            //什么也不做~
        }
        //给用护栏加上用户名
        //UserModel.prototype.setUserBarLog(username);

    }
    else {
        //默认就是未登录，什么也不用做
        var username = cookieMethods.getCookie('username');
        //为登陆表单填充用户名
        LoginControllerEntity.getInput('username').value = username;
    }
};

UserModel.prototype.writeCookie = function(name){
    var username = name||this.username;
    cookieMethods.setCookie('isLogin','true');
    cookieMethods.setCookie('username',name);
};


//激活用户菜单栏
UserModel.prototype.setUserBarLog = function(username)
{
    var userBar = document.getElementById('user-bar');
    userBar.classList.remove('unlog');
    userBar.classList.add('log');
    //顺便塞上用户名
    document.getElementById('user-nav').getElementsByClassName('user-name')[0].innerHTML = username;
};



//禁用用户菜单栏
UserModel.prototype.setUserBarUnLog = function()
{
    var userBar = document.getElementById('user-bar');
    userBar.classList.remove('log');
    userBar.classList.add('unlog');
};


//登出
UserModel.prototype.logout = function()
{
    var isLogin = cookieMethods.getCookie('isLogin');
    if(isLogin=='true')
    {
        if( typeof arg == 'undefined'){
            var data = null;
        }
        //向服务器发送注销的消息
        ajax.send(
            {
                url: UserModel.prototype.LogoutPath,
                data: data,
                type: 'GET',
                dataType: "json",
                success: function(Data)
                {
                    //返回数据，而且注销成功
                    if(Data.status==1)
                    {
                        UserModel.prototype.setUserBarUnLog();
                        //设为false
                        cookieMethods.delCookie('isLogin');
                        cookieMethods.setCookie('isLogin','false');
                        topMessage({
                            Message:'注销成功',
                            Type:'success'
                        });

                    }
                    //没有注销成功，但服务器返回错误
                    else
                    {
                        topMessage({
                            Message:Data.error,
                            Type:'fail'
                        });
                    }
                },
                //压根没连上
                fail:function(){
                    topMessage({
                        Message:'服务器连接异常，请检查网络或稍后重试',
                        Type:'fail'
                    });
                }
            }
        );
        UserModel.prototype.setUserBarLog(username);
    }
    else {
        //提示下
        topMessage({
            Message:'少侠您还没登陆QAQ',
            Type:'normal'
        });
    }
};



//查找一个用户(获取用户信息)
UserModel.prototype.RETRIEVE = function(arg)
{
    if( typeof arg == 'undefined'){
        var data = null;
    }else{
        var data = arg;
    }

    //数据为空表示着向服务器session查找当前用户，用于已经登陆的用户打开新页面的时候的操作
    ajax.send(
        {
            url: UserModel.prototype.RetrievePath,
            data: data,
            type: UserModel.prototype.Retrievemethod,
            dataType: "json",
            success: function(Data)
            {
                if(Data.status==1)
                {
                    window.currentUser = new UserModel(Data.user);
                    window.currentUser.writeCookie(Data.user.username);
                    //TODO 后续工作包括了渲染用户设置的模板，用户下拉菜单等
                }
                else
                {
                    topMessage({
                        Message:Data.error,
                        Type:'fail'
                    });
                }
            },
            fail:function(){
                topMessage({
                    Message:'服务器连接异常，请检查网络或稍后重试',
                    Type:'fail'
                });
            }
        }
    );
};

//资料面板
UserModel.prototype.showCurrentUserInfo = function()
{
    //如果还没加载过这个模块
    if(!this.isUserInfoShown){
        //由于UserModel的构造函数决定了一定已经有模板了
        var text = juicer(this.getTemplateText(),{user:this.UserData});
        //document.getElementById('user-info-section').innerHTML = text;
        $('#user-info-section').html(text);
        this.isUserInfoShown = true;
    }
    //如果已经加载过这个模块
    else{
        //就不用做这些破事儿了
    }
    document.getElementById('user-info-section').style["display"] = "block";
    return;
};