import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Produtos from "../pages/Produtos";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />
    },
    {
        path: '/login',
        element: <Login/>
    },
    {
        path: '/produtos',
        element: <Produtos />
    }
]);

export default router;