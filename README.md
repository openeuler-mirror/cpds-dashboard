## 介绍

cpds-dashboard 是为 CPDS(Container Problem Detect System)容器故障检测系统提供 web 页面的用户交互组件。
本组件从 cpds-analyzer(故障/亚健康诊断)组件中获取诊断结果数据，并以实时查看、离线查看的形式进行可视化诊断结果展示，便于容器集群运维人员进行分析与策略制定下发。

## 技术栈

Vite + Vue3 + Es6 + Element-plus + typescript + Pinia

### 环境说明

    node v16.18.0
    npm v6.14.6
    可以用其它版本node，但是建议使用node高版本的，确保能正常下载依赖

### 运行说明

    1. npm install -force
        下载相关依赖包的源
        注：下载过慢通过命令 'npm config set registry https://registry.npmmirror.com'设置淘宝源，或者通过yarn包管理器
    2. npm run dev
        在本地服务运行项目
    3. npm run build
        进行静态资源构建，构建目录名通过vite.config.ts文件build对象中的outDir字段进行修改
