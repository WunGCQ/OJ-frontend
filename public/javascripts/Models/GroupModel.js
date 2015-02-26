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
    GroupModel.prototype.templatePath = 'http://wungcq.github.io/public/templates/group.html';
    GroupModel.prototype.AddPath      = 'http://wungcq.github.io/public/JSON/register.json';
    GroupModel.prototype.RetrievePath = 'http://wungcq.github.io/public/JSON/get_user.json';
    GroupModel.prototype.UpdatePath   = 'http://wungcq.github.io/public/JSON/update_uer.json';
    GroupModel.prototype.LogoutPath   = 'http://wungcq.github.io/public/JSON/logout.json';
})();