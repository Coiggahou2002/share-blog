# 布局

## display

- 默认 display 方式就是 flex 一种，没有 web 那么多(inline/block/inline-block/flex/grid)
- 默认的 flex-direction 是 column (在手机 app 上，这很正常)

## position

Web 的 position 属性取值：static/sticky/absolute/relative/fixed

RN 的 position 属性取值: relative/absolute

:::warning 注意
RN 中 absolute 的含义和 Web 中不同:
- Web 中 absolute 的含义是相对于**离其最近的 relative 父节点**来进行定位布局
- RN 中的 absolute 的含义是相对**直接父容器**来进行定位布局
:::