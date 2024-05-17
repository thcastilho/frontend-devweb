import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import "@fontsource/outfit";
import "bootstrap-icons/font/bootstrap-icons.css";
import LoginScreen from "./screens/LoginScreen"
import Home from './screens/Home';
import ErrorScreen from "./screens/ErrorScreen"
import CadastrarScreen from './screens/CadastrarScreen';
import UserData from './screens/UserData';
import AdminPanel from './screens/AdminPanel';
import Logout from './screens/Logout';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      /*{
        path: "sobre",
        element: <About name="produto 1" />
      },
      {
        path: "comprar",
        element: <Comprar />
      },
      {
        path: "sobrenos",
        element: <SobreNos />
      },
      {
        path: "itensapi",
        element: <ItensAPI />
      },
      {
        path: "itensapi/:id",
        element: <ItemDetails />
      },*/
      {
        path: "/login",
        element: <LoginScreen />
      },
      {
        path: "/registrar",
        element: <CadastrarScreen />
      },
      {
        path: "/my-data",
        element: <UserData />
      },
      {
        path: "/logout",
        element: <Logout />
      },
      {
        path: "/admin-panel",
        element: <AdminPanel />
      }
      /*,
      {
        path: "/generos",
        element: <GeneroScreen />
      },
      {
        path: "/searchgenero",
        element: <SearchGeneros />
      },
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