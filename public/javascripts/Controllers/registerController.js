/**
 * Created by wungcq on 15/2/20.
 */
var registerController = function(){

    console.log('注册模块启动');

    this.getForm = function()
    {
        return document.getElementById('register-window').getElementsByTagName('form')[0];
    };

    //遍历表单对象，取到所有表单值进入对象中
    this.getFormData = function()
    {
        this.form = registerController.getForm();
        this.registerData = {};
        for(var i = 0; i < this.form.length; i++){
            this.registerData[this.form[i].name] = this.form[i].value;
        }
        return this.registerData;
    };
    this.sendData = function()
    {
        ajax.send(
            {
                url: '/register/',
                data: this.registerData,
                type: 'POST',
                dataType: "json",
                success: function(data)
                {
                    if(data.status==1)
                    {
                        return data;
                    }
                    else{
                        console.error(data.error);
                        return null;
                    }
                }
            }
        );
    };
};
