/**
 * Created by wungcq on 15/3/5.
 */
window.ContestListModel = function(ContestListData)
{
    if(typeof this.modelData == "undefined" && typeof ContestListData != "undefined")
    {
        this.modelData = ContestListData;
        this.init(ContestListData);
    }
    this.loadTemplate();
    return this;
};

//ContestList 继承自数据模型类
ContestListModel.prototype = new Model();

//需要设置每个数据模型的增删改查路径和参数
(
    function()
    {
        //todo 伪造json数据
        ContestListModel.prototype.templatePath = 'http://localhost:63342/github/ngtest/public/templates/contestList.html';
        ContestListModel.prototype.RetrievePath = 'http://localhost:63342/github/ngtest/public/JSON/get_contest_list.json';
    }
)();

ContestListModel.prototype.init = function(ContestListData){
    this.modelData = {"content":ContestListData};
    //for(var key in ContestListData){
    //    this[key] = ContestListData[key];
    //}
};


//通过pageData获取分页信息
ContestListModel.prototype.RETRIEVE = function(pageData,callback)
{

    ajax.send(
        {
            url: ContestListModel.prototype.RetrievePath,
            data: pageData,
            type: ContestListModel.prototype.Retrievemethod,
            async: false,
            dataType: "json",
            success: function(Data) {
                if (Data.status == 1)//返回无误
                {

                    if(typeof callback == "function"){
                        contestListController.currentContestList = new ContestListModel(Data.content);
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