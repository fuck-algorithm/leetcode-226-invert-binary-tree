# 翻转二叉树算法动画演示

这个项目是 LeetCode 226 翻转二叉树问题的交互式可视化实现。通过动画效果直观展示了不同解法的执行过程。

## 项目特点

- 支持三种翻转二叉树的算法:
  - 递归解法
  - 迭代解法 (队列实现)
  - 迭代解法 (栈实现)
- 动态展示算法执行过程中的每一步
- 交互式控制面板，可暂停、播放、单步执行
- 节点高亮与动画效果直观展示算法执行细节
- 完全模块化的代码结构，易于理解和扩展

## 技术栈

- React 19
- TypeScript
- D3.js 用于树的可视化
- CSS3 动画效果

## 如何运行

克隆项目后，执行以下命令:

```bash
# 安装依赖
npm install

# 开发模式运行
npm run dev

# 构建项目
npm run build
```

## 算法说明

### 递归解法

递归解法是最简洁的实现方式，通过递归交换每个节点的左右子树实现翻转。

```typescript
function invertTree(root) {
  if (!root) return null;
  
  const left = invertTree(root.left);
  const right = invertTree(root.right);
  
  root.left = right;
  root.right = left;
  
  return root;
}
```

### 迭代解法 (队列)

使用队列实现广度优先遍历，并在遍历过程中交换每个节点的左右子树。

### 迭代解法 (栈)

使用栈实现深度优先遍历，并在遍历过程中交换每个节点的左右子树。

## 项目结构

```
src/
├── algorithms/         # 算法实现代码
├── components/         # React 组件
├── models/             # 数据模型定义
├── utils/              # 工具函数
└── App.tsx             # 主应用
```

## 许可证

MIT
