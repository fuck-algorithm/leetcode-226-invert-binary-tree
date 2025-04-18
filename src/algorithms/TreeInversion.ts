import { TreeNode } from '../models/TreeNode';

export interface Step {
  type: 'highlight' | 'swap' | 'unhighlight';
  nodeId?: number;
  message: string;
  timestamp: number;
}

export type AlgorithmType = 'recursive' | 'iterative-queue' | 'iterative-stack';

export class InversionAlgorithm {
  private steps: Step[] = [];
  private timestamp = 0;
  private algorithm: AlgorithmType;

  constructor(algorithm: AlgorithmType = 'recursive') {
    this.algorithm = algorithm;
  }

  // 生成翻转步骤
  generateSteps(tree: TreeNode): Step[] {
    this.steps = [];
    this.timestamp = 0;
    
    if (this.algorithm === 'recursive') {
      this.recursiveInvert(tree);
    } else if (this.algorithm === 'iterative-queue') {
      this.iterativeQueueInvert(tree);
    } else if (this.algorithm === 'iterative-stack') {
      this.iterativeStackInvert(tree);
    }
    
    return this.steps;
  }

  // 递归方法实现的树翻转
  private recursiveInvert(node: TreeNode | null): void {
    if (!node) return;
    
    // 高亮当前节点
    this.steps.push({
      type: 'highlight',
      nodeId: node.id,
      message: `访问节点 ${node.value}`,
      timestamp: this.timestamp
    });
    this.timestamp += 500;
    
    // 递归左子树
    if (node.left) {
      this.steps.push({
        type: 'highlight',
        nodeId: node.left.id,
        message: `递归进入左子树`,
        timestamp: this.timestamp
      });
      this.timestamp += 300;
      this.recursiveInvert(node.left);
    }
    
    // 递归右子树
    if (node.right) {
      this.steps.push({
        type: 'highlight',
        nodeId: node.right.id,
        message: `递归进入右子树`,
        timestamp: this.timestamp
      });
      this.timestamp += 300;
      this.recursiveInvert(node.right);
    }
    
    // 交换左右子节点
    this.steps.push({
      type: 'swap',
      nodeId: node.id,
      message: `交换节点 ${node.value} 的左右子节点`,
      timestamp: this.timestamp
    });
    this.timestamp += 700;
    
    // 取消高亮
    this.steps.push({
      type: 'unhighlight',
      nodeId: node.id,
      message: `完成节点 ${node.value} 的处理`,
      timestamp: this.timestamp
    });
    this.timestamp += 300;
  }

  // 迭代方法（队列）实现的树翻转
  private iterativeQueueInvert(root: TreeNode): void {
    if (!root) return;
    
    const queue: TreeNode[] = [root];
    
    this.steps.push({
      type: 'highlight',
      nodeId: root.id,
      message: '初始化队列，添加根节点',
      timestamp: this.timestamp
    });
    this.timestamp += 500;
    
    while (queue.length > 0) {
      const node = queue.shift()!;
      
      // 高亮当前处理的节点
      this.steps.push({
        type: 'highlight',
        nodeId: node.id,
        message: `从队列取出节点 ${node.value}`,
        timestamp: this.timestamp
      });
      this.timestamp += 300;
      
      // 添加子节点到队列
      if (node.left) {
        queue.push(node.left);
        this.steps.push({
          type: 'highlight',
          nodeId: node.left.id,
          message: `将左子节点 ${node.left.value} 添加到队列`,
          timestamp: this.timestamp
        });
        this.timestamp += 200;
      }
      
      if (node.right) {
        queue.push(node.right);
        this.steps.push({
          type: 'highlight',
          nodeId: node.right.id,
          message: `将右子节点 ${node.right.value} 添加到队列`,
          timestamp: this.timestamp
        });
        this.timestamp += 200;
      }
      
      // 交换左右子节点
      this.steps.push({
        type: 'swap',
        nodeId: node.id,
        message: `交换节点 ${node.value} 的左右子节点`,
        timestamp: this.timestamp
      });
      this.timestamp += 700;
      
      // 取消高亮
      this.steps.push({
        type: 'unhighlight',
        nodeId: node.id,
        message: `完成节点 ${node.value} 的处理`,
        timestamp: this.timestamp
      });
      this.timestamp += 300;
    }
  }

  // 迭代方法（栈）实现的树翻转
  private iterativeStackInvert(root: TreeNode): void {
    if (!root) return;
    
    const stack: TreeNode[] = [root];
    
    this.steps.push({
      type: 'highlight',
      nodeId: root.id,
      message: '初始化栈，添加根节点',
      timestamp: this.timestamp
    });
    this.timestamp += 500;
    
    while (stack.length > 0) {
      const node = stack.pop()!;
      
      // 高亮当前处理的节点
      this.steps.push({
        type: 'highlight',
        nodeId: node.id,
        message: `从栈顶取出节点 ${node.value}`,
        timestamp: this.timestamp
      });
      this.timestamp += 300;
      
      // 添加子节点到栈（先右后左，确保左子树先处理）
      if (node.right) {
        stack.push(node.right);
        this.steps.push({
          type: 'highlight',
          nodeId: node.right.id,
          message: `将右子节点 ${node.right.value} 添加到栈`,
          timestamp: this.timestamp
        });
        this.timestamp += 200;
      }
      
      if (node.left) {
        stack.push(node.left);
        this.steps.push({
          type: 'highlight',
          nodeId: node.left.id,
          message: `将左子节点 ${node.left.value} 添加到栈`,
          timestamp: this.timestamp
        });
        this.timestamp += 200;
      }
      
      // 交换左右子节点
      this.steps.push({
        type: 'swap',
        nodeId: node.id,
        message: `交换节点 ${node.value} 的左右子节点`,
        timestamp: this.timestamp
      });
      this.timestamp += 700;
      
      // 取消高亮
      this.steps.push({
        type: 'unhighlight',
        nodeId: node.id,
        message: `完成节点 ${node.value} 的处理`,
        timestamp: this.timestamp
      });
      this.timestamp += 300;
    }
  }
} 