# cpds-dashboard

### Description

The cpds-dashboard is a user interaction component that provides web pages for the ContainerProblemDetectSystem (CPDS).

This component obtains the diagnosis result from the cpds-analyzer component(the Fault/Sub-Health Diagnosis component of CPDS) and displays the visual diagnosis results in real-time or offline. This helps the cluster O&M analyze the data, formulate and deliver policies.

### Technology stack

- Vite
- Vue3
- Es6
- Element-plus

### Environment description

node v16.18.0
npm v6.14.6
Other versions of node can be used, but it is recommended to use a higher version of node to ensure that dependencies can be downloaded properly

### Installation and use

1.  Get the project code

```
git clone https://gitee.com/openeuler/cpds-dashboard.git
```

2.  Installation dependencies

```
cd cpds-dashboard
npm install
```

note: If the dependency download is slow, run the following command to switch to the Taobao source

```
npm config set registry https://registry.npmmirror.com
```

3. run

```
<!-- run with development configuration -->
npm run dev
<!-- run with production configuration -->
npm run pro
```

4.build

```
<!-- build with development configuration -->
npm run build:dev
<!-- build with production configuration -->
npm run build:pro
```

5.Code review

This project incorporates code review tools that automatically reviews code when you are committing

you can also excute following command for code review:

```
<!-- use eslint to check code -->
npm run lint
<!-- use prettier to format the code -->
npm run format
<!-- use stylelint to format the style -->
npm run lint:style
```

### Browser support

This project theory supports the use of the following versions and later versions of the browser

| Edge      | Firefox      | Chrome      | Safari      |
| --------- | ------------ | ----------- | ----------- |
| Edge ≥ 79 | Firefox ≥ 78 | Chrome ≥ 64 | Safari ≥ 12 |

> Since Vue 3 no longer supports IE11, this project will no longer support IE either. Tested Browser: Chrome 107.0.5304.110

### Contribution

You can [Raise an issue](https://gitee.com/openeuler/cpds-dashboard/issues/new) Or submit a Pull Request.

**Pull Request:**

1. Fork the repository
2. Create Feat_xxx branch
3. Commit your code
4. Create Pull Request
