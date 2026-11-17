# BAWSAQ 本地前端镜像

这是 `https://bawsaq.fund/` 的本地只读前端镜像，包含：首页、Explore、Goods、Launch、Ledger、Earnings、Docs、站点公开提供的受控 Admin 路由，以及抓取到的全部股票与币种详情路由。动态路由清单见 `runtime-routes.json`。

## 启动

Windows 双击 `start.bat`，或执行：

```powershell
npm start
```

浏览器打开 <http://127.0.0.1:4176>。

页面、脚本、样式、字体、股票图片和其他公开静态资源已放在 `mirror/`。浏览器实际读取的公开查询快照位于 `mirror/.query-cache/`；遗漏的公开 GET 资源会在联网访问时只读回源并缓存。所有 POST 等写请求均返回 403，不会广播交易、发行代币或修改原站数据。

原站未公开源码、数据库、密钥、钱包权限和私有后端不在公开前端镜像范围内。实时市场数据需要联网访问原站公开接口或前端中配置的公开数据服务。

## 刷新与检查

```powershell
npm run mirror
npm run check
```

需要 Node.js 18 或更高版本，无第三方 npm 依赖。
