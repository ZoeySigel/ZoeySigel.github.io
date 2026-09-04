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

## 替换个人内容

- `src/content/profile.ts`：姓名、简介、经历、项目、技术栈和社交链接。
- `public/avatar.jpg`：个人头像。
- `public/og-image.svg`：分享卡片。
- `src/app/layout.tsx` 与 `src/app/manifest.ts`：站点级 SEO 和应用信息。

仓库仅在构建期读取 GitHub 的公开贡献记录，不读取私人资料。替换占位邮箱时，同时检查
页面中是否仍有“待替换”标签。

## 添加产品

产品页面位于 `src/app/products/page.tsx`。获得可公开展示的产品资料后，可将当前空状态
替换为产品卡片；图片请保存到 `public/`，不要依赖运行时图片优化或服务器接口。

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
