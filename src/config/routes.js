import Welcome from "../pages/Welcome/Welcome";

import LayoutAdmin from "../layouts/LayoutAdmin";
import Login from "../pages/Login/Login";
import Home from "../pages/Home/Home";
import ListRol from "../pages/Rol/ListRol";
import AddRol from "../pages/Rol/AddRol";
import ListUsers from "../pages/Users/ListUsers";
import AddUser from "../pages/Users/AddUser";
import EditUser from "../pages/Users/EditUser";
import User from "../pages/Users/User";
import ListVac from "../pages/ControlVac/ListVac";
import ListControlNutri from "../pages/ControlNutri/ListControlNutri";
import AddControlNutri from "../pages/ControlNutri/AddControlNutri";
import AddControlCyD from "../pages/ControlCyD/AddControlCyD";
import ListControlCyD from "../pages/ControlCyD/ListControlCyD";
import AllUserControl from "../pages/ControlHome/AllUserControl";
import AddControlVac from "../pages/ControlVac/AddControlVac";

import Page from "../pages/Example/Page";


import NotFound404 from "../pages/NotFound404";


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
        path: "/admin",
        component: LayoutAdmin,
        exact: false,
        routes: [    
            {
                path: "/admin",
                exact: true,
                component: Home,
            },
            {
                path: "/admin/roles",
                exact: true,
                component: ListRol,
            },
            {
                path: "/admin/addRol",
                exact: true,
                component: AddRol,
            },
            {
                path: "/admin/users",
                exact: true,
                component: ListUsers,
            },  
            {
                path: "/admin/addUser",
                exact: true,
                component: AddUser,
            },  
            {
                path: "/admin/user",
                exact: true,
                component: User,
            },   
            {
                path: "/admin/editUser/:documento",
                exact: true,
                component: EditUser,
            },   
            {
                path: "/admin/addControlNutri",
                exact: true,
                component: AddControlNutri,
            },     
            {
                path: "/admin/addControlCyD",
                exact: true,
                component: AddControlCyD,
            },   
            {
                path: "/admin/listVaccines",
                exact: true,
                component: ListVac,
            },   
            {
                path: "/admin/listControlNutri",
                exact: true,
                component: ListControlNutri,
            }, 
            {
                path: "/admin/listControlCyD",
                exact: true,
                component: ListControlCyD,
            },
            {
                path: "/admin/listUserControl",
                exact: true,
                component: AllUserControl,
            },
            {
                path: "/admin/addControlVac",
                exact: true,
                component: AddControlVac,
            },
            {
                component: NotFound404,
            },                         
        ]
    }   
];

export default routes;