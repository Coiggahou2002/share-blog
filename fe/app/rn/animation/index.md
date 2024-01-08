# RN 动画

## 是否原生支持

原生支持的动画有: opacity, transform(translate + rotate + scale)

其他类型（如字体大小变化、容器高度变化）都不能启动 useNativeDriver

## 文字变色

例如 Text 组件的 color 原本是不支持动画的，如何让文字有颜色渐变的效果？

架设我们需要一个从蓝色渐变到红色的文字, 我们使用两份字体，一个蓝色 + 默认定位，一个红色 + absolute定位，通过定位手段使两个字体放在重叠位，然后用一个 animValue 控制两个 opacityAnim，一个 0 到 1，一个 1 到 0

```tsx
// 动画总控值，取值范围 [0,1]
const animProgress = useRef(new Animated.Value(0));

// 原色文字透明度 1->0
const originColorOpacityAnim = animProgress.current.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
    extrapolate: 'clamp',
});
// 原色动画值，需要一个两端颜色相同的插值
const originColorFixedAnim = animProgress.current.interpolate({
    inputRange: [0, 1],
    outputRange: ['blue', 'blue'],
    extrapolate: 'clamp',
})
// 目标色文字透明度 0->1
const targetColorOpacityAnim = animProgress.current.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
    extrapolate: 'clamp',
});
// 目标色动画值，需要一个两端颜色相同的插值
const targetColorFixedAnim = animProgress.current.interpolate({
    inputRange: [0, 1],
    outputRange: ['red', 'red'],
    extrapolate: 'clamp',
})

<View>
    {/* 原色文字 */}
    <Animated.Text
        style={[styles.basicStyle, {
            color: originColorFixedAnim,
            opacity: originColorOpacityAnim,
        }]}>
        我是蓝色的
    </Animated.Text>

    {/* 目标色文字 */}
    <Animated.Text
        style={[styles.basicStyle, {
            position: 'absolute',
            color: targetColorFixedAnim,
            opacity: targetColorOpacityAnim,
        }]}>
        我是红色的
    </Animated.Text>
</View>
```

:::info
其实这个是最基本的 fadeIn/fadeOut 原理，例如 Web 中有两份渐变背景色，想要平滑过渡，也可以用这种手段
:::


## 文字大小变化

需要分需求讨论：

- 只需放大 + 不考虑溢出 + 以中心为原点放大： transform scale
- 只需放大 + 不以中心为原点：
    - 方案 1：transform scale + translateX/Y，其中 translateX/Y 的值用 Text 的 onLayout 拿到的 w 和 h 加上 scale 去算
    - 方案 2：fontSizeAnim + 非 nativeDriver 驱动
- 放大 + 溢出需要自动字体换行 ：fontSizeAnim + 非 nativeDriver 驱动

:::info
应该可以封装一个支持 transform-origin 的组件，有时间尝试一下
:::

## 列表项展开/收起

![](https://cjpark-1304138896.cos.ap-guangzhou.myqcloud.com/blog_img/rn_expand_collapse.gif)

这个属于解决方案级别的需求，涉及很多个方面：
- 箭头的旋转（例如展开向下，收起向右）
- 文字可能需要放大/缩小，颜色渐变，细体到粗体渐变
- 下方内容区域的进场和退场
  - 进场：内容区高度渐变 + 内容 fadeIn
  - 退场：内容区高度逐渐缩小 + 内容 fadeOut

## 手势拖拽

PanResponder + translateX/Y

