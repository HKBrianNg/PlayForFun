import React, { useState, useEffect } from 'react';

const Day2 = () => {
  // 打卡状态
  const [isCompleted, setIsCompleted] = useState(false);
  // 当天学习内容
  const [learnContent, setLearnContent] = useState([]);

  // 加载 Day2 学习内容
  useEffect(() => {
    const content = [
      "复习 React 组件基础",
      "学习 Props 传值",
      "练习列表渲染",
      "完成一个小练习"
    ];
    setLearnContent(content);
  }, []);

  // 打卡切换
  const handleComplete = () => {
    setIsCompleted(!isCompleted);
  };

  return (
    <div>
      <h2>Day 2 学习任务</h2>
      <p>状态：{isCompleted ? "已完成" : "未完成"}</p>

      <h3>今日内容：</h3>
      <ul>
        {learnContent.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      <button onClick={handleComplete}>
        {isCompleted ? "取消打卡" : "完成打卡"}
      </button>
    </div>
  );
};

export default Day2;