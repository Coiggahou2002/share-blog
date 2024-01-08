# 如何实现滑动卡片栈效果？

## Step 0 画一个静态的卡片

我们先简单画一下卡片

<img alt="卡片示意图" style="max-width: 500px" src="https://cjpark-1304138896.cos.ap-guangzhou.myqcloud.com/blog_img/202401072219363.png" />

```tsx
const styles = StyleSheet.create({
    card: {
        width: 335,
        height: 423,
        borderRadius: 12,
        backgroundColor: 'rgba(255,0,0, 0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

const renderCard = useCallback(() => {
    return (
        <View
            style={[styles.card]}>
            <Text>我是一张卡片</Text>
        </View>
    );
}, []);
```

## Step 1 先让卡片能够“被拖动”

首先，我们需要一个能处理滑动手势、能感知滑动手势位移的东西, 也就是 ReactNative 提供的 [PanResponder](https://reactnative.dev/docs/panresponder), 我们只需要为「需要感知手势的对象」绑定一个 PanResponder 处理器，就可以感知到手指在该对象上面的滑动了

我们想要感知手势的对象是谁？是卡片

所以，我们先给卡片绑定一下手势处理器

```tsx:line-numbers {5-28,33-34}
const styles = StyleSheet.create({
    // 省略...
});

const panResponder = React.useRef(
    PanResponder.create({
        onStartShouldSetPanResponder: (evt, gestureState) => true,
        onStartShouldSetPanResponderCapture: (evt, gestureState) =>
            true,
        onMoveShouldSetPanResponder: (evt, gestureState) => true,
        onMoveShouldSetPanResponderCapture: (evt, gestureState) =>
            true,
        onPanResponderGrant: (evt, gestureState) => {
            // 刚开始滑动的回调函数
        },
        onPanResponderMove: (evt, gestureState) => {
            // 滑动过程中(松手之前)的回调函数
            const { dx, dy } = gestureState;
            // 我们把滑动过程中的 dx dy 打印出来看一下
            console.log('🔥 dx, dy', dx, dy);
        },
        onPanResponderTerminationRequest: (evt, gestureState) =>
            true,
        onPanResponderRelease: (evt, gestureState) => {
            // 松手时的回调
        },
    }),
).current;

const renderCard = useCallback(() => {
    return (
        <View
            {/* 此处的含义是：将手势处理器绑定到这个 View 上 */}
            {...panResponder.panHandlers}
            style={[styles.card]}
        >
            <Text>我是一张卡片</Text>
        </View>
    );
}, [panResponder.panHandlers]);
```

![](https://cjpark-1304138896.cos.ap-guangzhou.myqcloud.com/blog_img/pan.gif)

尝试一下，可以看到 log 输出了 dx dy

为什么卡片并没有被拖动呢？因为我们在滑动事件里并没有改变卡片的任何布局属性，而仅仅是打印出了一些 log

接下来，我们为卡片加上 transform 变换，每当手势滑动事件触发的时候，我们把手指的移动距离直接应用到卡片的位移变换上

> 这里我们需要用到 Animated.Value，将一个动画值绑定到我们卡片的 View 上，并在具体手势事件触发的时候去 set 这个值

```tsx:line-numbers {1-6,23-26,38,47,42-44}
const cardAnimXY = useRef(
    new Animated.ValueXY({
        x: 0,
        y: 0,
    }),
);

const panResponder = React.useRef(
    PanResponder.create({
        onStartShouldSetPanResponder: (evt, gestureState) => true,
        onStartShouldSetPanResponderCapture: (evt, gestureState) =>
            true,
        onMoveShouldSetPanResponder: (evt, gestureState) => true,
        onMoveShouldSetPanResponderCapture: (evt, gestureState) =>
            true,
        onPanResponderGrant: (evt, gestureState) => {
            // 刚开始滑动的回调函数
        },
        onPanResponderMove: (evt, gestureState) => {
            // 滑动过程中(松手之前)的回调函数
            const { dx, dy } = gestureState;
            console.log('🔥 dx, dy', dx, dy); // TODO: del
            cardAnimXY.current.setValue({
                x: dx,
                y: dy,
            });
        },
        onPanResponderTerminationRequest: (evt, gestureState) =>
            true,
        onPanResponderRelease: (evt, gestureState) => {
            // 松手时的回调
        },
    }),
).current;

const renderCard = useCallback(() => {
    return (
        <Animated.View
            {...panResponder.panHandlers}
            style={[
                styles.card,
                {
                    transform: cardAnimXY.current.getTranslateTransform()
                },
            ]}>
            <Text>我是一张卡片</Text>
        </Animated.View>
    );
}, [panResponder.panHandlers]);
```

![](https://cjpark-1304138896.cos.ap-guangzhou.myqcloud.com/blog_img/move_card.gif)


## Step 2 让卡片松手回到原位


## Step 3 给卡片的拖动和回位增加弹性动效


## Step 4 开始堆叠多张卡片


## Step 5 将顶部卡片的位移和底层卡片的上浮建立联系