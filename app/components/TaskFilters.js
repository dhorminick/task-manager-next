// app/components/TaskFilters.js
"use client";

import { useTasks } from "@/context/TaskContext";

export const TaskFilters = () => {
  const { filterTasks, clearFilters, activeFilters } = useTasks();

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-4">
      <h3 className="font-bold mb-2">Filters</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium  mb-1">Status</label>
          <select
            value={activeFilters.status || ""}
            onChange={(e) =>
              filterTasks({
                ...activeFilters,
                status: e.target.value || undefined,
              })
            }
            className="w-full p-2 border rounded"
          >
            <option value="">All Statuses</option>
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <select
            value={activeFilters.category || ""}
            onChange={(e) =>
              filterTasks({
                ...activeFilters,
                category: e.target.value || undefined,
              })
            }
            className="w-full p-2 border rounded"
          >
            <option value="">All Categories</option>
            <option value="work">Work</option>
            <option value="personal">Personal</option>
            <option value="shopping">Shopping</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>
      {(activeFilters.status || activeFilters.category) && (
        <button
          onClick={clearFilters}
          className="mt-2 text-sm text-blue-500 hover:text-blue-700"
        >
          Clear Filters
        </button>
      )}
    </div>
  );
};
