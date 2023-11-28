import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Home from './pages/Home';
import Blog from './pages/Blog';
import About from './pages/About';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { ChakraProvider } from '@chakra-ui/react';
import PostDetail from './pages/PostDetail';
import PostEdit from './pages/PostEdit';
import Navbar from './components/Home/Navbar';
import Footer from './components/Home/Footer';
import Topic from './pages/Topic';
import AuthorProfile from './pages/AuthorProfile';
import UserProfile from './pages/UserProfile';
import Oauth from './pages/Oauth';
import theme from './customTheme';
import { useEffect, useState } from 'react';


function App() {

  return (
    <ChakraProvider theme={theme}>
      <Navbar />
      <Router>
        <Routes>
          <Route exact path="/" Component={Home} />
          <Route exact path="/blog" Component={Blog} />
          <Route exact path="/blog/search/:search" Component={Blog} />
          <Route exact path="/posts/:postId" Component={PostDetail} />
          <Route exact path="/topics/:tagId" Component={Topic} />
          <Route exact path="/about" Component={About} />
          <Route exact path="/login" Component={Login} />
          <Route exact path="/signup" Component={Signup} />
          <Route exact path="/authors/:userId" Component={AuthorProfile} />
          <Route exact path="/edit" Component={PostEdit} />
          <Route exact path="/edit/:postId" Component={PostEdit} />
          <Route exact path="/profile" Component={UserProfile} />
          <Route exact path="/oauth" Component={Oauth} />
        </Routes>
      </Router>
      <Footer />
    </ChakraProvider>
  );
}

export default App;
