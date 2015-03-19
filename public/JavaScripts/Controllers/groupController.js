/**
 * Created by wungcq on 15/3/5.
 */
window.groupController = {};

groupController.scopeBlock = document.getElementById("group-section");
//加载题目页面内容
groupController.showGroup = function(group_id){
    if(window.currentGroup == null){
        window.currentGroup = new GroupModel();
    }
    window.currentGroup.loadTemplate();
    window.currentGroup.RETRIEVE(group_id,function(){
        var groupPageText = window.currentGroup.renderPage();
        $(groupController.scopeBlock).html(groupPageText);
    });

};
groupController.submitGroupApplication = function(group_id){
    ajax.send(
        {
            url: GroupModel.prototype.joinPath,
            data: {"id":group_id},
            type: 'POST',
            async: true,
            dataType: "json",
            success: function(Data) {
                if (Data.status == 1)//返回无误
                {
                    topMessage({
                        Message:'你的申请已经成功提交~耐心等候吧~',
                        Type:'normal'
                    });
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