# 如何画一条一像素的线?


## 话题起源 -> 手机多倍屏

说到这个话题，那有很多小伙伴就要问了，不是很简单吗？这样就可以了呀

```scss
border: 1px solid #000;
```

哈哈，小朋友你太天真啦～

现在的手机很多都是多倍屏，什么叫多倍屏呢？

我们知道，CSS 里的单位 px 表示的是逻辑像素，`1px` 表示的就是逻辑上的 1 个像素

但是有些疯狂的手机厂商，他想要把自己的屏幕做得很清晰，于是就往自家品牌的手机屏幕上塞了很多很多像素, 例如:
- 用 3✖️3=9 个像素去表示原来 1 个像素方块能表示的面积，叫 3 倍屏
- 用 2✖️2=4 个像素去表示原来 1 个像素方块能表示的面积，叫 2 倍屏
- 一倍屏就是一倍屏，不解释啦

这时候脾气暴躁的设计哥哥就要出来说：我不管你怎么搞的，我要你画一条真正只有 1 个**物理像素**宽度的线 😠

但是我们苦逼的切图仔，在写 CSS 的时候只能写逻辑像素，所以我们要搞一些骚操作，把这条物理像素为 1px 的线画出来


## 如何画出来?

:::tip TL;DR
扩张宽度高度时 border-width 不会变，用宽度和高度把盒子扩大 k 倍，再 scale 缩小 k 倍 (k 为多倍屏的倍数，如 3 倍屏就是 k = 3)
:::

按照惯例, 我们先画一个方块 div

:::code-group
```css [index.css]
#box {
    width: 200px;
    height: 200px;
    background-color: rgba(0,0,0,0.2);
}
```

```html [index.html]
<div id="box"></div>
```
:::

