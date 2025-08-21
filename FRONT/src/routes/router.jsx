import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Cadastro_login from "../pages/Cadastro_login";
import Perfil from "../pages/Perfil";
import Produtos from "../pages/Produtos";
import Gestão from "../pages/Gestão";
<<<<<<< HEAD
import Pedidos from "../pages/Pedidos";
=======
import Results from "../pages/Results.jsx";
>>>>>>> a71c87d76b0195942db744d031e01b0492654ba9

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />
    },
    {
        path: '/cadastro',
        element: <Cadastro_login/>
    },
    {
        path: '/perfil',
        element: <Perfil/>
    },
    {
        path: '/produtos',
        element: <Produtos />
    },
    {
        path: '/gestao',
        element: <Gestão />
    },
    {
<<<<<<< HEAD
        path: '/pedidos',
        element: <Pedidos/>
=======
        path: '/:search',
        element: <Results />
>>>>>>> a71c87d76b0195942db744d031e01b0492654ba9
    }
]);

export default router;