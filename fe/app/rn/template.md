# RN 基础代码片段

## 普通函数式组件模板

```tsx
import React from 'react';
import { StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
  },
});

interface MyComponentProps {
}

const MyComponent: React.FC<MyComponentProps> = (props) => {
  const {} = props;
  return (
    <View style={styles.container}>
   
    </View>
  );
};

export default MyComponent;
```

## Context Provider + Hook

结构：
- 使用顶层 Context 下放特定的数据/逻辑/动作
- 使用 hook 封装 useContext，将 hook 向外暴露
- 孙级组件使用 hook 获取数据


```tsx
import React, { PropsWithChildren, useContext } from 'react';

interface CustomPropertyContextValue {

}

interface CustomPropertyProviderProps {

}

const CustomPropertyContext = React.createContext<CustomPropertyContextValue>(null);

export const CustomPropertyProvider = (
    props: PropsWithChildren<CustomPropertyProviderProps>
) => {
  const { children } = props
  const contextValue: CustomPropertyContextValue = {}
  return (
    <CustomPropertyContext.Provider value={contextValue}>
      {children}
    </CustomPropertyContext.Provider>
  );
};

export const useCustomProperty = () => {
  const contextValue = useContext(CustomPropertyContext);
  if (!contextValue) {
     console.error('[CustomPropertyContext] 请在最外层添加 CustomPropertyProvider');
  }
  return contextValue;
}
```

一般使用这种做法的例子有：

### ThemeProvider
  - 下放主题配色表
  - 下层对主题变更无感知

### DataProvider
  - 在初始化时发送请求拉取数据
  - 维护数据源
  - 下放数据的状态 如 loading/error/hasMore
  - 下放数据拉取动作 如 reload/loadMore

### ModalProvider
  - 维护 ModalView
  - 下放 showModal/hideModal 方法

## Page 模板

结构：
- 把所有顶层 Provider 放到一起，最内层放 Page 组件
- 向 Native 注册此 Module

```tsx
import React from 'react';
import { AppRegistry } from 'react-native';
import { withErrorBoundaryOptions } from '../../../Common/components/ErrorBoundry';
interface MyPageContainerProps {

}

const MyPageContainer: React.FC<MyPageContainerProps> = (props) => {
    const { } = props;

    return (
        <NativePropsProvider nativeProps={props}>
            <InitialPropsProvider initialProps={props}>
                <ThemeContext.Provider value={theme}>
                    <MyDataContextProvider {...props}>
                        <MyPage {...props} />
                    </MyDataContextProvider>
                </ThemeContext.Provider>
            </InitialPropsProvider>
        </NativePropsProvider>
    );
};

const moduleName = 'RNMyPage';

AppRegistry.registerComponent(moduleName, () =>
    withErrorBoundaryOptions(MyPageContainer, { moduleName }),
);
export { moduleName };

```