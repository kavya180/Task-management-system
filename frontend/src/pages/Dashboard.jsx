import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { taskService } from '../services/taskService';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import TaskStats from '../components/TaskStats';
import './Dashboard.css';

const Dashboard = ({ user, onLogout }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const data = await taskService.getTasks();
      setTasks(data);
      setLoading(false);
    } catch (error) {
      toast.error('Failed to load tasks. Please refresh the page.');
      setLoading(false);
    }
  };

  const handleCreate = async (taskData) => {
    try {
      const newTask = await taskService.createTask(taskData);
      setTasks([newTask, ...tasks]);
      setShowForm(false);
      toast.success('Task created successfully!');
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to create task';
      toast.error(message);
    }
  };

  const handleUpdate = async (id, taskData) => {
    try {
      const updatedTask = await taskService.updateTask(id, taskData);
      setTasks(tasks.map(task => task._id === id ? updatedTask : task));
      setEditingTask(null);
      toast.success('Task updated successfully!');
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to update task';
      toast.error(message);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await taskService.deleteTask(id);
        setTasks(tasks.filter(task => task._id !== id));
        toast.success('Task deleted successfully!');
      } catch (error) {
        const message = error.response?.data?.message || 'Failed to delete task';
        toast.error(message);
      }
    }
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'All') return true;
    return task.status === filter;
  });

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Loading your tasks...</p>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div>
          <h1>Task Manager</h1>
          <p>Welcome back, {user.name}!</p>
        </div>
        <button onClick={onLogout} className="btn-logout">Logout</button>
      </header>

      <TaskStats tasks={tasks} />

      <div className="dashboard-content">
        <div className="dashboard-actions">
          <button 
            onClick={() => {
              setShowForm(!showForm);
              setEditingTask(null);
            }} 
            className="btn-add"
          >
            {showForm ? 'Cancel' : 'Add New Task'}
          </button>
          <select 
            value={filter} 
            onChange={(e) => setFilter(e.target.value)} 
            className="filter-select"
          >
            <option>All</option>
            <option>Todo</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>
        </div>

        {showForm && (
          <TaskForm
            onSubmit={handleCreate}
            onCancel={() => setShowForm(false)}
          />
        )}

        {editingTask && (
          <TaskForm
            task={editingTask}
            onSubmit={(taskData) => handleUpdate(editingTask._id, taskData)}
            onCancel={() => setEditingTask(null)}
          />
        )}

        <TaskList
          tasks={filteredTasks}
          onEdit={setEditingTask}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default Dashboard;

