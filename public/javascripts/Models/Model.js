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

Model.prototype.setTemplate = function(arg)
{
    this.template = arg.template||null;
    this.templatePath = arg.templatePath||null;
};

Model.prototype.getTemplateText = function()
{
    return this.template;
};

Model.prototype.getTemplateUrl = function()
{
    return this.templatePath;
};

Model.prototype.setAjaxPath = function(arg)
{
    this.AjaxPath = arg.path;
    this.method = arg.method||'POST';
};
Model.prototype.getAjaxPath = function()
{
    return {
        path : this.AjaxPath,
        method : this.method
    };
};

Model.prototype.loadTemplate = function()
{
    var templateHTML = this.getTemplateText();
    if(templateHTML == null)
    {
        ajax.send(
            {
                url: this.getTemplateUrl(),
                data: data,
                type: 'GET',
                dataType: "html",
                success: function(template)
                {
                    templateHTML = template;
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

//加载数据
Model.prototype.loadModelData = function(sendData)
{
    ajax.send(
        {
            url: this.getAjaxPath.path,
            data: sendData || null,
            type: this.getAjaxPath.method,
            dataType: this.ajaxResponseDataType || "json",
            success: function(data)
            {
                if(data.status==1)
                {
                    return data;
                }
                else{
                    console.error(data.error);
                    return null;
                }
            }
        }
    );
};

Model.prototype.renderer = nanoRenderer;


Model.prototype.init = function(arg)
{
    //初始化模板
    this.setTemplate({
       template : arg.template,
       templatePath : arg.templatePath
    });
    //  确定ajax的发送路径
    this.setAjaxPath(arg.ajaxPath);
};

function extend(Child, Parent) {
    var temp = {};
    temp.prototype = Parent.prototype;
    Child.prototype = temp.prototype;
}