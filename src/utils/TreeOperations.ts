import { TreeNode } from '../models/TreeNode';

/**
 * 实际执行二叉树的翻转操作
 * @param root 要翻转的树的根节点
 * @returns 翻转后的树的根节点
 */
export const invertTree = (root: TreeNode | null): TreeNode | null => {
  if (!root) return null;
  
  // 递归翻转左右子树
  const left = invertTree(root.left);
  const right = invertTree(root.right);
  
  // 交换左右子树
  root.left = right;
  root.right = left;
  
  return root;
};

/**
 * 检查两棵树是否相同
 * @param tree1 第一棵树
 * @param tree2 第二棵树
 * @returns 是否相同
 */
export const areTreesEqual = (tree1: TreeNode | null, tree2: TreeNode | null): boolean => {
  // 都为空，认为相同
  if (!tree1 && !tree2) return true;
  
  // 一个为空一个不为空，不相同
  if (!tree1 || !tree2) return false;
  
  // 节点值不同，不相同
  if (tree1.value !== tree2.value) return false;
  
  // 递归检查左右子树
  return areTreesEqual(tree1.left, tree2.left) && areTreesEqual(tree1.right, tree2.right);
};

/**
 * 计算树的高度
 * @param root 树的根节点
 * @returns 树的高度
 */
export const getTreeHeight = (root: TreeNode | null): number => {
  if (!root) return 0;
  
  const leftHeight = getTreeHeight(root.left);
  const rightHeight = getTreeHeight(root.right);
  
  return Math.max(leftHeight, rightHeight) + 1;
};

/**
 * 广度优先遍历树
 * @param root 树的根节点
 * @returns 节点值的数组
 */
export const bfsTraversal = (root: TreeNode | null): number[] => {
  if (!root) return [];
  
  const result: number[] = [];
  const queue: TreeNode[] = [root];
  
  while (queue.length > 0) {
    const node = queue.shift()!;
    result.push(node.value);
    
    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right);
  }
  
  return result;
};

/**
 * 创建平衡二叉树用于演示
 * @param height 树的高度
 * @param startValue 起始节点值
 * @returns 创建的树的根节点
 */
export const createBalancedTree = (height: number, startValue: number = 1): TreeNode | null => {
  if (height <= 0) return null;
  
  const generateTree = (depth: number, index: number): TreeNode | null => {
    if (depth > height) return null;
    
    const nodeValue = startValue + index - 1;
    const node = new TreeNode({
      id: index,
      value: nodeValue
    });
    
    node.left = generateTree(depth + 1, index * 2);
    node.right = generateTree(depth + 1, index * 2 + 1);
    
    return node;
  };
  
  return generateTree(1, 1);
}; 