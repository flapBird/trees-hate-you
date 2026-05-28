# Trees Hate You

基于 Next.js 开发的 `treeshateyou.help` 粉丝站点，内置原版游戏嵌入页面，并提供基于 PostgreSQL 的玩家评论接口。

## 本地运行

```bash
npm install
cp .env.example .env.local
npm run dev
```

启动后访问：

```bash
http://localhost:3000
```

---

## 数据库配置

请在 `.env.local` 和 Vercel 项目的环境变量中配置 `DATABASE_URL`：

```bash
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DATABASE?sslmode=require"
```

项目中的接口：

```bash
POST /api/reviews
```

会在首次调用时自动创建 `reviews` 数据表（如果表不存在）。

数据库建表 SQL 也可以在以下文件中查看：

```bash
lib/schema.sql
```

---

## 部署到 Vercel

1. 将项目推送到 GitHub 仓库。
2. 在 Vercel 中导入该仓库。
3. 在 Project Settings > Environment Variables 中添加 `DATABASE_URL`。
4. 点击 Deploy 完成部署。

---

## 游戏嵌入说明

游戏 iframe 地址位于：

```tsx
app/home-page.tsx
```

当前配置：

```tsx
src="/trees-hate-you.embed.html"
```

如果后续更换了游戏 HTML 文件名，请同步修改该路径。
