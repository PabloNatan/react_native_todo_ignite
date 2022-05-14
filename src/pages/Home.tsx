import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';

import {Header} from '../components/Header';
import {Task, TasksList} from '../components/TasksList';
import {TodoInput} from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const task = {
      done: false,
      id: new Date().getTime(),
      title: newTaskTitle,
    };

    setTasks(prev => [...prev, task]);
  }

  function handleToggleTaskDone(id: number) {
    setTasks(oldTasks => {
      const updatedTasks = oldTasks.map(task => {
        if (task.id === id) {
          return {...task, done: !task.done};
        }
        return task;
      });

      return updatedTasks;
    });
  }

  function handleRemoveTask(id: number) {
    setTasks(oldTasks => oldTasks.filter(task => task.id !== id));
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB',
  },
});
