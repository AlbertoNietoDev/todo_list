import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Tasks from './pages/tasks';
import Example from './pages/example';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Tasks />} />
        <Route path="/about" element={<Example />} />
      </Routes>
    </Router>
  );
}

export default App;