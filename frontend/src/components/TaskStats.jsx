import './TaskList.css';

const TaskStats = ({ tasks }) => {
  const stats = {
    total: tasks.length,
    completed: tasks.filter(t => t.status === 'Completed').length,
    inProgress: tasks.filter(t => t.status === 'In Progress').length,
    todo: tasks.filter(t => t.status === 'Todo').length,
  };

  return (
    <div className="task-stats">
      <div className="stat-card">
        <h3>{stats.total}</h3>
        <p>Total Tasks</p>
      </div>
      <div className="stat-card">
        <h3>{stats.todo}</h3>
        <p>To Do</p>
      </div>
      <div className="stat-card">
        <h3>{stats.inProgress}</h3>
        <p>In Progress</p>
      </div>
      <div className="stat-card">
        <h3>{stats.completed}</h3>
        <p>Completed</p>
      </div>
    </div>
  );
};

export default TaskStats;

