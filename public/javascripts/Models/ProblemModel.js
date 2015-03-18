/**
 * Created by wungcq on 15/2/15.
 */
window.currentProblem = null;//全局对象，记录当前的题目
window.ProblemModel = function(problemData){
    if(problemData!=null || typeof problemData != "undefined"){
        this.init(problemData);
    }
    //避免重复加载原型模板
    if(this.template==null || typeof this.template == "undefined"){
        this.loadTemplate();
    }

    return this;
};


//Problem 继承自数据模型类
ProblemModel.prototype = new Model();
//需要设置每个数据模型的增删改查路径
(function(){
    ProblemModel.prototype.templatePath = 'http://localhost:63342/github/ngtest/public/templates/problem.html';
    ProblemModel.prototype.AddPath      = 'http://localhost:63342/github/ngtest/public/JSON/create_problem.json';
    ProblemModel.prototype.RetrievePath = 'http://localhost:63342/github/ngtest/public/JSON/get_problem.json';
    ProblemModel.prototype.UpdatePath   = 'http://localhost:63342/github/ngtest/public/JSON/update_problem.json';
    ProblemModel.prototype.ProblemDataCache = new Array();//题目的缓存,缓存的是对象的json Data,省去向服务器查询
})();

//
ProblemModel.prototype.init = function(problemData){
    this.modelData = {'problem':problemData};
    for(var key in problemData){
        this[key] = problemData[key];
    }
};

ProblemModel.getProblemDataCache = function(id){
    if(ProblemModel.prototype.ProblemDataCache.length>0){
        for(var i = 0;i < ProblemModel.prototype.ProblemDataCache.length; i++){
            if(ProblemModel.prototype.ProblemDataCache[i].id = id){
                return ProblemModel.prototype.ProblemDataCache[i];
            }
        }
    }
    return false;
};
ProblemModel.pushProblemDataCache = function(data){
    ProblemModel.prototype.ProblemDataCache.push(data);
    return;
};


//通过id获取题目信息
//todo 想清楚应不应该放在原型中，是否需要实例去调用？
ProblemModel.prototype.RETRIEVE = function(id,callback)
{
    if( typeof id == 'undefined'){
        var data = null;
    }else{
        var data = {'id':id};
    }
    var problemData = ProblemModel.getProblemDataCache(id);//从缓存的题目数据中获取
    if(problemData!=false){ //存在于缓存中，说明之前取过。
        //当前题目对象不存在的情况
        if(window.currentProblem == null || typeof window.currentProblem == "undefined"){
            window.currentProblem = new ProblemModel(problemData);
        }
        else{
            //如果当亲题目就是这个题目
            if(window.currentProblem.id = id){
                //什么都不做
            }
            else{
                //如果不是
                window.currentProblem.init(problemData);
            }
        }
        if(typeof callback == "function"){
            callback();
        }

    }
    else{
        ajax.send(
            {
                url: ProblemModel.prototype.RetrievePath,
                data: data,
                type: ProblemModel.prototype.Retrievemethod,
                async: false,
                dataType: "json",
                success: function(Data) {
                    if (Data.status == 1)//返回无误
                    {
                        if(window.currentProblem == null || typeof window.currentProblem == "undefined"){
                            window.currentProblem = new ProblemModel(Data.problem);
                        }
                        else{
                            window.currentProblem.init(Data.problem);
                        }
                        ProblemModel.pushProblemDataCache(Data.problem);
                        if(typeof callback == "function"){
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
    }

};