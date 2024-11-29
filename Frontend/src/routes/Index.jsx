import {createBrowserRouter} from "react-router-dom";
import Home from "../pages/Home";
import App from "../App";
import SearchPage from "../pages/SearchPage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Forgetpassword from "../pages/Forgotpassword";
import OtpVerification from "../pages/OtpVerification";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children : [
            {
                path: "",
                element:<Home/>
            },
            {
                path: "search",
                element: <SearchPage/>
            },
            {
                path: "login",
                element: <Login/>
            },
            {
                path: "register",
                element: <Register/>
            },
            {
                path: "forgot-password",
                element: <Forgetpassword/>
            },
            {
                path: "verification-otp",
                element: <OtpVerification/>
            }
        ]
    }
])

export default router;