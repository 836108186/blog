# 如何启用 Giscus 评论

[Giscus](https://giscus.app/) 是一个基于 GitHub Discussions 的开源评论系统。项目已经集成了对应的组件，只要按照下面的步骤配置仓库与环境变量，就可以在文章页展示评论区。

## 1. 为仓库开启 GitHub Discussions

1. 进入你的博客源码仓库，在 GitHub 的仓库页面中打开 **Settings → General → Discussions**。
2. 勾选 *Enable discussions for this repository*，然后点击 **Save**。
3. 在 Discussions 中创建一个新的分类（Category），例如 `Announcements` 或 `Blog Comments`，后续会用到它的 ID。

## 2. 在 giscus.app 生成配置

1. 访问 [giscus.app](https://giscus.app/) 并登录 GitHub。
2. 在 **Configuration** 区域选择刚刚启用 Discussions 的仓库。
3. 选择刚才创建的分类，映射方式推荐使用 `pathname`，其余选项按需勾选。
4. giscus 会生成四个关键字段：
   - `data-repo`
   - `data-repo-id`
   - `data-category`
   - `data-category-id`

## 3. 配置环境变量

在项目根目录已经提供了 `.env.example`，其中包含 giscus 所需的变量：

```bash
NEXT_PUBLIC_GISCUS_REPO="<owner>/<repo>"
NEXT_PUBLIC_GISCUS_REPOSITORY_ID="<repo-id>"
NEXT_PUBLIC_GISCUS_CATEGORY="<category-name>"
NEXT_PUBLIC_GISCUS_CATEGORY_ID="<category-id>"
```

将上一步得到的值填入 `.env.local`（或部署平台上的环境变量）中。开发环境下重新运行 `yarn dev`，giscus 即会读取这些变量。

## 4. 校准主题与语言

`data/siteMetadata.js` 中的 `comments` 配置已经设置 `provider: 'giscus'`，并指定了浅色与深色主题。我们在 `components/Comments.tsx` 中根据文章的语言自动调整 `lang`，当文章 `lang` 以 `zh` 开头时会使用 `zh-CN`，否则回退到英文界面。

如果需要自定义样式或语言，可以修改 `data/siteMetadata.js` 中的 `giscusConfig` 或在 `Comments` 组件里扩展额外的逻辑。

## 5. 部署注意事项

- `next.config.js` 已经在内容安全策略中允许 `giscus.app`，不需要额外配置。
- 如果在本地或生产环境中看不到评论，请确认：
  - 仓库已公开（Public），或你在 giscus.app 勾选了私有仓库访问权限；
  - 环境变量拼写正确，并在构建时可用；
  - 当前文章的 URL 在 GitHub Discussions 中尚未创建讨论时，需要先通过页面底部的评论框发起一次留言。

完成以上步骤后，刷新文章页面即可看到 GitHub Discussions 驱动的评论区。
