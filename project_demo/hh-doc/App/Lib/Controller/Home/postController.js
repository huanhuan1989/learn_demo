module.exports = Controller({
    listAction: function(){
        /*转化为JSON格式直接输出到浏览器
        var self = this;
        return D('post').select().then(function(data){
           self.json(data);
        });*/

        //利用eJs转化模板
        var listPromise = D('doc').select();
        this.assign('list', listPromise);
        this.display();
    },
    detailAction: function(){
        var id = this.get('id') | 0;
        if(!id){
            return this.error(100, 'params error');
        };
        var detailPromise = D('doc').where({id: id}).find();
        this.assign('post_info', detailPromise);
        this.display();
    }
});