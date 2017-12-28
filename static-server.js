const http = require('http');
const path = require('path');
const fs = require('fs');
var url = require("url");
const config = require('./config/default');
const hasTrailingSlash = url => url[url.length - 1] === '/';
class StaticServer {
	constructor() {
		this.port = config.port;
		this.root = config.root;
		this.indexPage = config.indexPage;
	}
    respondNotFound(req, res) {
    	res.writeHead(404, {
    		'Content-Type': 'text/html'
    	});
    	res.end(`<h1>Not Found</h1><p>The requested URL ${req.url} was not found on this server.</p>`);
    }

    respondFile(pathName, req, res) {
    	const readStream = fs.createReadStream(pathName);
    	readStream.pipe(res);
    } 

   respondRedirect(req, res) {
        const location = req.url + '/';
        res.writeHead(301, {
            'Location': location,
            'Content-Type': 'text/html'
        });
        res.end(`Redirecting to <a href='${location}'>${location}</a>`);
    }

    respondDirectory(pathName, req, res) {
        const indexPagePath = path.join(pathName, this.indexPage);
        if (fs.existsSync(indexPagePath)) {
            this.respondFile(indexPagePath, req, res);
        } else {
            fs.readdir(pathName, (err, files) => {
                if (err) {
                    res.writeHead(500);
                    return res.end(err);
                }
                const requestPath = url.parse(req.url).pathname;
                let content = `<h1>Index of ${requestPath}</h1>`;
                files.forEach(file => {
                    let itemLink = path.join(requestPath,file);
                    const stat = fs.statSync(path.join(pathName, file));
                    if (stat && stat.isDirectory()) {
                        itemLink = path.join(itemLink, '/');
                    }                 
                    content += `<p><a href='${itemLink}'>${file}</a></p>`;
                });
                res.writeHead(200, {
                    'Content-Type': 'text/html'
                });
                res.end(content);
            });
        }
    }
	routeHandler(pathName, req, res) {
        fs.stat(pathName, (err, stat) => {
            if (!err) {
                const requestedPath = url.parse(req.url).pathname;
                if (hasTrailingSlash(requestedPath) && stat.isDirectory()) {
                    this.respondDirectory(pathName, req, res);
                } else if (stat.isDirectory()) {
                    this.respondRedirect(req, res);
                } else {
                    this.respondFile(pathName, req, res);
                }
            } else {
                 console.log(err);
                 console.log(stat);
                this.respondNotFound(req, res);
            }
        });
    }

	start() {
		http.createServer((req, res) => { // 它设置请求方法为 GET 且自动调用 req.end()； 返回http server实例
			const pathName = path.join(this.root, path.normalize(req.url)); //  方法使用平台特定的分隔符把全部给定的 path 片段连接到一起，并规范化生成的路径。
			// path.normalize() // 方法会规范化给定的 path   == location.pathname
			// res.writeHead(200); // 状态码
			console.log(pathName);
			// res.end(`Requeste path: ${pathName}`); // 模板字符串（template string）是增强版的字符串，用反引号（`）标识。它可以当作普通字符串使用，也可以用来定义多行字符串，或者在字符串中嵌入变量。
			   this.routeHandler(pathName, req, res);
			}).listen(this.port, err => {  // 开启HTTP服务器监听连接
				if(err) {
					console.error(err);
					console.info('Filed to start server');
				} else {
					console.info(`Server started on port ${this.port}`);
				}
			});
	    }
}

module.exports = StaticServer;
