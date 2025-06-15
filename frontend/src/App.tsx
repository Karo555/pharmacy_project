import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppRouter from './router/AppRouter';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </Router>
    );
};

export default App;
