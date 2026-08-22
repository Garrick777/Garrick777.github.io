# Gavin.github.io

Gavin 的个人技术档案与数字花园，展示独立开发、应用 AI、嵌入式系统、实证研究和技术辅导实践。

## Local Preview

这是一个无构建依赖的静态 GitHub Pages 站点。启动本地预览：

```bash
python3 -m http.server 4173
```

然后打开 `http://127.0.0.1:4173/index.html#home`。

## Publish

仓库名必须与 GitHub 用户名匹配：`Garrick777.github.io`。将 `main` 分支推送到远程后，GitHub Pages 从仓库根目录发布：

`https://garrick777.github.io/`

## Structure

- `index.html`：侧栏导航、个人时间线、Latest、Shelves、Series、Projects、About 和联系区。
- `css/`：`tokens.css` 设计令牌，`base.css` 基础重置，`layout.css` 页面布局，`components.css` 组件样式。
- `js/main.js`：中英文切换、主题持久化、项目筛选和目录状态。
- `data/`：原始项目与辅导内容资料，供后续内容整理参考。
- `docs/`：仅供维护者使用的设计与交接记录，不在网站中公开链接。

页面不依赖 npm、框架或构建工具；修改后直接用静态服务器验证即可。
