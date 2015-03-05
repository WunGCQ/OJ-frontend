/**
 * Created by wungcq on 15/2/27.
 */
window.problemListController = {};

problemListController.page = 1;

problemListController.scopeBlock = document.getElementById('problem-list-section');
problemListController.ProblemNumberEachPage = 20;
problemListController.currentProblemList = {};


problemListController.convertPageToSize = function(page){
    if(page == null || typeof page == "undefined" || isNaN(page) ){
        var pageNumber = problemListController.page;
    }
    problemListController.start = problemListController.ProblemNumberEachPage*(pageNumber-1);
    return problemListController.start;
};

problemListController.showProblemList = function(page){
    ProblemListModel.prototype.loadTemplate();
    var startPosition = problemListController.convertPageToSize(page);

    var pageData = {
        start : startPosition,
        size  : problemListController.ProblemNumberEachPage
    };

    problemListController.currentProblemList = new ProblemListModel();

    problemListController.currentProblemList.RETRIEVE(pageData,function(){
        var problemListPageText = problemListController.currentProblemList.renderPage();
        //problemListPageText += juicer(problemListPageText,{"page":{"page":problemListController.page}});
        $(problemListController.scopeBlock).html(problemListPageText);
        problemListController.scopeBlock._css('display','block');
        var AnchorsToBind = problemListController.scopeBlock.getElementsByTagName("a");
        jRouter.parseAnchor(AnchorsToBind);
    });


};