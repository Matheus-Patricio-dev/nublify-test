import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthPage from './pages/authPage';
import TaskList from './pages/taskList';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/tasks" element={<TaskList />} />
      </Routes>
    </Router>
  );
};

export default App;
