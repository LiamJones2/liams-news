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
import LoginSignup from "./Components/LoginSignup/LoginSignup";
import Topics from "./Components/Topics/Topics";
import TopicArticles from "./Components/TopicArticles/TopicArticles";
import NotFound from "./Components/NotFound/NotFound"

function App() {
  return (
    <div>
      <UserProvider>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Articles />}></Route>
            <Route path="/article/:article_id" element={<Article />}></Route>
            <Route path="/loginsignup" element={<LoginSignup />}></Route>
            <Route path="/topics" element={<Topics />}></Route>
            <Route path="/topicarticles/:topic" element={<TopicArticles />}></Route>
            <Route path="*"element={<NotFound/>} ></Route>
          </Routes>
        </Router>
      </UserProvider>
    </div>
  )
}

export default App
