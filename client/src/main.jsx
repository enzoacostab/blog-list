import ReactDOM from 'react-dom/client'
import App from './App'
import axios from 'axios'
import { BrowserRouter as Router } from 'react-router-dom'
axios.defaults.baseURL=import.meta.env.VITE_API_URL ?? "http://localhost:3000"

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <App />
  </Router>
)
