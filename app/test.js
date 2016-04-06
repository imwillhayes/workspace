'use strict';

var request=require("request")
var fs=require("fs");

var ws=fs.createWriteStream('a.html');

request("http://www.zhihu.com/").pipe(ws)

