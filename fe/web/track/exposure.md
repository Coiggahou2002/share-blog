# 曝光检测

## Intersection Observer API

希望观察一个元素在 viewport 中的曝光率时（例如广告曝光的埋点统计）

## 如何观察曝光率

创建观察者时，提供的第一个参数是回调函数，第二个函数是 options

其中 options 指定了观察的选项，最常用的是 threshold

当 threshold 是 k% 时，意味着每当观察的对象在 viewport 中出现的部分占它自身的比例超过 k% 时，就会触发我们绑定的 callback

## 范例

下面的代码，在一个长滚动页面中创建了一个 box

每当 box 自身的 60% 出现在 viewport 中时，会触发回调

但此时可能 box 是在离开的路上，也可能是在进入的路上，我们在回调函数中通过 `entry.isIntersecting` 区分这一点，如果是 true，代表在进入的路上，如果是 false，代表在离开视野的路上

```jsx
const ob = new IntersectionObserver((entries, observer) => {
  console.log(entries)
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      console.log('inview')
      // observer.unobserve(entry.target)
    } else {
      console.log('outview')
    }
  })
}, {
  root: null,
  rootMargin: '0px',
  threshold: 0.6
});
ob.observe(document.querySelector('.box'))

```