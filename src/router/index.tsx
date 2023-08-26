import { createBrowserRouter } from "react-router-dom";

import Layout from "@/Layout";
import Home from "@/pages/Home";

const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <Layout />,
            children: [
                {
                    path: "/",
                    element: <Home />,
                },
            ],
        },
    ],
    {
        basename: "/react-todolist-recoil/",
    }
);

export default router;
