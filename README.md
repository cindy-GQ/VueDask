# VueDask - Web 音乐播放器

基于 Vue 3 + TypeScript + Vite 的轻量级 Web 音乐播放器。

## 技术栈

- Vue 3（`<script setup>` 组合式 API + TypeScript）
- Vite
- Pinia（Setup Store 风格）
- Vue Router 4
- Tailwind CSS + Lucide Icons（`lucide-vue-next`）
- Axios
- Vitest + Vue Test Utils

## 快速开始

```bash
npm install
npm run dev
```

启动后访问 http://localhost:5173

## 常用脚本

| 命令 | 说明 |
| --- | --- |
| `npm run dev` | 启动开发服务器 |
| `npm run build` | 类型检查并构建生产包 |
| `npm run preview` | 预览构建产物 |
| `npm run type-check` | 运行 TypeScript 类型检查 |
| `npm run test` | 以监听模式运行单元测试 |
| `npm run test:run` | 单次运行单元测试 |

## 目录结构

```
src/
├── api/          # Axios 封装与接口定义
├── assets/       # 静态资源与全局样式
├── components/   # 组件库（common / layout / player / lyric）
├── composables/  # 可复用业务逻辑（useAudioPlayer、useLyric）
├── mock/         # 本地 Mock 数据
├── router/       # 路由配置
├── stores/       # Pinia 状态树（player、song）
├── types/        # TypeScript 类型声明
├── utils/        # 工具函数（lrcParser、formatTime）
└── views/        # 页面视图（home、playlist-detail、search）
```
