/**
 * controller
 * @return
 */
var protagonist = require('protagonist');
module.exports = Controller("ToJson/BaseController", function(){
    "use strict";
    return {
        indexAction: function(){
            var self = this;
            /*var options = '# GET /path/to/api\
            描述该API的功能\
            + Parameters\
            + pn (Integer) ... 页码\
            + ps (Integer, optional) ... 页面大小\
            + Response\
            {\
                "errno" : 0,\
                "errmsg" : null,\
                "total" : 1,\
                "list" : [ {\
                "vid" : 237,\
                "name" : "天文台"\
            } ]\
            }';*/
            var options = {
                exportSourcemap: true
            }
            protagonist.parse('# My API', options, function(error, result) {
                if (error) {
                    console.log(error);
                    return;
                };
                console.log(result);
                self.end(result);
            });
            /*protagonist.parse(options, function(error, result) {
                if (error) {
                    console.log(error);
                    return;
                };
                console.log(result);
                self.end(result);
            });*/
            this.display();
        }
    };
});