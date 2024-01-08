# 键盘相关

RN 可以做的事情：
- 监听键盘的出现、消失事件, 封装自定义 hook 得到键盘是否升起的状态 and 键盘高度
- 主动降下键盘 `Keyboard.dismiss()`

## 事件

:::info
安卓只有 keyboardDidShow + keyboardDidHide 有效
:::

```tsx
export type KeyboardEventName =
    | 'keyboardWillShow'
    | 'keyboardDidShow'
    | 'keyboardWillHide'
    | 'keyboardDidHide'
    | 'keyboardWillChangeFrame'
    | 'keyboardDidChangeFrame';
```

## 监听键盘是否升起/降下
```tsx
import { useEffect, useState } from "react";
import { Keyboard } from "react-native";

const useKeyboardStatus = () => {
    const [isKeyboardDismissed, setIsKeyboardDismissed] = useState(true);
    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
            setIsKeyboardDismissed(false);
        });
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            setIsKeyboardDismissed(true);
        });
        const keyboardWillShowListener = Keyboard.addListener('keyboardWillShow', () => {
            setIsKeyboardDismissed(false);
        });
        const keyboardWillHideListener = Keyboard.addListener('keyboardWillHide', () => {
            setIsKeyboardDismissed(true);
        });
        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
            keyboardWillShowListener.remove();
            keyboardWillHideListener.remove();
        };
    }, []);
    return {
        isKeyboardDismissed
    };
};

export default useKeyboardStatus;
```

## 键盘高度
```tsx
import { useEffect, useState } from 'react';
import { Keyboard } from 'react-native';

const useKeyboardHeight = () => {
  const [keyboardHeight, setKeyboardHeight] = useState<number>(0);

  const keyboardDidShow = (frames: any) => {
    setKeyboardHeight(frames.endCoordinates.height);
  };

  useEffect(() => {
    const sub = Keyboard.addListener('keyboardDidShow', keyboardDidShow);

    // cleanup function
    return () => {
      sub.remove();
    };
  }, []);

  return keyboardHeight;
};

export default useKeyboardHeight;
```