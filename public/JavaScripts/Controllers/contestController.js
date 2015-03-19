/**
 * Created by wungcq on 15/3/7.
 */
window.contestController = {};

contestController.scopeBlock = document.getElementById("contest-section");
//加载题目页面内容
contestController.showContest = function(contest_id){
    if(window.currentContest == null){
        window.currentContest = new ContestModel();
    }
    window.currentContest.loadTemplate();
    window.currentContest.RETRIEVE(contest_id,function(){
        var contestPageText = window.currentContest.renderPage();
        $(contestController.scopeBlock).html(contestPageText);
    });

};