export interface TreeNodeData {
  id: number;
  value: number;
  left?: TreeNodeData;
  right?: TreeNodeData;
  x?: number;
  y?: number;
  highlighted?: boolean;
  animating?: boolean;
}

export class TreeNode {
  id: number;
  value: number;
  left: TreeNode | null;
  right: TreeNode | null;
  x: number;
  y: number;
  highlighted: boolean;
  animating: boolean;

  constructor(data: TreeNodeData) {
    this.id = data.id;
    this.value = data.value;
    this.left = data.left ? new TreeNode(data.left) : null;
    this.right = data.right ? new TreeNode(data.right) : null;
    this.x = data.x || 0;
    this.y = data.y || 0;
    this.highlighted = data.highlighted || false;
    this.animating = data.animating || false;
  }

  // 创建示例二叉树用于演示
  static createExampleTree(): TreeNode {
    return new TreeNode({
      id: 1,
      value: 4,
      left: {
        id: 2,
        value: 2,
        left: { id: 4, value: 1 },
        right: { id: 5, value: 3 }
      },
      right: {
        id: 3,
        value: 7,
        left: { id: 6, value: 6 },
        right: { id: 7, value: 9 }
      }
    });
  }

  // 深拷贝树节点
  clone(): TreeNode {
    const newNode = new TreeNode({
      id: this.id,
      value: this.value,
      x: this.x,
      y: this.y,
      highlighted: this.highlighted,
      animating: this.animating
    });
    
    if (this.left) {
      newNode.left = this.left.clone();
    }
    
    if (this.right) {
      newNode.right = this.right.clone();
    }
    
    return newNode;
  }
} 