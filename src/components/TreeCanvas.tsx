import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';
import { TreeNode } from '../models/TreeNode';
import { Step } from '../algorithms/TreeInversion';
import './TreeCanvas.css';

interface TreeCanvasProps {
  tree: TreeNode;
  steps: Step[];
  currentStepIndex: number;
  width: number;
  height: number;
}

interface NodePosition {
  id: number;
  x: number;
  y: number;
  value: number;
  highlighted: boolean;
  animating: boolean;
}

const TreeCanvas: React.FC<TreeCanvasProps> = ({ 
  tree, 
  steps, 
  currentStepIndex, 
  width = 800, 
  height = 500 
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [positions, setPositions] = useState<NodePosition[]>([]);
  const [links, setLinks] = useState<{source: NodePosition, target: NodePosition}[]>([]);
  
  // 更新节点位置
  const updatePositions = () => {
    const nodePositions: NodePosition[] = [];
    const linkData: {source: NodePosition, target: NodePosition}[] = [];
    
    // 递归计算节点位置
    const calculatePositions = (
      node: TreeNode | null, 
      depth: number = 0, 
      index: number = 0, 
      totalWidth: number = width
    ) => {
      if (!node) return null;
      
      const horizontalSpacing = totalWidth / Math.pow(2, depth + 1);
      const x = horizontalSpacing + index * horizontalSpacing * 2;
      const y = depth * 100 + 100;
      
      const nodePos: NodePosition = {
        id: node.id,
        x,
        y,
        value: node.value,
        highlighted: node.highlighted,
        animating: node.animating
      };
      
      nodePositions.push(nodePos);
      
      if (node.left) {
        const leftPos = calculatePositions(
          node.left, 
          depth + 1, 
          index * 2, 
          totalWidth
        );
        if (leftPos) {
          linkData.push({ source: nodePos, target: leftPos });
        }
      }
      
      if (node.right) {
        const rightPos = calculatePositions(
          node.right, 
          depth + 1, 
          index * 2 + 1, 
          totalWidth
        );
        if (rightPos) {
          linkData.push({ source: nodePos, target: rightPos });
        }
      }
      
      return nodePos;
    };
    
    calculatePositions(tree);
    setPositions(nodePositions);
    setLinks(linkData);
  };
  
  // 初始化画布
  useEffect(() => {
    updatePositions();
  }, [tree]);
  
  // 处理动画步骤
  useEffect(() => {
    if (currentStepIndex < 0 || !steps.length) return;
    
    const currentStep = steps[currentStepIndex];
    if (!currentStep || !currentStep.nodeId) return;
    
    const updatedTree = applyStepToTree(tree.clone(), currentStep);
    updatePositions();
    
  }, [currentStepIndex, steps]);
  
  // 将步骤应用到树上
  const applyStepToTree = (treeClone: TreeNode, step: Step): TreeNode => {
    const updateNode = (node: TreeNode | null): TreeNode | null => {
      if (!node) return null;
      
      if (node.id === step.nodeId) {
        if (step.type === 'highlight') {
          node.highlighted = true;
        } else if (step.type === 'unhighlight') {
          node.highlighted = false;
        } else if (step.type === 'swap') {
          node.animating = true;
          // 交换左右子树
          const temp = node.left;
          node.left = node.right;
          node.right = temp;
        }
        return node;
      }
      
      if (node.left) {
        node.left = updateNode(node.left) as TreeNode;
      }
      
      if (node.right) {
        node.right = updateNode(node.right) as TreeNode;
      }
      
      return node;
    };
    
    return updateNode(treeClone) || treeClone;
  };
  
  // 渲染画布
  useEffect(() => {
    if (!svgRef.current || !positions.length) return;
    
    const svg = d3.select(svgRef.current);
    
    // 清空画布
    svg.selectAll('*').remove();
    
    // 绘制连线
    const linkGroup = svg.append('g').attr('class', 'links');
    links.forEach(link => {
      linkGroup.append('path')
        .attr('d', `M${link.source.x},${link.source.y} L${link.target.x},${link.target.y}`)
        .attr('stroke', '#999')
        .attr('stroke-width', 2)
        .attr('fill', 'none');
    });
    
    // 绘制节点
    const nodeGroup = svg.append('g').attr('class', 'nodes');
    positions.forEach(node => {
      const circle = nodeGroup.append('g')
        .attr('transform', `translate(${node.x}, ${node.y})`)
        .attr('class', `node ${node.highlighted ? 'highlighted' : ''} ${node.animating ? 'animating' : ''}`);
      
      circle.append('circle')
        .attr('r', 25)
        .attr('fill', node.highlighted ? '#ffcccb' : '#add8e6')
        .attr('stroke', node.highlighted ? '#ff6666' : '#4682b4')
        .attr('stroke-width', 2);
      
      circle.append('text')
        .attr('text-anchor', 'middle')
        .attr('dy', '0.3em')
        .attr('font-size', '16px')
        .text(node.value);
    });
    
  }, [positions, links]);
  
  return (
    <div className="tree-canvas-container">
      <svg ref={svgRef} width={width} height={height} />
    </div>
  );
};

export default TreeCanvas; 