const http = require('http');
const httpProxy = require('http-proxy');
const url = require('url');

const proxy = httpProxy.createProxyServer({});

// 自定义主页 HTML，内置快捷按钮和输入框
const homeHtml = `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>我的专属代理中心</title>
    <style>
        body { font-family: Arial, sans-serif; background-color: #1e1e1e; color: #fff; text-align: center; padding: 50px 20px; }
        .container { max-width: 600px; margin: 0 auto; background: #2d2d2d; padding: 30px; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.3); }
        h1 { color: #4caf50; margin-bottom: 30px; }
        .input-group { margin-bottom: 25px; }
        input { width: 70%; padding: 12px; border: none; border-radius: 6px 0 0 6px; outline: none; font-size: 16px; }
        button { padding: 12px 20px; border: none; background: #4caf50; color: #fff; font-size: 16px; cursor: pointer; border-radius: 0 6px 6px 0; font-weight: bold; }
        button:hover { background: #45a049; }
        .quick-links { display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin-top: 20px; }
        .card { background: #3d3d3d; padding: 15px; border-radius: 8px; text-decoration: none; color: #fff; font-weight: bold; transition: 0.2s; border: 1px solid #555; }
        .card:hover { background: #4caf50; transform: translateY(-2px); }
    </style>
</head>
<body>
    <div class="container">
        <h1>🚀 我的专属代理中心</h1>
        
        <div class="input-group">
            <input type="text" id="targetUrl" placeholder="输入任意网址 (例如 https://...)">
            <button onclick="go()">冲！</button>
        </div>

        <p style="color: #aaa; font-size: 14px;">点击下方快捷键直达：</p>
        <div class="quick-links">
            <a class="card" href="javascript:nav('https://cloudmoon.com')">☁️ Cloud Moon</a>
            <a class="card" href="javascript:nav('https://youtube.com')">📺 YouTube</a>
            <a class="card" href="javascript:nav('https://poki.com')">🎮 Poki Games</a>
        </div>
    </div>

    <script>
        function go() {
            let val = document.getElementById('targetUrl').value;
            if(!val) return alert('请输入网址！');
            if(!val.startsWith('http')) val = 'https://' + val;
            window.location.href = window.location.origin + '/?target=' + encodeURIComponent(val);
        }
        function nav(url) {
            window.location.href = window.location.origin + '/?target=' + encodeURIComponent(url);
        }
    </script>
</body>
</html>
`;

const server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');

    const parsedUrl = url.parse(req.url, true);
    const targetUrl = parsedUrl.query.target;

    // 如果直接访问主页，没有带 ?target= 参数，就显示精美导航页
    if (!targetUrl || targetUrl === '') {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(homeHtml);
        return;
    }

    // 如果带了参数，就执行代理中转
    proxy.web(req, res, {
        target: targetUrl,
        changeOrigin: true
    }, (err) => {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Proxy Error: ' + err.message);
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Navigation proxy running on port ${PORT}`);
});
