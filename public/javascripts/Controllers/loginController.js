/**
 * Created by wungcq on 15/2/20.
 */
var loginController = function(){
    var LoginControllerObj = this;
    console.log('登陆模块启动');

    //具体情况具体分析啦
    this.divBlock = document.getElementById('login-window');
    //具体情况具体分析啦
    this.submitButton = this.divBlock.getElementsByClassName('submit')[0];

    this.getInput = function(name){
        return this.divBlock.querySelectorAll('input[name="'+name+'"]')[0];
    };

    this.getForm = function()
    {
        return this.divBlock.getElementsByTagName('form')[0];
    };

    //遍历表单对象，取到所有表单值进入对象中
    this.getFormData = function()
    {
        this.form = this.getForm();
        this.loginData = {};
        for(var i = 0; i < this.form.length; i++){
            this.loginData[this.form[i].name] = this.form[i].value;
        }
        return this.loginData;
    };

    //设置表单样式
    this.setInputError = function(name){
        //已经有的话先去掉，这样可以保证有shake动效触发
        this.getInput(name).classList.remove('error-input');
        this.getInput(name).classList.add('error-input');
    };

    this.removeInputError = function(name)
    {
        this.getInput(name).classList.remove('error-input');
        this.getInput(name).classList.remove('shake');
    };

    //检查数据合法与否（不是内容的正确性而是格式的合理性）
    this.checkData = function(){
        //每次检查前都要重新获取一次数据
        this.getFormData();
        var isDataLegal = true;
        if(this.loginData.username.length==0){
            topMessage(
                {
                    Message:'您输入的用户名为空，请验证后重新输入',
                    Type:'warning'
                });
            this.setInputError('username');
            isDataLegal = false;
        }else{
            this.removeInputError('username');
        }
        var passwordTester = new RegExp(/[0-9 | A-Z | a-z]{6,16}/);//6-18位字母开头的密码
        if(!passwordTester.test(this.loginData.password)){
            topMessage(
                {
                    Message:'您输入的密码格式有误，请验证后重新输入',
                    Type:'warning'
                }
            );
            this.setInputError('password');
            isDataLegal = false;
        }else{
            this.removeInputError('password');
        }
        return isDataLegal;
    };

    this.sendData = function()
    {
        console.log('准备发送数据');
        //topMessage({
        //    Message:'正在连接',
        //    Type:'normal'
        //});
        ajax.send(
            {
                url: UserModel.prototype.LoginPath,
                data: this.loginData,
                type: 'GET',
                dataType: "json",
                success: function(data)
                {
                    //将提示等待的信息消除
                    //topMessage.prototype.remove();
                    //removeAllMessages();
                    if(data.status==1)
                    {
                        console.log('登陆成功');
                        console.log(data);
                        //todo
                        //无论如何重新初始化用户
                        //控制器生成UserModel
                        window.currentUser = new UserModel(data.user);
                        window.currentUser.writeCookie(data.user.username);
                        //补全界面元素
                        window.currentUser.setUserBarLog(data.user.username);

                        //return data;
                        topMessage(
                            {
                                Message:'登陆成功，跳转回首页',
                                Type:'success'
                            });
                    }
                    else{
                        topMessage({
                            Message:data.error,
                            Type:'fail'
                        });
                        console.error(data.error);
                        return null;
                    }
                }
            }
        );
    };
    //绑定
    this.bind = function(){
        this.submitButton.addEventListener('click',function()
        {
            if(LoginControllerObj.checkData())
            {
                LoginControllerObj.sendData();
            }
        });
        //提交按钮输入回车触发提交
        this.submitButton.addEventListener('keydown',function(event)
        {
            var event=event?event:(window.event?window.event:null);
            if(event.keyCode ==13)
            {
                if(LoginControllerObj.checkData())
                {
                    LoginControllerObj.sendData();
                }
            }
        });
        //密码input输入回车触发提交
        this.getInput('password').addEventListener('keydown',function(event)
        {
            var event=event?event:(window.event?window.event:null);
            if(event.keyCode ==13)
            {
                if(LoginControllerObj.checkData())
                {
                    LoginControllerObj.sendData();
                }
            }
        });
        console.log('登录模块绑定完毕');
    };
    //初始化
    this.init = function(){
        console.log('登录模块开始初始化');
        this.bind();
    };
    LoginControllerObj.init();
    return this;
};
