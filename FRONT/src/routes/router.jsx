import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
<<<<<<< HEAD
import Cadastro_login from "../pages/Cadastro_login";
import Perfil from "../pages/Perfil";
=======
import Login from "../pages/Login";
import Produtos from "../pages/Produtos";
>>>>>>> 99a2fdefd8d0978434129313e2dad1415d1f1267

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />
    },
    {
<<<<<<< HEAD
        path: '/cadastro',
        element: <Cadastro_login/>
    },
    {
        path: '/perfil',
        element: <Perfil/>
    },
    
=======
        path: '/login',
        element: <Login/>
    },
    {
        path: '/produtos',
        element: <Produtos />
    }
>>>>>>> 99a2fdefd8d0978434129313e2dad1415d1f1267
]);

export default router;