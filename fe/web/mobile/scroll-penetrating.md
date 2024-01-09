# H5 滚动穿透问题

:::warning
未完成
:::

## 背景

在实现 H5 的 Popup 弹出层组件的时候，会遇到滑动蒙层，蒙层下方内容还能滚动的问题

## 几个传统的解决方案

### 方案 1 弹出时给 body 做手脚

方式：
- 添加 `position: fixed` 再回来，会丢失滚动进度, 需要手动记录再还原
- `overflow: hidden` 貌似在 iOS 是有问题的

### 方案 2 阻止蒙层的滚动事件

stop + prevent 蒙层的 touch 和 scroll 事件

缺点：在弹出层内容区滑动，还是能穿透

### 方案 3 阻止蒙层和弹出层的滚动事件

缺点：弹出层的内容本身也没法滚动了（适合弹出层里没有滚动内容的场景）

## 整合方案的库

可参考：[body-scroll-lock - npm](https://www.npmjs.com/package/body-scroll-lock)