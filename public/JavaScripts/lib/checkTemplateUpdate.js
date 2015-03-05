/**
 * Created by wungcq on 15/3/5.
 */
function checkTemplateUpdate(){
    ajax.send(
        {
            url: 'http://localhost:63342/github/ngtest/public/JSON/check_template_update.json',
            data: null,
            type: "GET",
            async:false,
            dataType: "json",
            success: function(Data)
            {
                if(Data.status==1)
                {
                    window.templateVersionInfo = Data.versionInfo;
                    for( t in Data.versionInfo ){
                        var ver = localStorage.getItem(t+".Version");
                        if  (ver == null || ver != Data.versionInfo[t]){//版本不一致
                            localStorage.removeItem(t);
                        }
                    }
                }
                else
                {
                    topMessage({
                        Message:Data.error,
                        Type:'fail'
                    });
                }
            }
        }
    );
}