import React from "react";

interface TaskInputProps {
  taskName: string;
  setTaskName: (e: string) => void;
}

export const InputTaskName = (props: TaskInputProps) => {
  const { taskName, setTaskName } = props;
  return (
    <input
      placeholder="タスク名: 本を読む"
      value={taskName}
      onChange={(e) => setTaskName(e.target.value)}
    />
  );
};
