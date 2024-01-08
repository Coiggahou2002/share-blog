# 设备相关

## 获取设备屏幕宽高

RN 官方提供的 hook，响应式

```tsx
const { fontScale, scale, height, width } = useWindowDimensions();
```

## 获取系统主题 (light/dark)

```tsx
const colorScheme = useColorScheme();
const isDark = colorScheme === 'dark';

```

## 获取键盘状态

见 [键盘](./keyboard)

## 关于安全区



手机的上方可能会有：
- 状态栏 StatusBar
- 灵动岛
- ...

手机的下方可能会有:
- 底部导航栏 NavigationBar
- 全面屏手势条
- ...

所以一般 Hybrid 应用会让 Native 通过一些事件通知来告诉 RN 这些区域的值是多少，如下是一个例子

```tsx
export interface IDimensionInfo {
    statusBarHeight: number;      // 顶部状态栏高度
    navigationBarHeight: number;  // 底部导航栏高度
    width: number;
    height: number;
    insetBottom: number;          // 底部需要缩进的高度
    toolbarHeight: number;        // 底部 TabBar 高度
    safeAreaBottomHeight: number; // 底部安全区高度（用于避开例如全面屏手势条之类的东西）
}
```

## 关于平板
- 屏幕旋转怎么办
- 视图尺寸的适配

## 关于 Modal

使用 Modal 需要注意：全屏的 Modal 可能需要 Native 提供桥接

