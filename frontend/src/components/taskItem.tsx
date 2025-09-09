import React, { useState } from "react";
import { Check, X, Edit3, Trash2, CheckCircle, Circle } from "lucide-react";



interface Task {
  id: number;
  title: string;
  description?: string;
  status: "PENDING" | "COMPLETED";
}

interface TaskItemProps {
  task: Task;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onUpdate: (id: number, title: string, description?: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || "");

  const handleSave = () => {
    if (title.trim()) {
      onUpdate(task.id, title, description);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setTitle(task.title);
    setDescription(task.description || "");
    setIsEditing(false);
  };

  return (
    <div className={`group bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6 mb-3 transition-all duration-300 hover:shadow-md hover:border-gray-200 ${
      task.status === "COMPLETED" ? "bg-gradient-to-r from-yellow-50 to-emerald-50 border-yellow-200" : ""
    }`}>
      {isEditing ? (
        <div className="space-y-3">
          <input
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition-all duration-200 text-sm sm:text-base"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Título da tarefa"
            autoFocus
          />
          <textarea
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition-all duration-200 text-sm sm:text-base resize-none"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Descrição (opcional)"
            rows={2}
          />
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            <button
              onClick={handleSave}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-yellow-500 hover:text-black transition-colors duration-200 text-sm font-medium"
            >
              <Check size={16} />
              Salvar
            </button>
            <button
              onClick={handleCancel}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200 text-sm font-medium"
            >
              <X size={16} />
              Cancelar
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-start gap-4">
          <button
            onClick={() => onToggle(task.id)}
            className={`flex-shrink-0 mt-1 transition-colors duration-200 ${
              task.status === "COMPLETED" ? "text-orange-500" : "text-gray-400 hover:text-yellow-400"
            }`}
          >
            {task.status === "COMPLETED" ? <CheckCircle size={20} /> : <Circle size={20} />}
          </button>
          
          <div className="flex-1 min-w-0">
            <h3 className={`text-base sm:text-lg font-semibold mb-1 transition-all duration-200 ${
              task.status === "COMPLETED" 
                ? "line-through text-gray-500" 
                : "text-gray-900"
            }`}>
              {task.title}
            </h3>
            {task.description && (
              <p className={`text-sm text-gray-600 break-words ${
                task.status === "COMPLETED" ? "line-through opacity-75" : ""
              }`}>
                {task.description}
              </p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-1 sm:gap-2 opacity-100">
            <button
              onClick={() => setIsEditing(true)}
              className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
              title="Editar"
            >
              <Edit3 size={16} />
            </button>
            <button
              onClick={() => onDelete(task.id)}
              className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
              title="Excluir"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskItem;