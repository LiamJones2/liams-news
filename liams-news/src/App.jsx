import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import UserProvider from './Components/UserProvider'
import Header from './Components/Header/Header'
import Articles from './Components/Home/Articles'
import './App.css'

function App() {
  return (
    <div>
      <UserProvider>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Articles />}></Route>
          </Routes>
        </Router>
      </UserProvider>
    </div>
  )
}

export default App
