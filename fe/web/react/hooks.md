# React Hooks

## React 如何知道每个 hook 应该返回给我们什么值？

从纯 JS/TS 函数角度去看待 hooks，很多问题都能预先想明白

假设有这样的代码, 里面是一个函数组件，写了 4 个 hooks

```tsx
export default function MyComponent() {
    const [count, setCount] = useState(0);
    const [name, setName] = useState('');
    const listRef = useRef<FlatList>();
    useEffect(() => {
        console.log(123)
    }, []);
}
```

实际上，每个 hook 都是执行了一个函数而已，对于 hook 函数而言，从他的视角看，只能看到一个我们传给他的值，除此之外它一无所知，甚至它自己都没有名字，那么 React 如何在我们 use 任何一个 hook 都能把对应的值返回出来给我们呢？每个 hook 连个 id 都没有，显然是通过顺序记住的。

所以猜也不难猜到，内部是一个 hook node 连起来组成的链表

:::tip
既然是链表，那为什么不能把 hooks 写在条件语句中的原因就显而易见了，因为如果那样写，React 就没法依靠顺序来知道 hook 对应的实际 hookNode 是谁了（同理，hooks 也不能嵌套）
:::

```ts
interface HookNodeBase<T> {
    next: HookNodeBase<T>;
}
```

## useRef 只是雕虫小技的包装

只要稍稍用对象包装一下，里面用 current 放置真正的值，并且永远不改变 refObj 的地址，state 其实就成为了 ref

```tsx
function useRef<T>(initialValue: T) {
    const [refObj, setRefObj] = useState<T>({
        current: initialValue;
    });
    return refObj;
}
```

## setState 的背后

每个 useState 都会创建一个 queue（更新队列）

比如 number 这个 state 有一个更新队列，每次 setState，会调用 dispatchAction，然后将这次更新放入更新队列

在真正执行更新之前，每个 state 的更新队列的所有任务会统一合并成一次更新

这样连续执行三次，会被合并成 setState(0)
```ts
const [number, setNumber] = useState(0);
setNumber(1)
setNumber(1)
setNumber(1)
```

这样的话，也会被合并，但是以函数链的形式合并，就不会有覆盖的问题
```ts
const [number, setNumber] = useState(0);
setNumber(prev => prev + 1)
setNumber(prev => prev + 1)
setNumber(prev => prev + 1)
```

初始值 0 加上三个函数合并，number 会被 reduce 成为 3，再去真正执行更新

:::warning
所以，如果在单个渲染函数内多次 setState，一定要使用函数，不要直接使用值，不然会被覆盖
:::

## 基本认识——Hook是函数，背后是链表 

```ts
interface HookNodeBase<T> {
    next: HookNodeBase<T>;
}

interface StateHookNode<T> extends HookNodeBase<T> {
    memoizedState: T;  // 就是放state的值
}

enum EffectTag {
    HookLayout,  // useEffect
    HookPassive, // useLayoutEffect
}
type EffectCreateFn = () => void;
interface EffectHookNode extends HookNodeBase {
    create: EffectCreateFn;  // 传入的副作用函数
    destory: () => void; // 在传入的副作用函数中返回的销毁函数
    deps: any[];         // 依赖
    effectTag: EffectTag; // 类型
}

type SetStateAction<S> = (state: S) => void;

function useState<S>(
    initialState: (() => S) | S
): [S, SetStateAction<S>] {
    // TODO:
}

function useRef<T>(initialValue: T): { current: T } {
    // TODO:
}

function useCallback<T>(callback: T, deps: any[]): T {

}

// useEffect 的 deps 是可以不传的，不传的话每次渲染都执行
function useEffect(create: EffectCreateFn, deps?: any[]) {
    if (!hasChanged(deps, prevDeps)) {
        updateEffectButNotExecute(create);
    }
    executeEffectAtCommit(create);
}

function useMemo<T>(computeFn: () => T, deps: any[]): T {
    if (!hasChanged(deps, prevDeps)) {

    }
    const result = computeFn();

}

// TODO: useImperativeHandle
```

一个 Dispatcher 持有上述的这些方法

在一个组件的不同阶段，实际工作的 Dispatcher 不是同一个

每个不同的 Dispatcher 对象，里面挂的所有 useXX 方法都是不同的，相当于钩子其实有三套

挂载阶段：HooksDispatcherOnMount

update阶段：HooksDispatcherOnUpdate

rerender阶段：HooksDispatcherOnRerender

## hook

```ts
export type Hook = {
  memoizedState: any,
  baseState: any,
  baseQueue: Update<any, any> | null,
  queue: any,
  next: Hook | null,
};
```

## useState

### 挂载阶段

