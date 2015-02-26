/**
 * Created by wungcq on 15/2/24.
 */
window.ProblemListModel = function(ProblemListData)
{
    if(typeof this.ProblemListData == "undefined" && typeof ProblemListData != "undefined")
    {
        this.ProblemListData = ProblemListData;
        this.init(ProblemListData);
    }
    this.loadTemplate();
    return this;
};

//ProblemList 继承自数据模型类
ProblemListModel.prototype = new Model();

//需要设置每个数据模型的增删改查路径和参数
(
    function()
    {
        ProblemListModel.prototype.templatePath = 'http://wungcq.github.io/public/templates/problemlist.html';
        ProblemListModel.prototype.RetrievePath = 'http://wungcq.github.io/public/JSON/get_problem_list.json';
        ProblemListModel.prototype.Retrievemethod = 'GET';
    }
)();

ProblemListModel.prototype.init = function(ProblemListData){
    var ProblemListData = ProblemListData||this.ProblemListData;
    if(typeof ProblemListData != "undefined"){
        this.ProblemListname   = ProblemListData.ProblemListname;
        this.nickname   = ProblemListData.nickname;
        this.student_id = ProblemListData.student_id;
        this.school     = ProblemListData.school;
        this.college    = ProblemListData.college;
        this.email      = ProblemListData.email;
        this.head       = ProblemListData.head;
    }
};

//ProblemListModel.prototype.loadTemplate = function()
//{
//
//};

//获取题目列表
ProblemListModel.prototype.RETRIEVE = function(page)
{
    //此处为
    if( typeof page == 'undefined'){
        var data = {page:1};
    }else{
        var data = {page:page};
    }
    var temp = this;

    //数据为空表示着向服务器session查找当前用户，用于已经登陆的用户打开新页面的时候的操作
    ajax.send(
        {
            url: ProblemListModel.prototype.RetrievePath,
            data: data,
            type: ProblemListModel.prototype.Retrievemethod,
            async:false,
            dataType: "json",
            success: function(Data)
            {
                if(Data.status==1)
                {
                    ProblemListModel.prototype.template = temp.loadTemplate();
                    var text =  juicer(temp.template, Data);
                    document.getElementById('main-section').innerHTML += text;
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
            error:function(){
                topMessage({
                    Message:'服务器连接异常，请检查网络或稍后重试',
                    Type:'fail'
                });
            }
        }
    );
};
