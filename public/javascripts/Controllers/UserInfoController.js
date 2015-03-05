/**
 * Created by wungcq on 15/2/25.
 */
var UserInfoController = {};

UserInfoController.showUserInfoTab = function(id,event)
{

    var activeLink = event.currentTarget;
    document.getElementById('user-info-nav').getElementsByClassName('active')[0].classList.remove('active');

    activeLink.classList.add('active');
    var userInfoTabs = document.getElementsByClassName('user-info-tabs');

    for (var i = 0; i < userInfoTabs.length; i++)
    {
        userInfoTabs[i].style['display'] = 'none';
    }
    document.getElementById(id).style['display'] = 'block';
};

UserInfoController.changeUserInfoValue = function(obj)
{
    var changeValueLink = obj;
    var value = changeValueLink.getAttribute('data-value');//取得数值

    //取得各个元素
    var valueTd = changeValueLink.parentNode.previousElementSibling;
    var span = valueTd.getElementsByTagName('span')[0];
    var input = valueTd.getElementsByTagName('input')[0];

    //分情况判断
    //按键正处于修改状态,再次点击保存修改
    if(changeValueLink.classList.contains('changed'))
    {
        var newValue = input.value;//取值
        if(UserInfoController.checkUserInfoValue(input,value)){ //检查无误
            if(value != newValue){
                changeValueLink.setAttribute('data-if-change','true');//表示这个键被修改过了
                changeValueLink.setAttribute('data-value',newValue);
            }
            changeValueLink.innerHTML = '修改';
            span.innerHTML = newValue;//修改显示的值
            input.setAttribute('type','hidden');
            span._css('display','inline');
            changeValueLink.classList.remove('changed');
        }
    }
    //按键处于非修改状态，点击开始修改
    else{
        changeValueLink.classList.add('changed');
        input.value = value;
        span._css('display','none');
        input.setAttribute('type','text');
        changeValueLink.innerHTML = '确认';
    }
};
UserInfoController.checkUserInfoValue = function(input,value)
{
    if(value.length>0){
        UserInfoController.removeInputError(input);
        return true;
    }
    else{
        UserInfoController.setInputError(input);
        return false;
    }
};
UserInfoController.setInputError = function(input)
{
    //已经有的话先去掉，这样可以保证有shake动效触发
    input.classList.remove('shake');
    input.classList.add('error-input');
    input.classList.add('shake');
};
UserInfoController.removeInputError = function(input)
{
    input.classList.remove('error-input');
    input.classList.remove('shake');
};

UserInfoController.bind = function()
{
    var changeLinks = document.getElementById('user-info-tab').getElementsByTagName('a');
    //绑定修改事件
    for(var i = 0; i< changeLinks.length - 1; i++)
    {
        changeLinks[i].addEventListener('click',function()
        {
            UserInfoController.changeUserInfoValue(this);
        });
    }

    //刷新a标签，绑定事件
    //提交事件已经写在路由地址里面啦~
    jRouter.parseAnchor();

};
UserInfoController.updateUserInfo = function()
{
    var res={};
    var counter  = 0;
    var userInfoContainers = document.getElementById('user-info-tab').getElementsByTagName('a');

    for(var i = 0;i<userInfoContainers.length-1;i++){
        if(userInfoContainers[i].getAttribute('data-if-change')=='true')
        {
            //表明这个值被修改过
            var changeName = userInfoContainers[i].getAttribute('data-name');
            var changeValue = userInfoContainers[i].getAttribute('data-value');
            res[changeName] = changeValue;
            counter ++;
        }
    }

    if(counter==0)
    {
        topMessage({
           Message:'你还没有更改任何信息,不用提交~',
           Type:'normal'
        });
    }
    else
    {
        res['id'] = window.currentUser.id;
        window.currentUser.UPDATE(res);
    }
};
UserInfoController.reportPWDError = function()
{
    //报错
    topMessage(
        {
            Message:'您输入的密码格式有误，请验证后重新输入',
            Type:'warning'
        }
    );
};
UserInfoController.checkPWD = function(){
    var pwdInputs = document.getElementById('user-change-password-tab').getElementsByTagName('input');

    var origin       = pwdInputs[0].value;
    var newPwd       = pwdInputs[1].value;
    var newPwdRepeat = pwdInputs[2].value;

    var isDataLegal = [true,true,true];

    var passwordTester = new RegExp(/[0-9 | A-Z | a-z]{6,16}/);//6-16位密码
    if(!passwordTester.test(origin))
    {
        UserInfoController.reportPWDError();
        UserInfoController.setInputError(pwdInputs[0]);
        isDataLegal[0] = false;
    }
    else
    {
        UserInfoController.removeInputError(pwdInputs[0]);
    }

    if(!passwordTester.test(newPwd))
    {
        UserInfoController.reportPWDError();
        UserInfoController.setInputError(pwdInputs[1]);
        isDataLegal[1] = false;
    }
    else
    {
        UserInfoController.removeInputError(pwdInputs[1]);
    }

    if(!passwordTester.test(newPwdRepeat))
    {
        UserInfoController.reportPWDError();
        UserInfoController.setInputError(pwdInputs[2]);
        isDataLegal[2] = false;
    }
    else{
        UserInfoController.removeInputError(pwdInputs[2]);
    }
    if(newPwd != newPwdRepeat)
    {
        //报错
        topMessage(
            {
                Message:'两次输入的密码不一致，请验证后重新输入',
                Type:'warning'
            }
        );
        UserInfoController.setInputError(pwdInputs[1]);
        UserInfoController.setInputError(pwdInputs[2]);
        isDataLegal[1] = false;
        isDataLegal[2] = false;
    }
    else
    {
        if(isDataLegal[1])
        {
            UserInfoController.removeInputError(pwdInputs[1]);
        }
        if(isDataLegal[2])
        {
            UserInfoController.removeInputError(pwdInputs[2]);
        }
    }

    if(isDataLegal[0]&&isDataLegal[1]&&isDataLegal[2])
    {
        return {
            "origin_password":origin,
            "password":newPwd,
            "password_again":newPwd
        }
    }
    else
    {
        return false;
    }


};

UserInfoController.updateUserPWD = function(){
    var checkRes = UserInfoController.checkPWD();
    if(checkRes!=false)
    {
        window.currentUser.UPDATEPASSWORD(checkRes);
        return true;
    }
};

//资料面板
UserInfoController.showCurrentUserInfo = function()
{
    //如果还没加载过这个模块
    if(!window.currentUser.isUserInfoShown){
        //由于UserModel的构造函数决定了一定已经有模板了
        var text = window.currentUser.renderPage();
        //document.getElementById('user-info-section').innerHTML = text;
        $('#user-info-section').html(text);
        window.currentUser.isUserInfoShown = true;
    }
    //如果已经加载过这个模块
    else{
        //就不用做这些破事儿了
    }
    document.getElementById('user-info-section').style["display"] = "block";
    return;
};