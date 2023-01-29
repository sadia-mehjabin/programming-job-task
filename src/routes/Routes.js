import { createBrowserRouter } from "react-router-dom";
import BillingModal from "../components/BillingModal";
import Main from "../layout/Main";
import AddABill from "../pages/AddABill";
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
                path: '/addABill',
                element: <AddABill></AddABill>
            },
            {
                path: '/billingPage',
                element: <BillingPage></BillingPage>,
                loader: () => fetch('http://localhost:5000/billing-list')
            },
        ]
    }
])

export default router;