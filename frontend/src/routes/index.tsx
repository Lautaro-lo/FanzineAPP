import type { RouteObject } from 'react-router-dom';
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";

const routes: RouteObject[] = [
    {
        element: <MainLayout />,
        children: [
            { path: "/", element: <Home /> },
        ],
    }
];

export default routes;