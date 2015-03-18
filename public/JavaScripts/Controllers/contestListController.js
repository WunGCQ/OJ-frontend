/**
 * Created by wungcq on 15/3/7.
 */
window.contestListController = {};

contestListController.page = 1;

contestListController.scopeBlock = document.getElementById('contest-list-section');
contestListController.ContestNumberEachPage = 20;
contestListController.currentContestList = {};


contestListController.convertPageToSize = function(page){
    if(page == null || typeof page == "undefined" || isNaN(page) ){
        var pageNumber = contestListController.page;
    }
    contestListController.start = contestListController.ContestNumberEachPage*(pageNumber-1);
    return contestListController.start;
};

contestListController.showContestList = function(page){
    ContestListModel.prototype.loadTemplate();
    var startPosition = contestListController.convertPageToSize(page);

    var pageData = {
        start : startPosition,
        size  : contestListController.ContestNumberEachPage
    };

    contestListController.currentContestList = new ContestListModel();

    contestListController.currentContestList.RETRIEVE(pageData,function(){
        var contestListPageText = contestListController.currentContestList.renderPage();
        //contestListPageText += juicer(contestListPageText,{"page":{"page":contestListController.page}});
        $(contestListController.scopeBlock).html(contestListPageText);
        contestListController.scopeBlock._css('display','block');
        var AnchorsToBind = contestListController.scopeBlock.getElementsByTagName("a");
        jRouter.parseAnchor(AnchorsToBind);
    });


};