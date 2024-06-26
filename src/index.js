import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import "@fontsource/outfit";
import "bootstrap-icons/font/bootstrap-icons.css";
import LoginScreen from "./screens/LoginScreen"
import Home from './screens/Home';
import ErrorScreen from "./screens/ErrorScreen"
import CadastrarScreen from './screens/CadastrarScreen';
import UserData from './screens/UserData';
import AdminPanel from './screens/AdminPanel';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import MusicDetails from './screens/MusicDetails';
import "@fortawesome/fontawesome-free/css/all.min.css";
import CriarPost from './screens/CriarPost';
import CriarGenero from './screens/CriarGenero';
import ExcluirPost from './screens/ExcluirPost';
import ExcluirGenero from './screens/ExcluirGenero';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/login",
        element: <LoginScreen />
      },
      {
        path: "/registrar",
        element: <CadastrarScreen />
      },
      {
        path: "/profile",
        element: <UserData />
      },
      {
        path: "admin-panel",
        element: <AdminPanel />
      },
      {
        path:"/post/:id",
        element: <MusicDetails />
      },
      {
        path: "/my-data",
        element: <UserData />
      },
      {
        path: "/admin-panel",
        element: <AdminPanel />
      },
      {
        path: "/criar-post",
        element: <CriarPost />
      },
      {
        path: "/criar-genero",
        element: <CriarGenero />
      },
      {
        path: "/excluir-post",
        element: <ExcluirPost />
      },
      {
        path: "/excluir-genero",
        element: <ExcluirGenero />
      }
      /*,
      {
        path: "oldpage",
        element: <Navigate to="/" />
      }*/
    ],
    errorElement: <ErrorScreen />
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router}/>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
