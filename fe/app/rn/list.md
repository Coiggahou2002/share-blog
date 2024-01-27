# 长列表

## 组件

### ScrollView
- 没有虚拟列表机制

### VirtualizedList
- 是 FlatList 和 SectionList 的底层实现

### FlatList
- 支持 scrollToOffset, scrollToItem, scrollToIndex 多种定位方式

### SectionList
- 仅支持 scrollToLocation 定位（sectionIndex + itemIndex）

:::tip
其实 SectionList 也支持 scrollToOffset，只要将 sectionIndex 和 itemIndex 都给 0，然后把 offset 全加在 viewOffset 上面就可以了
:::

## 一个列表视图可能涉及的话题

**如果有数据源：**
- 需要封装一个 ListDataProvider
- Loading 态
- Error 态 + reload 方法
- Empty 态

**如果还支持动态加载：**
- Load More 逻辑

**如果支持刷新逻辑：**
- Pulldown Refresh

**若需要支持锚点定位：**
- 需要渲染层持有完整的数据列表才行

**若需要自定义样式的滚动条：**
- 在视图的右侧（或者需要的任何地方）手动画一个滚动条
- 需要在列表 onScroll 事件中同步滚动进度，将滚动进度映射到滚动条 View 的 translateY，通过 Animated.Value 绑定给滚动条视图

**若自定义样式的滚动条需要支持拖拽：**
- 需要给滚动条 View 加上 PanResponder，绑定手势响应函数，在手势 start 的时候记下当前 scrollOffsetY，并在 move 的时候拿到 dx,dy 然后调用列表的 scrollToOffset 方法更新滚动进度（即使得滚动条可以驱动视图的滚动进度）

**若需要支持 StickyHeader：**
- 可以直接用 SectionList，有现成的

## 下拉刷新

## Load More 怎么做

ListFooterComponent 放一个 LoadingView

:::info
双向 Load More 正在学习中...
:::