# 多叉树

## 类型


```ts
export type TreeNode<T> = {
  level: number;
  parent?: TreeNode<T>;
  children?: TreeNode<T>[];
} & T;
```

## 建树

:::tip
前端有不少布局是依赖树形结构递归渲染的，但 UI 设计师可能会给一些复杂的布局规则，例如：
- 某个节点如果是孤儿是样式 A，如果有兄弟则是样式 B
- 如果某个节点没有子节点，那么是样式 A，否则是样式 B
- 如果某个节点的父亲具有某属性，那么是样式 A，否则是样式 B

在打点上报里，也有可能会依赖到节点的兄弟、父亲、祖先节点的信息，所以，一旦选择了建树，一定要把 parent 带上，有条件最好带上 sibling 指针组成兄弟链表，这样是最方便的
:::

从前序遍历建树

```ts
/**
 * 把扁平的带level的节点数组(前序遍历序列)转换成树形结构 (带parent)
 */
function buildTree<T>(flatNodes: TreeNode<T>[]): TreeNode<T> {
  const shadowRoot: TreeNode<null> = { level: 0, children: [] };
  const currentLeadingNodes: Map<number, TreeNode<T>> = new Map();
  currentLeadingNodes.set(0, shadowRoot);

  flatNodes.forEach((node) => {
    const parent = currentLeadingNodes.get(node.level - 1);
    if (!parent) {
        throw new Error(`Invalid node level ${node.level} doesn't have parent`);
    }
    if (!parent.children) {
        parent.children = [];
    }
    node.parent = parent;
    parent.children.push(node);
    currentLeadingNodes.set(node.level, node);
  });

  return shadowRoot;
};
```

## 前序遍历

例子：前序遍历时给每个 Node 标上前序遍历的 index

```ts
/**
 * 前序遍历树的回调函数
 * @param tree
 * @param callback(node, index) index是当前节点在前序遍历序列中的索引
 */
type TraverseTreeNodeCallback<T> = (node: TreeNode<T>, index: number) => void;


/**
 * 共享闭包，用于在整个树的递归遍历过程中记录or传递信息
 */
interface SharedClosure {
  index: number; // 当前节点在前/中/后序遍历序列中的索引
}

function _preOrderTraverse<T>(tree: TreeNode<T>, callback: TraverseTreeNodeCallback<T>, sharedClosure: SharedClosure) {
  if (!tree) return;

  // 前序遍历的过程中，callback的调用顺序一定和前序遍历顺序一致，所以在此处++index即可
  callback(tree, sharedClosure.index);
  sharedClosure.index++;

  if (Array.isArray(tree.children)) {
    tree.children.forEach((child) => {
      _preOrderTraverse(child, callback, sharedClosure);
    });
  }
}

function preOrderTraverse<T>(tree: TreeNode<T>, callback: TraverseTreeNodeCallback<T>) {
  const sharedClosure = {
    index: 0,
  };
  return _preOrderTraverse(tree, callback, sharedClosure);
}
```