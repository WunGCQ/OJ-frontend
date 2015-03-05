/**
 * Created by wungcq on 15/2/20.
 */
    //全局实例为RegisterControllerEntity
var registerController = function(){

    var registerControllerObj = this;
    console.log('登陆模块启动');

    //具体情况具体分析啦
    this.divBlock = document.getElementById('register-window');
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
        this.registerData = {};
        for(var i = 0; i < this.form.length; i++){
            this.registerData[this.form[i].name] = this.form[i].value;
        }
        return this.registerData;
    };

    //设置表单样式
    this.setInputError = function(name)
    {
        //已经有的话先去掉，这样可以保证有shake动效触发
        this.getInput(name).classList.remove('shake');
        this.getInput(name).classList.add('error-input');
        this.getInput(name).classList.add('shake');
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
        //检查用户名
        if(this.registerData.username.length==0)
        {
            //报错
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
        //验证邮件地址合法
        var emailTest = new RegExp(/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/);
        if(!emailTest.test(this.registerData.email))
        {
            //报错
            topMessage(
                {
                    Message:'您输入的邮件地址不合法，请验证后重新输入',
                    Type:'warning'
                }
            );
            this.setInputError('email');
            isDataLegal = false;
        }else{
            this.removeInputError('email');
        }
        if(this.registerData.nickname.length==0){
            topMessage(
                {
                    Message:'您输入的昵称为空，请验证后重新输入',
                    Type:'warning'
                });
            this.setInputError('nickname');
            isDataLegal = false;
        }else{
            this.removeInputError('nickname');
        }
        //验证密码合法
        var passwordTester = new RegExp(/[0-9 | A-Z | a-z]{6,16}/);//6-16位密码
        if(!passwordTester.test(this.registerData.password))
        {
            //报错
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
        if(this.registerData.password_again != this.registerData.password)
        {
            //报错
            topMessage(
                {
                    Message:'两次输入的密码不一致，请验证后重新输入',
                    Type:'warning'
                }
            );
            this.setInputError('password');
            isDataLegal = false;
        }else{
            this.removeInputError('password_again');
        }
        return isDataLegal;
    };

    //发送数据，生成对象
    this.sendData = function()
    {
        console.log('准备发送注册数据');
        ajax.send(
            {
                url: 'http://localhost:63342/github/ngtest/public/JSON/register.json',
                data: this.registerData,
                type: 'POST',
                dataType: "json",
                success: function(data)
                {
                    if(data.status==1)
                    {
                        console.log('登陆成功');
                        console.log(data);
                        //todo
                        //控制器生成UserModel
                        //return data;
                        topMessage(
                            {
                                Message:'注册成功，快去登陆吧',
                                Type:'success'
                            });
                    }
                    else{
                        topMessage(data.error,'fail');
                        console.error(data.error);
                        return null;
                    }
                }
            }
        );
    };
    //绑定
    this.bind = function(){
        //按键点击触发提交
        this.submitButton.addEventListener('click',function()
        {
            if(registerControllerObj.checkData())
            {
                registerControllerObj.sendData();
            }
        });
        //提交按钮输入回车触发提交
        this.submitButton.addEventListener('keydown',function(event)
        {
            var event=event?event:(window.event?window.event:null);
            if(event.keyCode ==13)
            {
                if(registerControllerObj.checkData())
                {
                    registerControllerObj.sendData();
                }
            }
        });
        //密码input输入回车触发提交
        this.getInput('password_again').addEventListener('keydown',function(event)
        {
            var event=event?event:(window.event?window.event:null);
            if(event.keyCode ==13)
            {
                if(registerControllerObj.checkData())
                {
                    registerControllerObj.sendData();
                }
            }
        });
        console.log('注册模块绑定完毕');
    };
    //初始化
    this.init = function(){
        console.log('注册模块开始初始化');
        this.bind();
    };
    registerControllerObj.init();
    return this;
};
