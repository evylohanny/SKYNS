import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Cadastro_login from "../pages/Cadastro_login";
import Perfil from "../pages/Perfil";
import Produtos from "../pages/Produtos";
import Gestão from "../pages/Gestão";
import Results from "../pages/Results.jsx";

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
        path: '/:search',
        element: <Results />
    }
]);

export default router;