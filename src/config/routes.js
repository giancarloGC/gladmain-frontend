import Welcome from "../pages/Welcome/Welcome";
import Login from "../pages/Login/Login";
import Home from "../pages/Home/Home";

const routes = [
    {
        path: "/",
        exact: true,
        component: Welcome,
    },
    {
        path: "/login",
        exact: true,
        component: Login,
    },    
    {
        path: "/home",
        exact: true,
        component: Home,
    },   
];

export default routes;