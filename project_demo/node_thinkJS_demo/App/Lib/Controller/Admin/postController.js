var moment = require('moment');
module.exports = Controller("Admin/BaseController", {
    addAction: function(){
        var self = this;
        if(this.isGet()){
            return this.display();
        };
        var title = this.post('title');
        var content = this.post('content');
        if(title && content){
            return D('doc').add({
                title: title,
                content: content,
                create_time: moment().format('YYYY-MM-DD HH:mm:ss'),
                update_time: moment().format('YYYY-MM-DD HH:mm:ss')
            }).then(function(insertId){
                self.redirect('/admin/post/list');
                //return self.success(insertId);
            }).catch(function(err){
               return self.error(500, err.message);
            });
        };
        return this.error(102, 'parms error');
    },
    listAction: function(){
        var listPromise = D('doc').select();
        this.assign('list', listPromise);
        this.display();
    },
    deleteAction: function(){
        var id = this.get('id') | 0;
        console.log(id);
        if(!id){
            return this.error(102, 'params error');
        };
        var self = this;
        return D('doc').where({id: id}).delete().then(function(){
            self.redirect('/admin/post/list');
        }).catch(function(err){
            self.error(500, err.message);
        })
    }
})