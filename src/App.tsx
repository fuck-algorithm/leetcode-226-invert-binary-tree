import { useState, useEffect } from 'react';
import './App.css';
import { TreeNode } from './models/TreeNode';
import { InversionAlgorithm, Step, AlgorithmType } from './algorithms/TreeInversion';
import { useAnimationController } from './utils/AnimationController';
import TreeCanvas from './components/TreeCanvas';
import ControlPanel from './components/ControlPanel';

function App() {
  const [algorithmType, setAlgorithmType] = useState<AlgorithmType>('recursive');
  const [tree, setTree] = useState<TreeNode>(TreeNode.createExampleTree());
  const [steps, setSteps] = useState<Step[]>([]);
  
  // 当算法类型改变时，重新生成步骤
  useEffect(() => {
    const algorithm = new InversionAlgorithm(algorithmType);
    const generatedSteps = algorithm.generateSteps(tree);
    setSteps(generatedSteps);
  }, [algorithmType, tree]);
  
  // 使用动画控制器
  const {
    playing,
    currentStepIndex,
    currentMessage,
    play,
    pause,
    stepForward,
    stepBackward,
    reset
  } = useAnimationController({ steps });
  
  // 处理算法类型变化
  const handleAlgorithmChange = (newType: AlgorithmType) => {
    reset();
    setAlgorithmType(newType);
  };
  
  // 重置树到初始状态
  const resetTree = () => {
    setTree(TreeNode.createExampleTree());
  };
  
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>LeetCode 226: 翻转二叉树动画演示</h1>
        <p>可视化展示不同解法的执行过程</p>
      </header>
      
      <main className="app-content">
        <ControlPanel
          playing={playing}
          currentStep={currentStepIndex}
          totalSteps={steps.length}
          algorithmType={algorithmType}
          onPlay={play}
          onPause={pause}
          onStepForward={stepForward}
          onStepBackward={stepBackward}
          onReset={() => {
            reset();
            resetTree();
          }}
          onAlgorithmChange={handleAlgorithmChange}
          message={currentMessage}
        />
        
        <TreeCanvas
          tree={tree}
          steps={steps}
          currentStepIndex={currentStepIndex}
          width={800}
          height={500}
        />
      </main>
      
      <footer className="app-footer">
        <p>
          <a href="https://github.com/your-username/leetcode-226-invert-binary-tree" target="_blank" rel="noopener noreferrer">
            查看源码
          </a> | <a href="https://leetcode.com/problems/invert-binary-tree/" target="_blank" rel="noopener noreferrer">
            LeetCode 226 题目
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;