```ts
function basicStateReducer<S>(state: S, action: BasicStateAction<S>): S {
  // $FlowFixMe[incompatible-use]: Flow doesn't like mixed types
  return typeof action === 'function' ? action(state) : action;
}

function mountState<S>(
  initialState: (() => S) | S,
): [S, Dispatch<BasicStateAction<S>>] {
  // 拿到初始值，创建 Fiber 节点
  const hook = mountWorkInProgressHook();
  if (typeof initialState === 'function') {
    initialState = initialState();
  }

  // 往 fiber 节点存一下初始状态值
  hook.memoizedState = hook.baseState = initialState;

  // 这个 state 的更新队列
  const queue: UpdateQueue<S, BasicStateAction<S>> = {
    pending: null,
    lanes: NoLanes,
    dispatch: null,
    lastRenderedReducer: basicStateReducer,
    lastRenderedState: (initialState: any),
  };
  hook.queue = queue;

  // setXXX 实际方法就是这个
  const dispatch: Dispatch<BasicStateAction<S>> = (dispatchSetState.bind(
    null,
    currentlyRenderingFiber,
    queue,
  ): any);
  queue.dispatch = dispatch;

  // 返回出去[状态，更新函数]
  return [hook.memoizedState, dispatch];
}
```

### update 阶段

### rerender 阶段

## useRef

### 挂载阶段

加个节点，存一下初始值，搞完了
```ts
function mountRef<T>(initialValue: T): {current: T} {
  // 链表上加一个节点
  const hook = mountWorkInProgressHook();
  if (enableUseRefAccessWarning) {
    // ignore...
  } else {
    // 然后把对象存进去
    const ref = {current: initialValue};
    hook.memoizedState = ref;
    // 完事儿！
    return ref;
  }
}
```
### Update & Rerender 阶段

都：啥也不用管，把存着的东西返回去就行了，牛逼不？

```ts
function updateRef<T>(initialValue: T): {current: T} {
  const hook = updateWorkInProgressHook();
  return hook.memoizedState;
}
```

## useCallback

### 挂载阶段

就把函数和依赖存了一下，啥也没干

```ts
function mountCallback<T>(callback: T, deps: Array<mixed> | void | null): T {
  const hook = mountWorkInProgressHook();
  const nextDeps = deps === undefined ? null : deps;
  hook.memoizedState = [callback, nextDeps];
  return callback;
}
```

### Update & Rerender 阶段

对比一下 deps，如果没变化，不更新 fiber 里存的 callback，返回旧值出去

如果有变化，就更新一下 fiber 里存的 callback，并返回新值出去

```ts
function updateCallback<T>(callback: T, deps: Array<mixed> | void | null): T {
  const hook = updateWorkInProgressHook();
  const nextDeps = deps === undefined ? null : deps;
  const prevState = hook.memoizedState;
  if (nextDeps !== null) {
    const prevDeps: Array<mixed> | null = prevState[1];
    if (areHookInputsEqual(nextDeps, prevDeps)) {
      return prevState[0];
    }
  }
  hook.memoizedState = [callback, nextDeps];
  return callback;
}
```

## useMemo

### Mount

很简单，创建一个 fiber node，然后用传入的函数计算一下值，存起来，返回出去

```ts
function mountMemo<T>(
  nextCreate: () => T,
  deps: Array<mixed> | void | null,
): T {
  const hook = mountWorkInProgressHook();
  const nextDeps = deps === undefined ? null : deps;
  if (shouldDoubleInvokeUserFnsInHooksDEV) {
    nextCreate();
  }
  const nextValue = nextCreate();
  hook.memoizedState = [nextValue, nextDeps];
  return nextValue;
}
```

### Update & Rerender

对比 deps，如果有变化，重新计算，存起来，返回出去

:::info
这里有点猥琐，DEV 模式会跑两次计算函数
:::

```ts
function updateMemo<T>(
  nextCreate: () => T,
  deps: Array<mixed> | void | null,
): T {
  const hook = updateWorkInProgressHook();
  const nextDeps = deps === undefined ? null : deps;
  const prevState = hook.memoizedState;
  // Assume these are defined. If they're not, areHookInputsEqual will warn.
  if (nextDeps !== null) {
    const prevDeps: Array<mixed> | null = prevState[1];
    if (areHookInputsEqual(nextDeps, prevDeps)) {
      return prevState[0];
    }
  }
  if (shouldDoubleInvokeUserFnsInHooksDEV) {
    nextCreate();
  }
  const nextValue = nextCreate();
  hook.memoizedState = [nextValue, nextDeps];
  return nextValue;
}
```

## useContext

无论是 Mount/Update/Rerender 阶段，`useContext` 方法都是同一个

实际上是 `readContext` 方法