![](https://cjpark-1304138896.cos.ap-guangzhou.myqcloud.com/blog_img/one-pixel-step1.png)


此时我们拥有了一个盒子, 也仅仅是一个盒子

我们给盒子搞一个替身，方法很简单，加个子 div，相对于 box 来定位

:::code-group
```css:line-numbers{7-15} [index.css]
#box {
    width: 200px;
    height: 200px;
    position: relative;
    background-color: rgba(0,0,0,0.2);
}
#son {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    /* 为了看得清楚层叠关系，加个红色透明度 */
    background-color: rgba(255,0,0,0.2); 
}
```

```html:line-numbers{2} [index.html]
<div id="box">
    <div id="son"></div>
</div>
```
:::

替身已经完成，此时这个子 div 完全覆盖在 box 上面了

![](https://cjpark-1304138896.cos.ap-guangzhou.myqcloud.com/blog_img/one-pixel-step2.png)

然后我们给子 div 加上边框，把宽高放大 3 倍

:::code-group
```css:line-numbers{11-12,14-15} [index.css]
#box {
    width: 200px;
    height: 200px;
    background-color: rgba(0,0,0,0.2);
    position: relative;
}
#son {
    position: absolute;
    top: 0;
    left: 0;
    width: 300%;
    height: 300%;
    background-color: rgba(255,0,0,0.2); 
    border-style: solid;
    border-color: blue; /* 蓝色边框 */
}
```

```html [index.html]
<div id="box">
    <div id="son"></div>
</div>
```
:::

![](https://cjpark-1304138896.cos.ap-guangzhou.myqcloud.com/blog_img/one-pixel-step3.png)

这时候我们可以发现，虽然宽高变成了原来的三倍，但是边框是没有变粗的，也就是说，目前的边框，宽度是 1 个逻辑像素，也就是 3 个物理像素

那办法就来了，我们用 transform scale 给他缩小到原来的 1/3 试试看呢？

:::code-group
```css:line-numbers{16} [index.css]
#box {
    width: 200px;
    height: 200px;
    background-color: rgba(0,0,0,0.2);
    position: relative;
}
#son {
    position: absolute;
    top: 0;
    left: 0;
    width: 300%;
    height: 300%;
    background-color: rgba(255,0,0,0.2); 
    border-style: solid;
    border-color: blue; /* 蓝色边框 */
    transform: scale(.3333333);
}
```

```html [index.html]
<div id="box">
    <div id="son"></div>
</div>
```
:::

![](https://cjpark-1304138896.cos.ap-guangzhou.myqcloud.com/blog_img/one-pixel-step4.png)


完成之后你会发现，替身跑了，不再覆盖在 box 上面了，这是因为 transform 变换的默认中心点是 center，我们将 transform-origin 改一下就好了

```css:line-numbers{10}
#son {
    position: absolute;
    top: 0;
    left: 0;
    width: 300%;
    height: 300%;
    border-style: solid;
    border-color: blue;
    transform: scale(.333333);
    transform-origin: 0 0;
}
```

![](https://cjpark-1304138896.cos.ap-guangzhou.myqcloud.com/blog_img/one-pixel-step5.png)

这时候，我们把替身的背景色去掉(代码略)，其实目的已经达成了，如果视力正常的话，我们可以看到有一根超细的边框

![](https://cjpark-1304138896.cos.ap-guangzhou.myqcloud.com/blog_img/one-pixel-step6.png)

边框都画出来了，1px 的线还不简单吗？

:::tip
把其他任意三条边的宽度设为 0，就只剩一侧边框了嘛～
:::

## 优化

从上面的步骤可见，要给指定的容器画一个 1 物理像素宽的边框，我们需要：
- 画一个替身容器
- 给替身容器加 1 逻辑像素的边框
- 将替身容器的宽、高放大 k 倍 (k 为多倍屏的倍数)
- 用 transform scale 将替身缩小到原来的 1/k

虽然很完美，但是其实有一个 DOM 结构的耦合——我想给谁添加 1 像素边框，我必须给他添加一个子 div

其实，我们的“替身容器”可以用伪元素来做，就能解决上面这个问题

```scss
#box {
  margin: 20px;
  height: 200px;
  width: 200px;
  background-color: rgba(0,0,0,0.2);
  position: relative;
  &::after {
    border-color: blue;
    border-style: solid;
    width: 300%;
    height: 300%;
    position: absolute;
    top: 0;
    left: 0;
    transform: scale(0.33333333333);
    transform-origin: 0 0;
    content: '';
  }
}
```

## 完善

其实之前一直有个缺漏，其实我们还得事先知道是 1 倍屏、2 倍屏、还是 3 倍屏

这里有个现成的解决方案, 套上去就行

```scss
/// 适配多倍屏的 CSS 选择器
///
/// @group 设备适配
/// @name screenResolution
/// @param {Number} $num - 需要适配的屏幕倍数
@mixin screenResolution($num) {
    @media (-webkit-min-device-pixel-ratio: $num), (min--moz-device-pixel-ratio: $num), (min-device-pixel-ratio: $num), (min-resolution: #{$num}dppx), (min-resolution: #{$num * 96}dpi) {
        @content;
    }
}
```

使用的时候:

```scss
@include screenResolution(2) {
    // 替身的宽高变成原来2倍，再scale到原来1/2
}
@include screenResolution(3) {
    // 替身的宽高变成原来3倍，再scale到原来1/3
}
```

## 封装

补上圆角、方向、颜色等属性，我们将这个能力用 sass mixin 的方式封装成可复用的片段

:::info
- 圆角其实很好处理，如果需要 12px 的圆角，3 倍屏的时候就设成 36px 然后再 scale 回到 1/3 就是 12px，2 倍屏同理
- 方向就是四个边框可以选择不要其中几个，不要的那侧把宽度设为 0 就可以
:::

```scss
// borderStyleForOnePixel 是 onePixelBorder 内部使用的方法
@mixin borderStyleForOnePixel($direction: all, $color:#dedede) {
    border-style: solid;
    border-color: $color;
    @if $direction == all {
        border-width: 1px;
    } @else if $direction == top {
        border-width: 1px 0 0 0;
    } @else if $direction == bottom {
        border-width: 0 0 1px 0;
    } @else if $direction == left {
        border-width: 0 0 0 1px;
    } @else if $direction == right {
        border-width: 0 1px 0 0;
    } @else if $direction == horizontal {
        border-width: 0 1px;
    } @else if $direction == vertical {
        border-width: 1px 0;
    } @else if $direction == none {
        border-width: 0;
    }
}

@mixin onePixelBorder($direction: all, $color: $common_color_border, $position: outside, $borderRadius: 0, $borderStyle: solid, $offset: 0) {
    @include borderStyleForOnePixel($direction, $color);
    border-radius: $borderRadius;
    border-style: $borderStyle;
    @include screenResolution(2) {
        position: relative;
        border: 0;
        &:after {
            content: "";
            position: absolute;
            top: 0;
            left: $offset;
            @if $offset == 0 {
                width: 200%;
            } @else {
                width: calc(200% - #{$offset * 2 * 2});
            }
            height: 200%;
            border-radius: $borderRadius * 2;
            @include borderStyleForOnePixel($direction, $color);
            border-style: $borderStyle;
            transform: scale(.5);
            transform-origin: 0 0;
            @if $position == inside {
                box-sizing: border-box;
            }
            pointer-events: none;
        }
    }
    @include screenResolution(3) {
        &:after {
            @if $offset == 0 {
                width: 300%;
            } @else {
                width: calc(300% - #{$offset * 3 * 2});
            }
            height: 300%;
            border-radius: $borderRadius * 3;
            transform: scale(math.div(1, 3));
        }
    }
}
```


