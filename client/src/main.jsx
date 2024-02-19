import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import ContextProvider from './context/context-provider'
import { Suspense, lazy } from 'react'
const App = lazy(() => import('./App'))
import Loader from './components/Loader'

ReactDOM.createRoot(document.getElementById('root')).render(
  <ContextProvider>
    <Router>
      <Suspense fallback={<Loader/>}>
        <App/>
      </Suspense>
    </Router>
  </ContextProvider>
)
