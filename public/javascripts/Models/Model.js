/**
 * Created by wungcq on 15/2/18.
 */
//模块类
//每个模块都有自己的模板和渲染模板的方法
//每个模块都需要进行构造和渲染
//每个模块都有与服务器交互的方法
//约定 使用<div class="template-section" template-model="你的模块名称">

window.Models = {};//盛放model的容器


function Model() {}
//设置模板

//获取模板路径
Model.prototype.getTemplateText = function()
{
    return this.template;
};

Model.prototype.getTemplateUrl = function()
{
    return this.templatePath;
};

//增
Model.prototype.AddPath = null;
Model.prototype.Addmethod = 'GET';
Model.prototype.getAddPath = function()
{
    return {
        path : this.AddPath,
        method : this.Addmethod
    };
};
//删

Model.prototype.RemovePath = null;
Model.prototype.Removemethod = 'GET';
Model.prototype.getRemovePath = function()
{
    return {
        path : this.RemovePath,
        method : this.Removemethod
    };
};
//改
Model.prototype.UpdatePath = null;
Model.prototype.Updatemethod = 'GET';
Model.prototype.getUpdatePath = function()
{
    return {
        path : this.UpdatePath,
        method : this.Updatemethod
    };
};
//查
Model.prototype.RetrievePath = null;
Model.prototype.Retrievemethod = 'GET';
Model.prototype.getRetrievePath = function()
{
    return {
        path : this.RetrievePath,
        method : this.Retrievemethod
    };
};
//加载模板
Model.prototype.loadTemplate = function()
{
    var templateHTML = this.getTemplateText();
    var temp = this;
    if(templateHTML == null)
    {
        ajax.send(
            {
                url: this.getTemplateUrl(),
                data: null,
                type: 'GET',
                async:false ,//阻塞异步
                dataType: "html",
                success: function(template)
                {
                    templateHTML = template;
                    temp.template = template.replace(/[\r\n]/g,"");
                    return templateHTML;
                }
            }
        );
    }
    else
    {
        return templateHTML;
    }
};

//查询并加载数据
//实际上模型所做的事情有限，大部分是内部的数据处理和格式化
//大部分还是控制器完成的
//所以基于原来的模型能做数据操作的主要是 UPDATE 和 REMOVE
//ADD 和 RETRIEVE 与 model的先后顺序决定了不能用一个空的数据模型去做
//不过存储下来可以通过类名的原型函数调用来变相地在全局存储
Model.prototype.RETRIEVE = function(sendData)
{

};
Model.prototype.ADD = function(sendData)
{

};
Model.prototype.REMOVE = function(sendData)
{

};
Model.prototype.UPDATE = function(sendData)
{

};

//改用juicer模板引擎
Model.prototype.renderer = juicer;

