import './App.css';
import { AppRouter } from './router/AppRouter';
import axios from "axios";

axios.defaults.baseURL = process.env.REACT_API_URL || "https://school-project-backend-production.up.railway.app/api";


function App() {
  return (
    <>
      <AppRouter />
    </>
  );
}
export default App;
