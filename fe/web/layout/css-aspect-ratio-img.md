# CSS 实现指定宽高比图片

## 需求怎么来的？

这种需求其实很常见，例如在一个活动 h5 里面，设计给了我们一张 banner 图，假设这张图的原图宽是400px，高是800px，要求宽度铺满手机屏幕，固定在屏幕最顶部，而且高度保持是宽度的两倍

例如这种图：

![](https://cjpark-1304138896.cos.ap-guangzhou.myqcloud.com/blog_img/img_head@3x%204.png)

这时候最简单的方法是：我们给他宽度设置为 `100vw`，然后高度为 `200vw`（按照高：宽的倍数来）

这时候设计说：方案改了，外面套个装饰容器，这时候，我们就不能用 vw 的方法了

## 方法

可以使用 CSS 中的 `padding` 和 `background-image` 属性来实现固定宽高比例的图片。

首先，需要在 HTML 中创建一个容器元素，例如 div，然后设置其宽度和 `padding-bottom` 属性。

将 `padding-bottom` 属性的值，根据需要的宽高比，设置成容器宽度的百分比，就可以保证容器的高度与宽度成固定比例。

接着，可以在容器元素中使用 `background-image` 属性来设置图片, 并将 background-size 属性设置为 cover，这样可以保证图片填充整个容器，并保持固定的宽高比例。

:::warning
需要注意的是，这种方法只适用于固定宽高比例的图片。如果图片的宽高比例不固定，可能会出现变形或裁剪的情况。
:::

## 依据

[padding - CSS: Cascading Style Sheets | MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/padding#syntax)

当 padding 值使用百分比数值时，相对的是容器的宽度(100%)

## 示例代码

:::code-group
```css [index.css]
.image-container {
  width: 100%;
  padding-bottom: 75%; /* 宽高比例为 4:3 */
  background-image: url('path/to/image.jpg');
  background-size: cover;
}
```

```html [index.html]
<div class="image-container">
  <!-- 空元素，用于设置宽高比例 -->
</div>
```
:::