/**
 * Created by wungcq on 15/2/24.
 */
window.ProblemListModel = function(ProblemListData)
{
    if(typeof this.ProblemListData == "undefined" && typeof ProblemListData != "undefined")
    {
        this.modelData = ProblemListData;
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
        ProblemListModel.prototype.templatePath = 'http://localhost:63342/github/ngtest/public/templates/contestProblemList.html';
        ProblemListModel.prototype.RetrievePath = 'http://localhost:63342/github/ngtest/public/JSON/get_use_list.json';
    }
)();

ProblemListModel.prototype.init = function(ProblemListData){
    this.modelData = ProblemListData;
    return ProblemListData;
};

//ProblemListModel.prototype.loadTemplate = function()
//{
//
//};

//通过pageData获取分页信息
ProblemListModel.prototype.RETRIEVE = function(pageData,callback)
{

    ajax.send(
        {
            url: ProblemListModel.prototype.RetrievePath,
            data: pageData,
            type: ProblemListModel.prototype.Retrievemethod,
            async: false,
            dataType: "json",
            success: function(Data) {
                if (Data.status == 1)//返回无误
                {

                    if(typeof callback == "function"){
                        problemListController.currentProblemList = new ProblemListModel(Data);
                        callback();
                    }
                    return true;
                }
                else {
                    topMessage({
                        Message: Data.error,
                        Type: 'fail'
                    });
                    return true;
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
