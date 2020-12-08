# vue-0

# node version : v8.9.4

config/index.js  23行    改为本地ip地址
package.json     8行    -host后面的ip地址改为本地ip地址   这样才能通过手机打开网址
打包网页端的时候屏蔽掉src/router/index.js里面的手机端路由地址


> A Vue.js project

# 项目开始
使用vue-cli进行安装
npm install -g vue-cli
vue init webpack

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
