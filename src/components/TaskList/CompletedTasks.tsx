import React, { useMemo } from 'react';
import { CompletedTask } from '../Task';
import { Schema$Task } from '../../typings';
import { useBoolean } from '../../utils/useBoolean';
import IconButton from '@material-ui/core/IconButton';
import ExpandIcon from '@material-ui/icons/ExpandLess';
import CollapseIcon from '@material-ui/icons/ExpandMore';

interface Props {
  completedTasks: Schema$Task[];
  deleteTask(task: Schema$Task): void;
  toggleCompleted(task: Schema$Task): void;
}

export function CompletedTasks({
  completedTasks,
  deleteTask,
  toggleCompleted
}: Props) {
  if (!completedTasks.length) {
    return null;
  }
  const [expanded, { toggle }] = useBoolean(false);
  const Icon = useMemo(() => (expanded ? CollapseIcon : ExpandIcon), [
    expanded
  ]);

  return (
    <div className="completed-tasks">
      <div className="completed-tasks-header" onClick={toggle}>
        Completed ({completedTasks.length})
        <IconButton>
          <Icon fontSize="default" />
        </IconButton>
      </div>
      <div
        className="completed-tasks-content"
        style={{ height: expanded ? 'auto' : 0 }}
      >
        {completedTasks.map(task => {
          return (
            <CompletedTask
              key={task.uuid}
              task={task}
              deleteTask={deleteTask}
              toggleCompleted={toggleCompleted}
            />
          );
        })}
      </div>
    </div>
  );
}