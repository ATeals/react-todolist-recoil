import { createBrowserRouter } from "react-router-dom";

import Layout from "../Layout";
import DD from "@/pages/DD";
import DragDrop from "@/pages/DragDrop";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <DD />,
            },
            {
                path: "/dnd",
                element: <DragDrop />,
            },
        ],
    },
]);

export default router;
