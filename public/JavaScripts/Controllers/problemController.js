/**
 * Created by wungcq on 15/2/27.
 */
window.problemController = {};

problemController.scopeBlock = document.getElementById("problem-section");
//加载题目页面内容
problemController.showProblem = function(problem_id){
    if(window.currentProblem == null){
        window.currentProblem = new ProblemModel();
    }
    window.currentProblem.loadTemplate();
    window.currentProblem.RETRIEVE(problem_id,function(){
        var problemPageText = window.currentProblem.renderPage();
        $(problemController.scopeBlock).html(problemPageText);
    });

};