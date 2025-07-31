// App.jsx
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './routers/AppRouter'; // Adjust if your path is different
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
