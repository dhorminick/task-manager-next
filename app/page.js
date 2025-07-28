// app/page.js
"use client";

import { TaskProvider } from "@/context/TaskContext";
import { TaskForm } from "@/components/TaskForm";
import { TaskList } from "@/components/TaskList";
import { TaskFilters } from "@/components/TaskFilters";

export default function TaskDashboard() {
  return (
    <TaskProvider>
      <div className="min-h-screen bg-gray-100 py-8">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-center mb-8">
            Task Management Dashboard
          </h1>
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Add New Task</h2>
              <TaskForm />
            </div>
            <TaskFilters />
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Your Tasks</h2>
              <TaskList />
            </div>
          </div>
        </div>
      </div>
    </TaskProvider>
  );
}
