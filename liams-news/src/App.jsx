import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import UserProvider from './Components/UserProvider'
import Header from './Components/Header/Header'
import Articles from './Components/Home/Articles'
import './App.css'
import Article from "./Components/Article/Article";

function App() {
  return (
    <div>
      <UserProvider>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Articles />}></Route>
            <Route path="/article/:article_id" element={<Article />}></Route>
          </Routes>
        </Router>
      </UserProvider>
    </div>
  )
}

export default App
