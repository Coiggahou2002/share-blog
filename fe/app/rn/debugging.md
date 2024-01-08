# Debugging

## Xcode 断点

## Flipper

## Lookin

[lookin](https://cdn.lookin.work/public/style/images/independent/homepage/preview_cn_2x.jpg) 可以方便地查看布局尺寸 & 视图层级关系 & View树结构, 一般用来：
- 看视图树结构
- 量尺寸（用来和设计师扯皮）

![lookin](https://cdn.lookin.work/public/style/images/independent/homepage/preview_cn_2x.jpg)

在使用 Lookin 之前，需要[将其 iOS Framework 嵌入 iOS App 中](https://lookin.work/faq/integration-guide/)

其实就是到 `ios/Podfile` 文件里加一行声明，然后 `pod install` 就可以了

