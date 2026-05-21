const http = require('http');
const httpProxy = require('http-proxy');
const url = require('url');

const proxy = httpProxy.createProxyServer({});

const homeHtml = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>我的全能秘密大厅</title>
    <style>
        body { font-family: Arial; background: #111; color: #fff; text-align: center; padding-top: 100px; }
        input { width: 60%; padding: 12px; font-size: 16px; border-radius: 6px; border: none; }
        button { padding: 12px 20px; font-size: 16px; background: #28a745; color: white; border: none; border-radius: 6px; cursor: pointer; margin-left: 10px; }
        .btn-zone { margin-top: 30px; display: flex; justify-content: center; gap: 20px; }
        .card { padding: 15px 25px; background: #222; border: 1px solid #444; color: #fff; text-decoration: none; border-radius: 8px; font-weight: bold; }
        .card:hover { background: #28a745; }
    </style>
</head>
<body>
    <h1>🚀 专属全能代理（Vercel 极速通道）</h1>
    <input type="text" id="url" placeholder="在这里输入任何想去的网址...">
    <button onclick="launch()">直达</button>
    <div class="btn-zone">
        <a class="card" href="javascript:g('https://cloudmoon.com')">Cloud Moon</a>
        <a class="card" href="javascript:g('https://youtube.com')">YouTube</a>
        <a class="card" href="javascript:g('https://poki.com')">Poki Games</a>
    </div>
    <script>
        function launch() {
            let target = document.getElementById('url').value;
            if(!target) return;
            if(!target.startsWith('http')) target = 'https://' + target;
            window.location.href = window.location.origin + '/?target=' + encodeURIComponent(target);
        }
        function g(u) {
            window.location.href = window.location.origin + '/?target=' + encodeURIComponent(u);
        }
    </script>
</body>
</html>
`;

// 导出供 Vercel Serverless 环境直接调用的函数
module.exports = (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');

    const parsedUrl = url.parse(req.url, true);
    const targetUrl = parsedUrl.query.target;

    // 如果直接访问主页，显示导航页
    if (!targetUrl) {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(homeHtml);
        return;
    }

    // 动态代理中转
    proxy.web(req, res, {
        target: targetUrl,
        changeOrigin: true,
        followRedirects: true // 自动追踪重定向，防止大网站报错
    }, (err) => {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Proxy Error: ' + err.message);
    });
};
