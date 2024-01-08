# RN 开发需知原生知识

## 初始化 iOS RN 环境

### 1.需要的依赖 

- node
- watchman 监听文件改动的
- Xcode 跑 iOS 模拟器和项目
- CocoaPods 包管理器

```shell
brew install cocoapods
```

### cli 新建项目

```shell
npx react-native@latest init MyRnProject
```

### 安装 pod

```shell
cd ios
bundle install
bundle exec pod install
```

### 运行

```shell
cd MyRnProject
nvm use 18+
npm start
npm run ios
```

:::tip

如果是 Xcode 15 + iOS 17, 编译 iOS 遇到问题，可以试试把 Pod 都删掉再重装

```shell
cd MyRnProject
nvm use 18+
npm i # fetch all dependency to node_modules
bundle install
bundle exec pod deintegrate # delete all pods
bundle exec pod install     # reinstall pods
```
:::

## 依赖管理

无论是后台开发、前端开发还是 RN 开发，都有对应的依赖管理模式：
- Golang 的依赖管理是原生自带的，如 `go install`
- Web 前端的依赖管理器一般是 npm/yarn/pnpm

CocoaPods 是 iOS 开发领域中的包管理器, 相当于 npm 的角色

`Podfile` 相当于前端开发的 `package.json`, 用 CocoaPods 官网的原话来讲：

> The Podfile is a specification that describes the dependencies of the targets of one or more Xcode projects. The file should simply be named Podfile.

`pod install` 相当于 Web 领域的 `npm install`

例如，在需要把 React Native 集成到 iOS App 时，我们会需要 pod install 一堆 RCT 开头的组件，如:
- React-RCTImage
- React-RCTView
- React-RCTAppDelegate
- React-RCTText
- React-RCTLinking
- React-RCTVibration
- ...



### 添加依赖

我们添加依赖，一般都是去找一个 npm 包，然后 npm install xxx

在 RN 开发中，如果需要安装的包是需要依赖原生组件实现的话（例如 react-native-linear-gradient）, 就需要 npm 安装完之后到原生目录下走一波 pod install

例如

```shell
cd MyRnProject
npm i react-native-linear-gradient
cd ios
bundle exec pod install
```

会看到控制台输出安装了 BVLinearGradient
```
Downloading dependencies
Installing BVLinearGradient (2.8.3)
Generating Pods project
```

## RCTRootView

承载 RN 界面的根容器

我们用 TS/JS 写的所有组件代码在映射到虚拟 DOM 之后，会再映射到对应的原生组件，例如：
- RCTImage
- RCTText
- RCTView

这些组件最终都会跑在原生 App 的 RCTRootView 根容器中, 例如我们从 Lookin 中也可以看到

![](https://cjpark-1304138896.cos.ap-guangzhou.myqcloud.com/blog_img/202401072102957.png)