import React, { useCallback, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { KeyboardShortcuts } from '../KeyboardShortcuts';
import { Preferences } from '../Preferences';
import { useMenuItem, Menu, Modal, FormModal } from '../Mui';
import { useBoolean } from '../../utils/useBoolean';
import {
  TaskListActionCreators,
  TaskActionCreators,
  AuthActionCreators,
  RootState
} from '../../store';
import Divider from '@material-ui/core/Divider';

interface Props {
  anchorEl: HTMLElement | null;
  onClose(): void;
}

const mapStateToProps = ({ task, taskList }: RootState) => ({
  ...taskList,
  ...task
});
const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      ...TaskListActionCreators,
      ...TaskActionCreators,
      ...AuthActionCreators
    },
    dispatch
  );

function useNotZero(initialVal: number) {
  const [value, setValue] = useState(initialVal);
  useEffect(() => {
    initialVal && setValue(initialVal);
  }, [initialVal]);

  return value;
}

function TaskListMenuComponent({
  anchorEl,
  onClose,
  tasks,
  completedTasks,
  taskLists,
  currentTaskList,
  currentTaskListId,
  sortByDate,
  delteTaskList,
  deleteCompletedTasks,
  updateTaskList,
  sortTasksByDate,
  logout
}: Props &
  ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>) {
  const MenuItem = useMenuItem(onClose);

  const [
    deleteCompletedTaskModalOpend,
    deleteCompletedTaskModal
  ] = useBoolean();
  const [deleteTaskListModalOpend, deleteTaskListModal] = useBoolean();
  const [renameTaskModalOpend, renameTaskModal] = useBoolean();
  const [keyboardShortcutsOpened, keyboardShortcuts] = useBoolean();
  const [preferencesOpened, preferences] = useBoolean();

  const totalTask = useNotZero(tasks.length);
  const numOfCompletedTask = useNotZero(completedTasks.length);

  const delteTaskListCallback = useCallback(
    () => currentTaskListId && delteTaskList(currentTaskListId),
    [currentTaskListId, delteTaskList]
  );

  const onDeleteTaskListCallback = useCallback(
    () => (!!tasks.length ? deleteTaskListModal.on() : delteTaskListCallback()),
    [deleteTaskListModal, delteTaskListCallback, tasks.length]
  );

  const deleteCompletedTasksCallback = useCallback(
    () => deleteCompletedTasks(completedTasks),
    [completedTasks, deleteCompletedTasks]
  );

  const renameTaskListCallback = useCallback(
    (title: string) =>
      updateTaskList({ tasklist: currentTaskListId, requestBody: { title } }),
    [currentTaskListId, updateTaskList]
  );

  if (!currentTaskList) {
    return null;
  }

  return (
    <>
      <Menu
        classes={{ paper: 'task-list-menu-paper' }}
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={onClose}
        MenuListProps={{}}
      >
        <div className="task-list-menu-title">Sort by</div>
        <MenuItem
          text="My order"
          selected={!sortByDate}
          onClick={() => sortTasksByDate(false)}
        />
        <MenuItem
          text="Date"
          selected={sortByDate}
          onClick={() => sortTasksByDate(true)}
        />
        <Divider />
        <MenuItem text="Rename list" onClick={renameTaskModal.on} />
        <MenuItem
          text="Delete list"
          disabled={!taskLists.length || taskLists[0].id === currentTaskListId}
          onClick={onDeleteTaskListCallback}
        />
        <MenuItem
          text="Delete all completed tasks"
          disabled={!completedTasks.length}
          onClick={deleteCompletedTaskModal.on}
        />
        <Divider />
        <MenuItem text="Keyboard shortcuts" onClick={keyboardShortcuts.on} />
        <MenuItem text="Preferences" onClick={preferences.on} />
        <MenuItem text="Logout" onClick={logout} />
      </Menu>
      <Modal
        title="Delete this list?"
        confirmLabel="Delete"
        open={deleteTaskListModalOpend}
        handleClose={deleteTaskListModal.off}
        handleConfirm={delteTaskListCallback}
      >
        Deleting this list will also delete {totalTask} task.
      </Modal>
      <Modal
        title="Delete all completed tasks?"
        confirmLabel="Delete"
        open={deleteCompletedTaskModalOpend}
        handleClose={deleteCompletedTaskModal.off}
        handleConfirm={deleteCompletedTasksCallback}
      >
        {numOfCompletedTask} completed task will be permanently removed.
      </Modal>
      <FormModal
        title="Rename list"
        defaultValue={currentTaskList ? currentTaskList.title : ''}
        open={renameTaskModalOpend}
        handleClose={renameTaskModal.off}
        handleConfirm={renameTaskListCallback}
      />
      <KeyboardShortcuts
        open={keyboardShortcutsOpened}
        handleClose={keyboardShortcuts.off}
      />
      <Preferences open={preferencesOpened} handleClose={preferences.off} />
    </>
  );
}

export const TaskListMenu = connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskListMenuComponent);
