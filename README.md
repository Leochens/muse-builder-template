# Muse Builder Template Monorepo

这个仓库包含 Muse Builder 的所有模板和 CLI 工具。

## 目录结构

*   **`templates/`**: 存放各种应用模板。
    *   `next-prisma`: 基于 Next.js + Prisma + Supabase 的全栈模板。
*   **`create-muse-app/`**: 脚手架 CLI 工具源码。

## 开发指南

### 修改 CLI 工具
```bash
cd create-muse-app
npm install
npm run dev
```

### 修改模板
进入 `templates` 下对应的目录即可像普通项目一样开发。
