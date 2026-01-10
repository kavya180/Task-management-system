import { FaEdit, FaTrash } from 'react-icons/fa';
import './TaskList.css';

const TaskList = ({ tasks, onEdit, onDelete }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return '#ff6b6b';
      case 'Medium': return '#ffa500';
      case 'Low': return '#51cf66';
      default: return '#ccc';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return '#51cf66';
      case 'In Progress': return '#4dabf7';
      case 'Todo': return '#ffd43b';
      default: return '#ccc';
    }
  };

  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <p>No tasks found. Create your first task to get started!</p>
      </div>
    );
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <div key={task._id} className="task-card">
          <div className="task-header">
            <h3>{task.title}</h3>
            <div className="task-actions">
              <button 
                onClick={() => onEdit(task)} 
                className="btn-icon"
                title="Edit task"
              >
                <FaEdit />
              </button>
              <button 
                onClick={() => onDelete(task._id)} 
                className="btn-icon btn-delete"
                title="Delete task"
              >
                <FaTrash />
              </button>
            </div>
          </div>
          
          {task.description && (
            <p className="task-description">{task.description}</p>
          )}
          
          <div className="task-meta">
            <span className="task-category">{task.category}</span>
            <span
              className="task-priority"
              style={{ backgroundColor: getPriorityColor(task.priority) }}
            >
              {task.priority}
            </span>
            <span
              className="task-status"
              style={{ backgroundColor: getStatusColor(task.status) }}
            >
              {task.status}
            </span>
          </div>
          
          {task.dueDate && (
            <p className="task-date">
              Due: {new Date(task.dueDate).toLocaleDateString()}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default TaskList;

