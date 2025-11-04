import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Cadastro_login from "../pages/Cadastro_login";
import Perfil from "../pages/Perfil";
import Produtos from "../pages/Produtos";
import Gestão from "../pages/Gestão";
import Pedidos from "../pages/Pedidos";
import Results from "../pages/Results.jsx";
import Rastreio from "../pages/Rastreio.jsx";
import Pagamento from "../pages/Pagamento.jsx";

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
        path: '/produtocustomizavel',
        element: <Produtos tipo="customizavel" />
    },
    {
        path: '/produtocomum',
        element: <Produtos tipo="comum" />
    },
    {
        path: '/gestao',
        element: <Gestão />
    },
    {
        path: '/pedidos',
        element: <Pedidos/>
        
    },
    {
        path: '/results',
        element: <Results />
    },
    {
        path: '/rastreio/:id',
        element: <Rastreio />
    },
    {
        path: '/pagamento',
        element: <Pagamento />
    },
]);

export default router;