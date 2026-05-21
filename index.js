const url = require('url');

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
    <h1>🚀 专属全能代理（.COM 极速穿透通道）</h1>
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
            // 直接借用全球最强的公开免封锁 .com 网关
            window.location.href = "https://herokuapp.com" + encodeURIComponent(target);
        }
        function g(u) {
            window.location.href = "https://herokuapp.com" + encodeURIComponent(u);
        }
    </script>
</body>
</html>
`;

module.exports = (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(homeHtml);
};
