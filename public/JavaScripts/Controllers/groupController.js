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