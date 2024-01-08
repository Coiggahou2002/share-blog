# 组件

## 视图 View

### SafeAreaView (iOS only)

### KeyboardAvoidingView

能被键盘“顶起来”的 View

```tsx
<KeyboardAvoidingView
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
>
    {/* 想要被键盘顶起的内容 */}
</KeyboardAvoidingView>
```

底层实现是获取键盘的高度，然后调整它自身的 padding/height

## 图片组件 Image

## 文字组件 Text

### 指定行数 + 省略

```tsx
<Text numberOfLines={2} ellipsizeMode="tail">
    Very long text
</Text>
```

### 不跟随系统字体缩放

限制跟随系统字体缩放的倍数（设置一个最大的阈值）
```tsx
<Text allowFontScaling maxFontSizeMultiplier={1}>
    我不想长胖太多，那样好丑
</Text>
```

直接锁定，不允许跟随系统缩放
```tsx
<Text allowFontScaling={false}>
    哈哈，你没法把我放大
</Text>
```

## 列表组件

- ScrollView
- VirtualizedList
- FlatList
- SectionList

## 浮层 Modal

## 点击区域

主要是 Pressable
