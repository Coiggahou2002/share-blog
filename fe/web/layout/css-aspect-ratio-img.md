# CSS 实现指定宽高比图片

## 方法

可以使用 CSS 中的 padding 和 background-image 属性来实现固定宽高比例的图片。

首先，需要在 HTML 中创建一个容器元素，例如 div，然后设置其宽度和 padding-bottom 属性。

将 padding-bottom 属性的值，根据需要的宽高比，设置成容器宽度的百分比，就可以保证容器的高度与宽度成固定比例。

接着，可以在容器元素中使用 background-image 属性来设置图片。需要将图片的 URL 设置为 background-image 属性的值，并将 background-size 属性设置为 cover，这样可以保证图片填充整个容器，并保持固定的宽高比例。

:::warning
需要注意的是，这种方法只适用于固定宽高比例的图片。如果图片的宽高比例不固定，可能会出现变形或裁剪的情况。
:::

## 依据

[padding - CSS: Cascading Style Sheets | MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/padding#syntax)

当 padding 值使用百分比数值时，相对的是容器的宽度(100%)

## 示例代码

:::code-group
```html [index.html]
<div class="image-container">
  <!-- 空元素，用于设置宽高比例 -->
</div>
```

```css [index.css]
.image-container {
  width: 100%;
  padding-bottom: 75%; /* 宽高比例为 4:3 */
  background-image: url('path/to/image.jpg');
  background-size: cover;
}
```
:::