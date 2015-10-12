/**
 * 项目里的Controller基类
 * 这里做一些通用的处理逻辑，其他Controller继承该类
 * @param  {[type]} 
 * @return {[type]}         [description]
 */
module.exports = Controller({
    __before: function(){
        return this.checkUserLogin();
    },
    checkUserLogin: function(){
        var self = this;
        if(this.http.action == 'login'){
            return false;
        };
        return this.session('userInfo').then(function(data){
            if(isEmpty(data)){  //如果未登录
                if(self.isAjax()){  //如果请求为AJAX
                    return self.error('403', 'not login');  //报403，未登录
                };
                return self.redirect('/admin/index/login');  //跳转
            };
            self.assign('userInfo', data);  //赋值
        });
    }
});