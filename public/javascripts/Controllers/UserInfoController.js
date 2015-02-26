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
        userInfoTabs[i].style["display"] = "none";
    }
    document.getElementById(id).style["display"] = "block";
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
        value = input.value;//取值
        if(UserInfoController.checkUserInfoValue(input,value)){ //检查无误
            changeValueLink.setAttribute("data-value",value);
            changeValueLink.innerHTML = "修改";
            span.innerHTML = value;//修改显示的值
            input.setAttribute("type","hidden");
            span._css("display","inline");
            changeValueLink.classList.remove('changed');
        }
    }
    //按键处于非修改状态，点击开始修改
    else{
        changeValueLink.classList.add('changed');
        input.value = value;
        span._css("display","none");
        input.setAttribute("type","text");
        changeValueLink.setAttribute("data-if-change","true");//表示这个键被修改过了
        changeValueLink.innerHTML = "确认";

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
UserInfoController.submitInfo = function()
{

};
UserInfoController.bind = function()
{
    var changeLinks = document.getElementById("user-info-tab").getElementsByTagName("a");
    for(var i = 0; i< changeLinks.length - 1; i++)
    {
        changeLinks[i].addEventListener("click",function()
        {
            UserInfoController.changeUserInfoValue(this);
        });
    }
};