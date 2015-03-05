/**
 * Created by wungcq on 15/2/15.
 */
window.GroupModel = function(){
    return this;
};

//Group 继承自数据模型类
GroupModel.prototype = new Model();
//需要设置每个数据模型的增删改查路径
(function(){
    GroupModel.prototype.templatePath = 'http://localhost:63342/github/ngtest/public/templates/group.html';
    GroupModel.prototype.AddPath      = 'http://localhost:63342/github/ngtest/public/JSON/register.json';
    GroupModel.prototype.RetrievePath = 'http://localhost:63342/github/ngtest/public/JSON/get_user.json';
    GroupModel.prototype.UpdatePath   = 'http://localhost:63342/github/ngtest/public/JSON/update_uer.json';
    GroupModel.prototype.LogoutPath   = 'http://localhost:63342/github/ngtest/public/JSON/logout.json';
})();