// app/components/TaskList.js
"use client";

import { useTasks } from "@/context/TaskContext";
import { TaskCard } from "./TaskCard";
import { Droppable } from "react-beautiful-dnd";

export const TaskList = () => {
  const { filteredTasks } = useTasks();

  return (
    <div className="mt-6">
      <Droppable droppableId="tasks">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="space-y-2"
          >
            {filteredTasks.map((task, index) => (
              <TaskCard key={task.id} task={task} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TaskList;
