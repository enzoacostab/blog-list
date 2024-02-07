import ReactDOM from 'react-dom/client'
import App from './App'
import axios from 'axios'
axios.defaults.baseURL=import.meta.env.VITE_API_URL ?? "http://localhost:3000"

ReactDOM.createRoot(document.getElementById('root')).render(<App />)
