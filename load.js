var fs = require('fs');

var globalConfig = require('./config');

var controllerSet = [];

var pathMap = new Map();

var files = fs.readdirSync(__dirname + globalConfig['web_path']);
//[ 'BlogController.js', 'EveryDayController.js' ]


for(var i = 0; i < files.length; i ++){
    var temp = require(__dirname + globalConfig["web_path"] + files[i]);
    if(temp.path){
        for(var [key,value] of temp.path){
            if(pathMap.get(key) == null){
                pathMap.set(key,value);
            }else{
                throw new Error('url path异常');
            }
        }
        controllerSet.push(temp);
    }
}



module.exports = pathMap;