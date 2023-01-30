import { createBrowserRouter } from "react-router-dom";
import BillingModal from "../components/BillingModal";
import Main from "../layout/Main";
import BillingPage from "../pages/BillingPage";
import Home from "../pages/home/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
            {
                path: '/billingPage',
                element: <BillingPage></BillingPage>,
                loader: () => fetch('https://programming-job-task-server.vercel.app/billing-list')
            },
        ]
    }
])

export default router;