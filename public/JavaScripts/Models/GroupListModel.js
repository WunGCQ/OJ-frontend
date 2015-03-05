/**
 * Created by wungcq on 15/3/4.
 */
window.GroupListModel = function(GroupListData)
{
    if(typeof this.modelData == "undefined" && typeof GroupListData != "undefined")
    {
        this.modelData = GroupListData;
        this.init(GroupListData);
    }
    this.loadTemplate();
    return this;
};

//GroupList 继承自数据模型类
GroupListModel.prototype = new Model();

//需要设置每个数据模型的增删改查路径和参数
(
    function()
    {
        GroupListModel.prototype.templatePath = 'http://localhost:63342/github/ngtest/public/templates/groupList.html';
        GroupListModel.prototype.RetrievePath = 'http://localhost:63342/github/ngtest/public/JSON/get_group_list.json';
    }
)();

GroupListModel.prototype.init = function(GroupListData){
    this.modelData = {"group_list":GroupListData};
    //for(var key in GroupListData){
    //    this[key] = GroupListData[key];
    //}
};


//通过pageData获取分页信息
GroupListModel.prototype.RETRIEVE = function(pageData,callback)
{

    ajax.send(
        {
            url: GroupListModel.prototype.RetrievePath,
            data: pageData,
            type: GroupListModel.prototype.Retrievemethod,
            async: false,
            dataType: "json",
            success: function(Data) {
                if (Data.status == 1)//返回无误
                {

                    if(typeof callback == "function"){
                        groupListController.currentGroupList = new GroupListModel(Data.content);
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