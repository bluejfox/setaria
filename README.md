# Setaria

> FrontEnd SPA Enterprise Framework

## 开发所需软件

1. NodeJS
> 用于安装项目所需的第三方依赖包和在本地进行前端的开发与调试。

  [安装包下载地址](https://nodejs.org/zh-cn/download/)
  [安装说明](http://www.runoob.com/nodejs/nodejs-install-setup.html)

``` bash
1.使用国内镜像
npm config set registry https://registry.npm.taobao.org
// 配置后可通过下面方式来验证是否成功
npm config get registry
```

2. Git
> 版本管理工具。用于下载项目的代码和在开发时进行代码和文档的版本管理。

  [安装说明](https://git-scm.com/book/zh/v2/%E8%B5%B7%E6%AD%A5-%E5%AE%89%E8%A3%85-Git)

## 安装步骤
``` bash
# 下载工程到本地
git clone https://github.com/bluejfox/setaria.git
# 进入工程目录
cd setaria
# 安装项目依赖
npm install
```
## 浏览器支持
支持各种主流浏览器(Chrome, Firefox, Safari)和Internet Explorer 9+.

## 依赖包列表
* [vue](https://github.com/vuejs/vue)
* [axios](https://github.com/mzabriskie/axios)
* [lodash](https://lodash.com/)
* [moment](https://momentjs.com/)
* [vue-router](https://github.com/vuejs/vue-router)
* [vuex](https://github.com/vuejs/vuex)

## 开发前需要掌握的知识
* [ES6](http://es6.ruanyifeng.com/)

## ToDo

### 公共模块
- [ ] 鉴权
- [ ] 消息处理
- [ ] 服务调用
- [ ] 异常处理
- [ ] 路由处理
- [ ] 数据存储管理
- [ ] 用户状态管理

## License
MIT
