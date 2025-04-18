import React from 'react';
import { AlgorithmType } from '../algorithms/TreeInversion';
import './ControlPanel.css';

interface ControlPanelProps {
  playing: boolean;
  currentStep: number;
  totalSteps: number;
  algorithmType: AlgorithmType;
  onPlay: () => void;
  onPause: () => void;
  onStepForward: () => void;
  onStepBackward: () => void;
  onReset: () => void;
  onAlgorithmChange: (algorithm: AlgorithmType) => void;
  message: string;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  playing,
  currentStep,
  totalSteps,
  algorithmType,
  onPlay,
  onPause,
  onStepForward,
  onStepBackward,
  onReset,
  onAlgorithmChange,
  message
}) => {
  return (
    <div className="control-panel">
      <div className="algorithm-selector">
        <label htmlFor="algorithm-select">解法类型:</label>
        <select 
          id="algorithm-select" 
          value={algorithmType} 
          onChange={(e) => onAlgorithmChange(e.target.value as AlgorithmType)}
        >
          <option value="recursive">递归解法</option>
          <option value="iterative-queue">迭代解法 (队列)</option>
          <option value="iterative-stack">迭代解法 (栈)</option>
        </select>
      </div>
      
      <div className="playback-controls">
        <button onClick={onReset} disabled={playing}>
          重置
        </button>
        <button onClick={onStepBackward} disabled={playing || currentStep <= 0}>
          上一步
        </button>
        {playing ? (
          <button onClick={onPause}>
            暂停
          </button>
        ) : (
          <button onClick={onPlay} disabled={currentStep >= totalSteps - 1}>
            播放
          </button>
        )}
        <button onClick={onStepForward} disabled={playing || currentStep >= totalSteps - 1}>
          下一步
        </button>
      </div>
      
      <div className="progress-bar">
        <div className="progress-label">
          步骤: {currentStep + 1} / {totalSteps}
        </div>
        <progress value={currentStep + 1} max={totalSteps} />
      </div>
      
      <div className="message-box">
        {message}
      </div>
    </div>
  );
};

export default ControlPanel; 