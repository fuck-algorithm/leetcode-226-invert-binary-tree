import { useState, useEffect, useCallback } from 'react';
import { Step } from '../algorithms/TreeInversion';

interface AnimationControllerProps {
  steps: Step[];
  onStepChange?: (index: number) => void;
  initialSpeed?: number;
}

interface AnimationController {
  playing: boolean;
  currentStepIndex: number;
  currentMessage: string;
  speed: number;
  play: () => void;
  pause: () => void;
  stepForward: () => void;
  stepBackward: () => void;
  reset: () => void;
  setSpeed: (speed: number) => void;
}

export const useAnimationController = ({
  steps,
  onStepChange,
  initialSpeed = 1
}: AnimationControllerProps): AnimationController => {
  const [playing, setPlaying] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(-1);
  const [speed, setSpeed] = useState(initialSpeed);
  const [currentMessage, setCurrentMessage] = useState('');

  // 当前步骤改变时更新消息
  useEffect(() => {
    if (currentStepIndex >= 0 && currentStepIndex < steps.length) {
      setCurrentMessage(steps[currentStepIndex].message);
      if (onStepChange) {
        onStepChange(currentStepIndex);
      }
    } else {
      setCurrentMessage('准备开始翻转二叉树的动画演示');
    }
  }, [currentStepIndex, steps, onStepChange]);

  // 播放控制
  useEffect(() => {
    if (!playing) return;
    
    if (currentStepIndex >= steps.length - 1) {
      setPlaying(false);
      return;
    }
    
    // 计算下一步的延迟时间
    const nextStep = steps[currentStepIndex + 1];
    const currentStep = steps[currentStepIndex];
    
    let delay = 1000; // 默认延迟1秒
    
    if (currentStep && nextStep) {
      // 如果有时间戳，使用时间戳的差值作为延迟
      delay = (nextStep.timestamp - currentStep.timestamp) / speed;
    }
    
    const timerId = setTimeout(() => {
      setCurrentStepIndex(prev => prev + 1);
    }, delay);
    
    return () => clearTimeout(timerId);
  }, [playing, currentStepIndex, steps, speed]);
  
  const play = useCallback(() => {
    if (currentStepIndex >= steps.length - 1) {
      setCurrentStepIndex(-1); // 如果已经到最后，从头开始
    }
    setPlaying(true);
  }, [currentStepIndex, steps.length]);
  
  const pause = useCallback(() => {
    setPlaying(false);
  }, []);
  
  const stepForward = useCallback(() => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    }
  }, [currentStepIndex, steps.length]);
  
  const stepBackward = useCallback(() => {
    if (currentStepIndex > -1) {
      setCurrentStepIndex(prev => prev - 1);
    }
  }, [currentStepIndex]);
  
  const reset = useCallback(() => {
    setPlaying(false);
    setCurrentStepIndex(-1);
  }, []);

  return {
    playing,
    currentStepIndex,
    currentMessage,
    speed,
    play,
    pause,
    stepForward,
    stepBackward,
    reset,
    setSpeed
  };
}; 