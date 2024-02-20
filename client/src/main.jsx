import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import ContextProvider from './context/context-provider'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <ContextProvider>
      <App/>
    </ContextProvider>
  </Router>
)
