/**
 * Created by wungcq on 15/2/27.
 */
window.groupListController = {};

groupListController.page = 1;

groupListController.scopeBlock = document.getElementById('group-list-section');
groupListController.GroupNumberEachPage = 20;
groupListController.currentGroupList = {};


groupListController.convertPageToSize = function(page){
    if(page == null || typeof page == "undefined" || isNaN(page) ){
        var pageNumber = groupListController.page;
    }
    groupListController.start = groupListController.GroupNumberEachPage*(pageNumber-1);
    return groupListController.start;
};

groupListController.showGroupList = function(page){
    GroupListModel.prototype.loadTemplate();
    var startPosition = groupListController.convertPageToSize(page);

    var pageData = {
        start : startPosition,
        size  : groupListController.GroupNumberEachPage
    };

    groupListController.currentGroupList = new GroupListModel();

    groupListController.currentGroupList.RETRIEVE(pageData,function(){
        var groupListPageText = groupListController.currentGroupList.renderPage();
        //groupListPageText += juicer(groupListPageText,{"page":{"page":groupListController.page}});
        $(groupListController.scopeBlock).html(groupListPageText);
        groupListController.scopeBlock._css('display','block');
        var group_list_anchors = groupListController.scopeBlock.getElementsByTagName("a");
        jRouter.parseAnchor(group_list_anchors);
    });
    

};

