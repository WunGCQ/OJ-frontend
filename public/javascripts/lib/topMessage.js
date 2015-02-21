/**
 * Created by wungcq on 15/2/20.
 */
//顶端的消息条
//接收参数
//{
//    Message:'here is your message',
//    Type : 'success'/'fail'/'warning'/'normal'
//}
function topMessage(arg)
{

    this.TypesArray = ['success','fail','warning','normal'];
    this.TypeStylesArray = ['Top-Message-success','Top-Message-fail','Top-Message-warning','Top-Message-normal'];

    this.Type = this.TypesArray.indexOf(arg.Type||'normal');
    this.Message = arg.Message;

    this.TypeStyle = this.TypeStylesArray[this.Type];
    //创建元素
    this.entity = document.createElement('div');
    this.content = document.createTextNode(this.Message);
    this.entity.appendChild(this.content);
    this.entity.setAttribute('class','Top-Message ' + this.TypeStyle);

    this.closeElement = document.createElement('div');
    //this.closeElement.innerHTML = '×';
    this.entity.appendChild(this.closeElement);


    var body = document.getElementsByTagName('body')[0];

    document.body.appendChild(this.entity);


    //绑定点击关闭事件
    this.closeElement.addEventListener('click',function(){
        document.getElementsByClassName('Top-Message')[0]._css('opacity',0);
        setTimeout(
            (
                function()
                {
                    document.body.removeChild(document.getElementsByClassName('Top-Message')[0]);
                }()),
                500
        );

    });

    //
    return this;
}
topMessage({
    Message:'here is your message',
    Type:'success'
});