# ObjectiveC

## 一些概念

Xcode: 一个开发环境

Objective-C: 一门语言

Cocoa: 函数库

## 基本类型

BOOL YES/NO 代表 1/0

nil 相当于 js 里的 `null`, golang 里的 `nil`

NSArray 数组，里面不要求对象是同一类型的

## 方法

方法没有 public/private 的概念，可以认为全是 public

方法以减号开头：代表实例方法，调用之前需要创建类的实例
方法以加号开头：静态方法，调用时不需要创建类的实例

```objc
-(void) hello:(BOOL)isHello
{
    // shit
}
```

方法的调用

js 里
```js
this.hello(true)
```

oc 里
```objc
[self hello:YES]
```

复杂一点的

```objc
[[[MyClass alloc] init:[foo bar]] autorelease];
``` 

转换成C#或者Java的语法也就是：

```java
MyClass.alloc().init(foo.bar()).autorelease();
```

## NSxxx

- NSLog
- NSString
- NSInteger
- NSURL
- NSImage

:::info 其他开头的奇怪东西

CA: Core Foundation

CG: Core Graphics

UI: User Interface
  
CFStringTokenizer

CALayer

CGPoint

UIImage

:::