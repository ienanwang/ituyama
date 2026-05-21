const http = require('http');
const httpProxy = require('http-proxy');

// 创建代理服务集群
const proxy = httpProxy.createProxyServer({});

const server = http.createServer((req, res) => {
    // 开启跨域允许，防止学校电脑浏览器拦截请求
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');

    // 设置你默认想要代理中转的目标（比如某个合法的学术镜像或搜索服务）
    const targetUrl = 'https://www.google.com'; 

    proxy.web(req, res, {
        target: targetUrl,
        changeOrigin: true
    }, (err) => {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Proxy Error: ' + err.message);
    });
});

// 动态绑定云端端口
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Your private custom proxy running on port ${PORT}`);
});
