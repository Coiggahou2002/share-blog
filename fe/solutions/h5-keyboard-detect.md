# 如何在 H5 中检测键盘弹起

## 背景

在 H5 的页面布局中，总有少数元素为了固定位置，使用的 fixed 布局，如：
- 在一些活动型 H5 中，悬浮的 UI 元素
- 在表单型 H5 中，底部的提交按钮使用 fixed 钉在页面最下方，位于内容的上层

如果 H5 中有需要填写表单的地方，用户一旦开始输入，就会拉起手机键盘，需要注意的是，Android 和 iOS 系统 Webview 中拉起键盘的表现是不一样的：
- 在 Android 的 Webview 中拉起键盘，键盘会挤压网页，使得网页的长度变短
- 在 iOS 的 Webview 中拉起键盘，键盘会浮在页面上方，网页的长度不变

![Android](https://cjpark-1304138896.cos.ap-guangzhou.myqcloud.com/blog_img/android-keyboard-h5.png)

![iOS](https://cjpark-1304138896.cos.ap-guangzhou.myqcloud.com/blog_img/ios-keyboard-h5.png)


## 需要解决的问题

基于这个事实，在安卓手机上就会出现一个问题：

fixed 布局的元素在键盘拉起挤压页面长度时，会在本就有限的视口里遮挡用户的视线。

例如，在一个表单 H5 中，提交按钮是 fixed 在页面底部的（为了让用户明显地感知到如何提交表单），当用户尝试在其中的某些 Field 进行输入时，键盘会被拉起，页面长度变短之后，此时按照原本的布局逻辑，提交按钮是应该「fixed 在页面底部」，所以就会表现为**按钮跟着键盘被顶起来**的现象。

## 解决方案

核心思路：要能够检测到键盘拉起，在拉起后执行回调，改变那些 fixed 元素的布局，让他们不再遮挡视线

### 方案 1 监听输入框的 focus 和 blur 事件

监听输入框的 focus 和 blur 事件, 每当 focus 认为键盘被拉起，每当 blur 时认为键盘被放下，在事件回调中改变布局

```js
inputDOM.addEventListener('focus', e => {
    // 将 fixed 元素的布局方式改变成不遮挡视线
});

inputDOM.addEventListener('blur', e => {
    // 改回 fixed 方式
})
```

**此方案的依据：**「拉起键盘」这个行为基本上只能由输入框的聚焦事件触发，所以将「focus 事件」等价于「键盘拉起」

**此方案存在的问题：**「收起键盘」这个行为是可以独立进行的，并不等价于「blur 事件」（如在输入状态下，用户从输入法收起键盘，H5 中的输入框并没有失去焦点）


### 方案 2 监听 VisualViewport 的 Resize 事件

浏览器提供了一个叫作 [VisualViewport](https://developer.mozilla.org/en-US/docs/Web/API/VisualViewport) 的 API

```ts
const useKeyboard = () => {
    if (process.server) {
        return {
            isKeyboardOpen: false
        };
    }
    const MIN_KEYBOARD_HEIGHT = 300;
    const supportVisualViewport = window && window.visualViewport;
    if (!supportVisualViewport) {
        return {}
    }
    const isKeyboardOpen = ref(false);
    const handler = (event: UIEvent) => {
        const heightExcludingKeyboard = event.target.height;
        const screenHeight = window.screen.height;
        const possibleKeyboardHeight = screenHeight - heightExcludingKeyboard;
        isKeyboardOpen.value = possibleKeyboardHeight >= MIN_KEYBOARD_HEIGHT;
    }
    onMounted(() => {
        window.visualViewport?.addEventListener('resize', handler);
    });
    onUnmounted(() => {
        window.visualViewport?.removeEventListener('resize', handler);
    });
    return {
        isKeyboardOpen
    }
};

export default useKeyboard;
```

## 相关概念

### 视觉视口 Visual Viewport

**定义：** 应用窗口内用户能看到的部分

双指缩放、拉起和放下键盘、URL 栏出现和消失，都会改变 Visual Viewport 的大小

这里摘抄[Web Viewports Explainer](https://github.com/bokand/bokand.github.io/blob/master/web_viewports_explainer.md)中的话：

> This is the region of the web page currently visible in the application window. When the user pinch-zooms in, the visual viewport size shrinks. When the on-screen keyboard appears, its height is reduced. When the mobile URL bar hides, the visual viewport's height is increased.


### 固定视口 Fixed Viewport

也称布局视口(Layout Viewport)

> This is the rect to which position: fixed elements attach to and get their size from.

如果有一个紧贴四边的 fixed 元素，那么这个元素的边界构成的区域就是固定视口

```css
#elem {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
```

例如，移动开发经常用到的一行 meta 标签，它的作用:
- `width=device-width` 让 Fixed Viewport 的宽度等于设备的宽度
- 后面三个属性配合使得不允许用户手动缩放

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
```

## 参考

[布局视口，视觉视口，理想视口 - 知乎](https://zhuanlan.zhihu.com/p/427507738)

[Web Viewports Explainer](https://github.com/bokand/bokand.github.io/blob/master/web_viewports_explainer.md)