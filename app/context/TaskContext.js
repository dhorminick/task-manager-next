// app/context/TaskContext.js
"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [activeFilters, setActiveFilters] = useState({});

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
      setFilteredTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => {
    const newTask = {
      ...task,
      id: uuidv4(),
    };
    setTasks([...tasks, newTask]);
    applyFilters([...tasks, newTask], activeFilters);
  };

  const editTask = (id, updatedTask) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, ...updatedTask } : task
    );
    setTasks(updatedTasks);
    applyFilters(updatedTasks, activeFilters);
  };

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    applyFilters(updatedTasks, activeFilters);
  };

  const reorderTasks = (result) => {
    if (!result.destination) return;

    const items = Array.from(tasks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setTasks(items);
    applyFilters(items, activeFilters);
  };

  const filterTasks = (filters) => {
    setActiveFilters(filters);
    applyFilters(tasks, filters);
  };

  const clearFilters = () => {
    setActiveFilters({});
    setFilteredTasks(tasks);
  };

  const applyFilters = (tasksToFilter, filters) => {
    let filtered = [...tasksToFilter];
    if (filters.category) {
      filtered = filtered.filter((task) => task.category === filters.category);
    }
    if (filters.status) {
      filtered = filtered.filter((task) => task.status === filters.status);
    }
    setFilteredTasks(filtered);
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        editTask,
        deleteTask,
        reorderTasks,
        filteredTasks,
        filterTasks,
        clearFilters,
        activeFilters,
      }}
    >
      <DragDropContext onDragEnd={reorderTasks}>{children}</DragDropContext>
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error("useTasks must be used within a TaskProvider");
  }
  return context;
};
