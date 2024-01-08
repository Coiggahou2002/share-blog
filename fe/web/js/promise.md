# Promise

## 基本概念

- 是个具有 3 种状态的状态机
- 从 pending 到其他两种状态的转换是不可逆的
- 可在注入的执行函数中自定义 pending 到另外两种状态的转换逻辑
- 执行函数也是初始化函数，所以是在 Promise 对象被创建的时候同步执行的
- 一个 Promise 的初始状态并非必须得是 pending，可以用 Promise.resolve() 这个静态方法创建一个直接处于 resolve 状态的 Promise

## 几个函数
- 创建 Promise 时传入的 `(resolve, reject) => { ... }` 函数
  - 用来初始化 Promise 对象
  - 在 Promise 对象被创建的时候，马上、同步执行（虽然里面放的一般是异步代码，如网络请求）
  - 用来说明这个初始为 pending 的状态机，分别在什么情况和逻辑下转换为 resolved 和 rejected
- 一个 promise 对象后面的 `.then(res => { ... })` 
  - 用来告诉这个状态机，在变为 resolved 的时候，要做什么事情（其实就是 resolve 钩子）
- 一个 promise 对象后面的 `.catch(err => { ... })`
  - 用来告诉这个状态机，在变为 rejected 的时候，要做什么事情（其实就是 rejected 钩子）
- 一个 promise 对象后面的 `.finally(() => { ... })`
  - 用来告诉这个状态机，脱离 pending 状态的时候要做什么
  - 无法区分 resolved 还是 reject，一般用于添加收尾清理代码

## 大白话
- 当我们通过正常途径创建一个 Promise，我们创建了一个初始状态为 pending 的状态机
- 我们在初始化函数里面，告诉状态机，你现在去做这个事情，中途如果遇到 xxx 情况，你就变成 resolved 状态，如果遇到的是 yyy 情况，你就变成 rejected 状态
- 我们在 `.then()` 里面，告诉这个状态机，当你变成 resolved 的时候，你要做什么
- 我们在 `.catch()` 里面告诉状态机，当你变成 rejected 的时候，你要做什么
- 我们在 `.finally()` 里面告诉状态机，当你从 pending 脱离出来，你要做什么
- 然后状态机自己在某个时候，会依据我们在初始化函数中规定的逻辑，变成 resolved 或者 rejected 状态，当他改变状态的时候，我们传给他的回调，会被推进微任务队列中，当主执行栈空了的时候，这些回调就会被取出来执行

## 与 async / await 结合
Async 加在函数前面，表明「这是一个异步函数」

加了 async 的函数，返回值会自动被 Promise.resolve() 套上，返回一个 Promise 对象

## Basic APIs

Promise 类有 6 种静态方法：

1. `Promise.all(promises)` —— 等待所有 promise 都 resolve 时，返回存放它们结果的数组。如果给定的任意一个 promise 为 reject，那么它就会变成 Promise.all 的 error，所有其他 promise 的结果都会被忽略。
2. `Promise.allSettled(promises)`（ES2020 新增方法）—— 等待所有 promise 都 settle 时，并以包含以下内容的对象数组的形式返回它们的结果：
  - status: "fulfilled" 或 "rejected"
  - value（如果 fulfilled）或 reason（如果 rejected）。
3. `Promise.race(promises)` —— 等待第一个 settle 的 promise，并将其 result/error 作为结果返回。
4. `Promise.any(promises)`（ES2021 新增方法）—— 等待第一个 fulfilled 的 promise，并将其结果作为结果返回。如果所有 promise 都 rejected，Promise.any 则会抛出 AggregateError 错误类型的 error 实例。
5. `Promise.resolve(value)` —— 使用给定 value 创建一个 resolved 的 promise。
6. `Promise.reject(error)` —— 使用给定 error 创建一个 rejected 的 promise。
以上所有方法，Promise.all 可能是在实战中使用最多的。

## Promise 手写简单实现

```js
const [PENDING, FULLFILLED, REJECTED] = [0, 1, 2];

class MyPromise {
  constructor(fn) {
    if (typeof fn !== 'function') {
      // report error
    }
    this.status = PENDING;
    this.onResolveCallbacks = [];
    this.onRejectCallbacks = [];
    let resolve = () => {
      this.status = FULLFILLED;
      this.onResolveCallbacks.forEach(fn => fn());
    }
    let reject = () => {
      
    }
    fn();
  }
  then(onResolveFn) {
    this.onRejectCallbacks.push(onResolveFn);
  }
  
}


let p = new Promise((resolve, reject) => {
  
})

p.then(r => {
  // ...
})
```

## Promise.all() 手写实现

### 代码
```js
function myPromiseAll(values) {
  return new Promise((rslv, rjt) => {
    let res = [];
    let completed = 0;
    values.forEach((value, idx) => {
      Promise.resolve(value).then(result => {
        res[idx] = result;
        completed++;
        if (completed == values.length) {
          rslv(res);
        }
      }).catch(err => rjt(err));
    })
  })
}
```

### 个人理解

Promise.all() 并不是 concurrent 的，因为 Promise.all() 其实就是按顺序去 resolve 每个 promise，然后把 then 任务按顺序推进微任务队列（如果中途有 err 就 reject），所以传进Promise.all() 的每个promise的回调，应该都是被按顺序从微任务队列中取出执行的，所以并不存在 concurrent 一说。

而我们平时使用 Promise.all 最多的场景，往往是有很多个异步网络请求需要同时发，这时候为什么能做到所谓的 concurrent 呢？

```js
let urls = ['abc.com', 'www.baidu.com']
Promise.all(urls.map(url => fetch(url)))
.then(datas => {
    // do sth with datas...
})
```

因为在这个场景下，我们传入的 promises 数组，其中每个 promise 都是网络请求 API (如 fetch 本身就是返回一个 Promise) ，我们按顺序去执行每个“调用 fetch”的过程，fetch 告诉浏览器：帮我去发起这个网络请求，在请求完成时，把这个请求的回调推入微任务队列，那么，哪个请求先返回，它的回调就会先被推进微任务队列。最终，这些回调也会被按顺序从微任务队列中取出。

我们观察上述过程，其实可以发现，**并发的能力，依旧是浏览器提供的**（因为浏览器能够开多线程去发起多个网络请求），Promise.all 只是在做它该做的事，按顺序告诉浏览器，我要开启 a,b,c 网络请求，然后浏览器收到之后逐个开线程帮你去发请求。

所以，归根结底，`Promise.all()` 不是并发的，就算它在某种场景下看起来像是并发的，那也是浏览器提供的支持罢了，毕竟说到底，JavaScript Runtime 本身就是单线程，永远不可能支持原生并发。

## 利用 Promise + async/await 实现 sleep

```js
// duration 是想要睡眠的ms数
await new Promise(resolve => setTimeout(resolve, duration));
```

综合运用的知识点：
- generator 函数提供的阻塞
- setTimeout 使得 duration 后，回调能够被推进微任务队列
- 回调被从微任务队列取出之后，能够 resolve 这个 promise，结束 await 的阻塞


## 参考

https://promisesaplus.com/

https://juejin.cn/post/7064767357335371812

## Async Await 处理异常的优雅方式

https://blog.grossman.io/how-to-write-async-await-without-try-catch-blocks-in-javascript/

![](https://cjpark-1304138896.cos.ap-guangzhou.myqcloud.com/blog_img/202401081356760.png)
