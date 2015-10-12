/**
 * controller
 * @return
 */
// 控制器文件定义
module.exports = Controller("Admin/BaseController", function(){
    "use strict";
    return {
        indexAction: function(){
            var userInfo = this.assign('userInfo');
            this.json(userInfo);
        },
        loginAction: function(){
            if(this.isGet()){
                return this.display();
            };
            var userName = this.post('username');
            var passWord = this.post('password');
            var self = this;
            if(userName == 'admin' && passWord == 'admin'){
                return this.session('userInfo', {username: userName}).then(function(){
                    self.redirect('/admin/post/list');  //跳转
                });
            };
            return this.error('101', '用户名或者密码错误！');
        }
    };
});