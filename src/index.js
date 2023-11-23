import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import App from './App';
// import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
// import Home from './pages/Home';
// import { ChakraProvider } from '@chakra-ui/react';
// import Blog from './pages/Blog';
// import About from './pages/About';
// import Login from './pages/Login';
// import Signup from './pages/Signup';
// import PostDetail from './pages/PostDetail';
// import PostEdit from './pages/PostEdit';
// import customTheme from './customTheme';
// import CommentInput from './components/CommentInput';
// import CommentCard from './components/CommentCard';



// const router = createBrowserRouter(
//   createRoutesFromElements(
//     [<Route
//       path='/'
//       element={<Home />}
//     />,
//     <Route
//       path='blog'
//       element={<Blog />}
//     />,
//     <Route
//       path='blog/tags/:tagId'
//       element={<Blog />}
//     />,
//     <Route
//       path='blog/search/:search'
//       element={<Blog />}
//     />,
//     <Route
//       path='blog/authors/:authorId'
//       element={<Blog />}
//     />,
//     <Route
//       path='about'
//       element={<About />}
//     />,
//     <Route
//       path='login'
//       element={<Login />}
//     />,
//     <Route
//       path='signup'
//       element={<Signup />}
//     />,
//     <Route
//       path='posts/:postId'
//       element={<PostDetail />}
//     />,
//     <Route
//       path='edit'
//       element={<PostEdit />}
//     />,
//     <Route
//       path='commentinput'
//       element={<CommentInput />}
//     />,
//     <Route
//       path='commentcard'
//       element={<CommentCard />}
//     />,
//     ]
//   )
// )

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    {/* <ChakraProvider theme={customTheme}>
      <RouterProvider router={router} />
    </ChakraProvider> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
