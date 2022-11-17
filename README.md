# cpds-dashboard

### 介绍
cpds-dashboard是为CPDS(Container Problem Detect System)容器故障检测系统提供web页面的用户交互组件。

本组件从cpds-analyzer(故障/亚健康诊断)组件中获取诊断结果数据，并以实时查看、离线查看的形式进行可视化诊断结果展示，便于容器集群运维人员进行分析与策略制定下发。

### 技术栈
- Vite
- Vue3
- Es6
- Element-plus
### 安装和使用

1.  获取代码
```
git clone https://gitee.com/openeuler/cpds-dashboard.git
```
2.  安装依赖
```
cd cpds-dashboard
npm install
```
3. 运行
```
npm run dev
```
### 浏览器支持

本项目理论支持以下版本及更高版本的浏览器使用

| Edge      | Firefox      | Chrome      | Safari      |
| --------- | ------------ | ----------- | ----------- |
| Edge ≥ 79 | Firefox ≥ 78 | Chrome ≥ 64 | Safari ≥ 12 |

> 由于 Vue 3 不再支持 IE11，本项目也不再支持 IE 浏览器。测试浏览器：Chrome 107.0.5304.110

### 参与贡献

你可以[提一个 issue](https://gitee.com/openeuler/cpds-dashboard/issues/new) 或者提交一个 Pull Request。

**Pull Request:**

1.  Fork 本仓库
2.  新建 Feat_xxx 分支
3.  提交代码
4.  新建 Pull Request