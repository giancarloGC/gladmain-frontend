import Welcome from "../pages/Welcome/Welcome";

import LayoutAdmin from "../layouts/LayoutAdmin";
import Login from "../pages/Login/Login";
import Home from "../pages/Home/Home";
import ListRol from "../pages/Rol/ListRol";
import AddRol from "../pages/Rol/AddRol";
import EditRol from "../pages/Rol/EditRol";
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
import AddControlFollow from "../pages/ControlFollow/AddControlFollow";
import AddInfantIncome from "../pages/ControlFollow/AddInfantIncome";

import StatisticNutri from "../pages/ControlNutri/StatisticNutri";

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
                path: "/admin/editRol/:idRol",
                exact: true,
                component: EditRol
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
                path: "/admin/listVaccines/:documento",
                exact: true,
                component: ListVac,
            },
            {
                path: "/admin/StatisticNutri",
                exact: true,
                component: StatisticNutri,                
            },   
            {
                path: "/admin/listControlNutri",
                exact: true,
                component: ListControlNutri,
            }, 
            {
                path: "/admin/listControlCyD/:documento",
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
                path: "/admin/addControlFollow",
                exact: true,
                component: AddControlFollow,
            },
            {
                path: "/admin/addInfantIncome",
                exact: true,
                component: AddInfantIncome,
            }  
                       
        ]
    }   
];

export default routes;