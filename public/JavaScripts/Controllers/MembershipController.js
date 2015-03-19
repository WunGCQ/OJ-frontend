/**
 * Created by wungcq on 15/3/19.
 */
/**
 * Created by wungcq on 15/3/7.
 */
window.MembershipController = {};

MembershipController.page = 1;

MembershipController.scopeBlock = document.getElementById('membership-section');


MembershipController.showMemberShip = function(group_id){
    MemberShipModel.prototype.loadTemplate();

    MembershipController.currentMemberShip = new MemberShipModel();

    MembershipController.currentMemberShip.RETRIEVE(group_id,function(){
        var MembershipPageText = MembershipController.currentMemberShip.renderPage();
        //MembershipPageText += juicer(MembershipPageText,{"page":{"page":MembershipController.page}});
        $(MembershipController.scopeBlock).html(MembershipPageText);
        MembershipController.scopeBlock._css('display','block');
        var AnchorsToBind = MembershipController.scopeBlock.getElementsByTagName("a");
        jRouter.parseAnchor(AnchorsToBind);
    });
};

MembershipController.addChangeView = function(obj) {
    var link = obj;
    var tr = link.parentNode.parentNode;

    var NickNameInput = tr.getElementsByTagName("input")[0];
    var span = NickNameInput.previousElementSibling;
    var t = NickNameInput.getAttribute("type");
    if(t == "hidden"){

        span._css("display","none");
        NickNameInput.setAttribute("type","text");
    }else{
        span.innerHTML = NickNameInput.value;
        NickNameInput.setAltertitle("type","hidden");
        span._css("display","inline");
    }
};