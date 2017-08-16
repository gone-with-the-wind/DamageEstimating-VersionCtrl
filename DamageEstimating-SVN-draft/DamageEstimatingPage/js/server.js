var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');
var documentRoot = 'E:/awork/note/DamageEstimating-VersionCtrl/DamageEstimating-SVN-draft/DamageEstimatingPage';
function getContentTypeByExt(ext) {
    ext = ext.toLowerCase();
    if (ext === '.htm' || ext === '.html')
        return 'text/html';
    else if (ext === '.js')
        return 'application/x-javascript';
    else if (ext === '.css')
        return 'text/css';
    else if (ext === '.jpe' || ext === '.jpeg' || ext === '.jpg')
        return 'image/jpeg';
    else if (ext === '.png')
        return 'image/png';
    else if (ext === '.ico')
        return 'image/x-icon';
    else if (ext === '.zip')
        return 'application/zip';
    else if (ext === '.doc')
        return 'application/msword';
    else
        return 'text/plain';
}

var server= http.createServer(function(req,res){
    var pathname = url.parse(req.url).pathname;
    if (pathname === '/') {
        pathname = "/index.html"; 
    }
    var ext = path.extname(pathname);
    res.setHeader("Access-Control-Allow-Origin", "*");
    var urls = req.url; 
    var file = documentRoot + urls;
    fs.readFile( file , function(err,data){
        if(err){
            res.writeHeader(404,{
                'content-type' : 'text/html;charset="utf-8"'
            });
            res.write('<h1>404错误</h1><p>你要找的页面不存在</p>');
            res.end();
        }else{
            res.writeHead(200, { "Content-Type": getContentTypeByExt(ext) });
            res.write(data);
            res.end();
        }
    });
}).listen(8888);
console.log('服务器开启成功');