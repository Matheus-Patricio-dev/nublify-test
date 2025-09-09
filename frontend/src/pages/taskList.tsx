import { useState, useEffect } from "react";
import api from "../utils/api";
import { Calendar, Plus } from "lucide-react";
import TaskItem from "../components/taskItem";
import nublifyLogo from '../../public/icone-nubli-color.png'
import { addTaskSchema } from "../validation/taskSchema";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";


interface Task {
  id: number;
  title: string;
  status: "PENDING" | "COMPLETED";
  // outras propriedades que usa
}

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [filter, setFilter] = useState<"ALL" | "PENDING" | "COMPLETED">("ALL");
  const [isLoading, setIsLoading] = useState(true);
  const [formErrors, setFormErrors] = useState<{ title?: string }>({});
  const navigate = useNavigate()


  useEffect(() => {
    setIsLoading(true);
    api.get("/tasks")
      .then((res) => {
        setTasks(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  }, []);

  const addTask = async () => {
    if (!title.trim()) return;
    
    const payload = {
        title: title.trim(), 
        description: description.trim()
    }


    try {
      // Validação Yup
      await addTaskSchema.validate(payload, { abortEarly: false });
      setFormErrors({}); // limpa erros

      const res = await api.post("/tasks", payload);
      setTasks([res.data, ...tasks]);
      setTitle("");
      setDescription("");
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        const errors: { title?: string } = {};
        err.inner.forEach((e) => {
          if (e.path) errors[e.path as "title"] = e.message;
        });
        setFormErrors(errors);
      } else {
        console.error(err);
      }
    }
  };

  const toggleTask = async (id: number) => {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;
    
    const payload = {
        ...task,
        status: task.status === "PENDING" ? "COMPLETED" : "PENDING",
    }

    try {
      const res = await api.put(`/tasks/${id}`, payload);      
      setTasks(tasks.map((t) => (t.id === id ? res.data : t)));
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTask = async (id: number) => {
    try {
      await api.delete(`/tasks/${id}`);
      setTasks(tasks.filter((t) => t.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const updateTask = async (id: number, newTitle: string, newDesc?: string) => {
    try {
      const task = tasks.find(t => t.id === id);
      if (!task) return;

      const payload = {
        ...task,
        title: newTitle,
        description: newDesc,
      }
      console.log(payload)

      const res = await api.put(`/tasks/${id}`, payload);
      setTasks(tasks.map((t) => (t.id === id ? res.data : t)));
    } catch (err) {
      console.error(err);
    }
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === "ALL") return true;
    return task.status === filter;
  });

  const completedCount = tasks.filter(t => t.status === "COMPLETED").length;
  const pendingCount = tasks.filter(t => t.status === "PENDING").length;

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      addTask();
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // remove o JWT
    navigate("/"); // vai para a página de login
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando suas tarefas...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-4xl mx-auto px-4 py-6 sm:px-6 sm:py-8">
        {/* Header */}
        <div className="text-center mb-8">
            <div className="flex flex-col items-center">
                <img src={nublifyLogo} alt="logo Nublify" className="w-20" />
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                    Nublify todo
                </h1>
                <p className="text-gray-600 text-sm sm:text-base">
                    Organize as tarefas da nublify efiecientemente!
                </p>
            </div>
        </div>

        {/* Add Task Form */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 mb-8">
          <div className="flex justify-between items-center ">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Plus size={20} className="text-yellow-500" />
              Nova Tarefa
            </h2>
            <button
              onClick={handleLogout}
              className="text-md text-gray-900 mb-4 flex items-center gap-2 cursor-pointer hover:text-red-500"
            >
              Deslogar
            </button>
          </div>
          <div className="space-y-4">
            <input
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition-all duration-200 text-sm sm:text-base"
              type="text"
              placeholder="Digite o título da sua tarefa..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            {formErrors.title && (
                <p className="text-sm text-red-600 mt-1">{formErrors.title}</p>
            )}
            <textarea
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition-all duration-200 text-sm sm:text-base resize-none"
              placeholder="Adicione uma descrição (opcional)..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              onKeyPress={handleKeyPress}
              rows={3}
            />
            <button
              onClick={addTask}
              disabled={!title.trim()}
              className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-400 text-white rounded-lg hover:from-yellow-500 hover:to-orange-500 hover:cursor-pointer disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-200 font-medium flex items-center justify-center gap-2"
            >
              <Plus size={20} />
              Adicionar Tarefa
            </button>
            {title.trim() && (
              <p className="text-xs text-gray-500">
                💡 Pressione Cmd/Ctrl + Enter para adicionar rapidamente
              </p>
            )}
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {[
            { key: "ALL", label: "Todas", count: tasks.length },
            { key: "PENDING", label: "Pendentes", count: pendingCount },
            { key: "COMPLETED", label: "Concluídas", count: completedCount }
          ].map(({ key, label, count }) => (
            <button
              key={key}
              onClick={() => setFilter(key as any)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                filter === key
                  ? "bg-yellow-400 text-white shadow-md hover:cursor-pointer"
                  : "bg-white text-gray-600 hover:bg-gray-50 hover:cursor-pointer border border-gray-200"
              }`}
            >
              {label} ({count})
            </button>
          ))}
        </div>

        {/* Task List */}
        <div className="space-y-3">
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={toggleTask}
                onDelete={deleteTask}
                onUpdate={updateTask}
              />
            ))
          ) : (
            <div className="text-center py-12">
              <Calendar size={48} className="text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg mb-2">
                {filter === "ALL" ? "Nenhuma tarefa encontrada" :
                 filter === "PENDING" ? "Nenhuma tarefa pendente" :
                 "Nenhuma tarefa concluída"}
              </p>
              <p className="text-gray-400 text-sm">
                {filter === "ALL" ? "Adicione sua primeira tarefa acima!" :
                 filter === "PENDING" ? "Que tal adicionar uma nova tarefa?" :
                 "Continue trabalhando nas suas tarefas pendentes!"}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        {tasks.length > 0 && (
          <div className="text-center mt-8 pt-8 border-t border-gray-200">
            <p className="text-gray-500 text-sm">
              {completedCount > 0 && pendingCount === 0 ? (
                "🎉 Parabéns! Todas as tarefas foram concluídas!"
              ) : (
                `Continue assim! Você já concluiu ${Math.round((completedCount / tasks.length) * 100)}% das suas tarefas.`
              )}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskList;