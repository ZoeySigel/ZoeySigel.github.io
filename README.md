# ZoeySigel.github.io

一个面向招聘者与技术合作者的中文个人主页，包含个人介绍、经历、技术栈和产品页面。
项目基于 Next.js 16、Tailwind CSS 4 构建，通过 GitHub Actions 自动发布到 GitHub
Pages。

> 当前简介、经历、项目和联系方式均为醒目的占位内容。发布前请按照下面的清单替换。

## 本地开发

需要 Node.js 22 和 pnpm 10。

```bash
pnpm install
pnpm dev
```

打开 <http://localhost:1408>。提交前执行：

```bash
pnpm format:check
pnpm lint
pnpm check-types
pnpm build
```

`pnpm build` 会把完整静态站点写入 `out/`。构建后可运行 `pnpm preview` 检查与
GitHub Pages 接近的静态托管效果。

## 加载性能

中文使用系统字体，避免首屏下载大体积的中文网络字体；英文仍使用 Geist，
封面与拉绳提示保留像素、手写字体。自定义鼠标与拉绳效果在页面加载完成、
浏览器空闲时按设备能力加载，手机不加载隐藏的拉绳组件。
`package.json` 的 `pullcord>motion` override 让拉绳与站点共用同一版动画库，
升级依赖时需验证拉动切换主题、封面动画和折叠面板。

## 替换个人内容

- `src/content/profile.ts`：姓名、简介、经历、项目、技术栈和社交链接。
- `public/avatar.webp`：页面使用的头像（320 × 320，兼顾 2 倍屏）；
  `public/avatar.jpg` 保留原图，替换头像时请同步生成 WebP。
- `public/og-image.svg`：分享卡片。
- `src/app/layout.tsx` 与 `src/app/manifest.ts`：站点级 SEO 和应用信息。

仓库仅在构建期读取 GitHub 的公开贡献记录，不读取私人资料。请求最多尝试三次，
每次限时 10 秒，失败原因记录到构建日志。成功结果写入 `.cache/github-contributions`，
由 GitHub Actions 缓存供后续构建恢复；全新构建也可以使用
`src/content/github-contributions` 中的真实数据快照。只有校验完整的日历才会更新缓存。
请求失败时选择最新有效快照，并在页面标注同步日期。
可运行 `pnpm test:contributions` 验证重试、缓存和异常恢复。

替换占位邮箱时，同时检查
页面中是否仍有“待替换”标签。

## 添加产品

产品页面位于 `src/app/products/page.tsx`。获得可公开展示的产品资料后，可将当前空状态
替换为产品卡片；图片请保存到 `public/`，不要依赖运行时图片优化或服务器接口。

## 添加博客文章

博客列表位于 `/blog/`，文章详情位于 `/blog/[slug]/`。
在 `src/content/posts.tsx` 的 `POSTS` 数组中添加文章，填写稳定且唯一的 `slug`、
标题、摘要、日期（`YYYY-MM-DD`）、预计阅读分钟数、标签和 JSX 正文即可。
当前第一篇正式文章保存在 `src/content/posts/ai-coding-engineering.md`，
通过 `ArticleMarkdown` 在构建期渲染，支持表格、引用、列表和行内代码。
修改该 Markdown 文件即可更新正文；《算法学习》的正文保存在
`src/content/posts/algorithm-learning.md`，仅包含分类和题目链接。

### 算法题笔记

每道题旁边的“笔记”可展开对应内容。在 IDE 中编辑
`src/content/algorithm-notes/<题号>.md` 即可，例如 `1.md` 对应“两数之和”。
已为当前 100 道题创建空白文件，可直接写文字，也支持 Markdown 列表、链接和代码块。
本地运行 `pnpm dev`，保存笔记后刷新文章页面预览；提交推送后，笔记会随站点构建公开发布。
笔记文件不参与 Prettier 格式检查，末尾换行或排版差异不会阻止部署；代码格式检查仍保留。

`src/lib/posts.ts` 统一按日期倒序排列文章，首页开源参与下方自动显示最新两篇。
所有详情页和站点地图均在构建时生成，无需服务器或数据库。
添加文章后运行上述检查并推送到 `main`，GitHub Actions 会自动发布。

## GitHub Pages 部署

1. 在 GitHub 创建公开仓库 `ZoeySigel/ZoeySigel.github.io`。
2. 将本项目推送到 `main` 分支。
3. 打开仓库 **Settings → Pages**，将 Source 设为 **GitHub Actions**。
4. 推送会触发 `.github/workflows/pages.yml`；成功后访问
   <https://ZoeySigel.github.io/>。

Pull Request 会执行格式、Lint、类型和静态构建检查，但不会部署。也可以在 Actions
页面手动运行工作流。

### 常见问题

- 页面 404：确认仓库名大小写为 `ZoeySigel.github.io`，Pages Source 为 GitHub
  Actions。
- 资源加载失败：不要为这个用户主页仓库设置 `basePath`。
- 产品页打开 404：确认已重新执行 `pnpm build`，并检查 `out/products/index.html`。
- 部署失败：先在本地依次运行四项提交前检查，查看第一个失败命令。

## 来源与许可

信息架构最初参考开源项目 `My-Portfolio`，本站已重建为适配 GitHub Pages 的静态版本。
代码采用 [MIT License](./LICENSE)。
