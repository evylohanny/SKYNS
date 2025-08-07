import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Cadastro_login from "../pages/Cadastro_login";
import Perfil from "../pages/Perfil";

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
    
]);

export default router;