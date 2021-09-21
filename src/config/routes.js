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
import EditControlCD from "../pages/ControlCyD/EditControlCD";
import ListControlCyD from "../pages/ControlCyD/ListControlCyD";
import AllUserControl from "../pages/ControlHome/AllUserControl";
import AddControlVac from "../pages/ControlVac/AddControlVac";
import EditControlVac from "../pages/ControlVac/EditControlVac";
import AddControlFollow from "../pages/ControlFollow/AddControlFollow";
import AddInfantIncome from "../pages/ControlFollow/AddInfantIncome";
import EditControlFollow from "../pages/ControlFollow/EditControlFollow";
import EditInfantIncome from "../pages/ControlFollow/EditInfantIncome";
import AddControlRemission from "../pages/ControlFollow/AddControlRemission";
import EditControlRemission from "../pages/ControlFollow/EditControlRemission";
import ListControlRemission from "../pages/ControlFollow/ListControlRemission";
import AddCommitment from "../pages/ControlFollow/AddCommitment";
import EditCommitment from "../pages/ControlFollow/EditCommitment";
import ListFollowUpChecks from "../pages/ControlFollow/ListFollowUpChecks";
import StatisticNutri from "../components/Graphics/StatisticNutri";
import StatisticTallaEdad from "../components/Graphics/StatisticTallaEdad";
import StatisticPesoEdad from "../components/Graphics/StatisticPesoEdad";
import StatisticImcEdad from "../components/Graphics/StatisticImcEdad";
import StatisticPesoTalla2a5 from "../components/Graphics/StatisticPesoTalla2a5";
import StatisticTallaEdad2a5 from "../components/Graphics/StatisticTallaEdad2a5";
import StatisticPesoEdad2a5 from "../components/Graphics/StatisticPesoEdad2a5";
import StatisticImcEdad2a5 from "../components/Graphics/StatisticImcEdad2a5";
import StatisticTallaEdad5a17 from "../components/Graphics/StatisticTallaEdad5a17";
import StatisticHome from "../pages/ControlNutri/StatisticHome";
import StatisticImcEdad5a17 from "../components/Graphics/StatisticImcEdad5a17";
import StatisticHomeMadre from "../pages/ControlNutri/StatisticHomeMadre";
import EditProfileUser from "../pages/Users/EditProfileUser";
import IndexCalculator from "../pages/Calculator/IndexCalculator";
import calculateStateNutrition from "../pages/Calculator/CalculateStateNutrition";

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
                path: "/admin/addRol/:latestRol",
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
                path: "/admin/user/:documento",
                exact: true,
                component: User,
            },   
            {
                path: "/admin/editUser/:documento",
                exact: true,
                component: EditUser,
            },   
            {
                path: "/admin/addControlNutri/:documento",
                exact: true,
                component: AddControlNutri,
            },     
            {
                path: "/admin/addControlCyD/:documento",
                exact: true,
                component: AddControlCyD,
            },   
            {
                path: "/admin/editControlCyD/:id/:documento",
                exact: true,
                component: EditControlCD,
            },   
            {
                path: "/admin/listVaccines/:documento",
                exact: true,
                component: ListVac,
            },
            {
                path: "/admin/editControlVac/:id/:documento",
                exact: true,
                component: EditControlVac,
            },
            {
                path: "/admin/graphics/:edad/:sexo/:documento",
                exact: true,
                component: StatisticHome,                
            }, 
            {
                path: "/admin/statisticPesoTalla",
                exact: true,
                component: StatisticNutri,                
            },   
            {
                path: "/admin/statisticTallaEdad",
                exact: true,
                component: StatisticTallaEdad,                
            },
            {
                path: "/admin/statisticPesoEdad",
                exact: true,
                component: StatisticPesoEdad,                
            },
            {
                path: "/admin/statisticImcEdad",
                exact: true,
                component: StatisticImcEdad,          
            },
            {
                path: "/admin/statisticPesoTalla2a5",
                exact: true,
                component: StatisticPesoTalla2a5,                
            }, 
            {
                path: "/admin/statisticTallaEdad2a5",
                exact: true,
                component: StatisticTallaEdad2a5,                
            },
            {
                path: "/admin/statisticPesoEdad2a5",
                exact: true,
                component: StatisticPesoEdad2a5,                
            },
            {
                path: "/admin/statisticImcEdad2a5",
                exact: true,
                component: StatisticImcEdad2a5,          
            },
            {
                path: "/admin/statisticTallaEdad5a17",
                exact: true,
                component: StatisticTallaEdad5a17,                
            },
            {
                path: "/admin/statisticImcEdad5a17",
                exact: true,
                component: StatisticImcEdad5a17,          
            },
            {
                path: "/admin/statisticHomeMadre/:documento",
                exact: true,
                component: StatisticHomeMadre,          
            },
            {
                path: "/admin/listControlNutri/:documento",
                exact: true,
                component: ListControlNutri,
            }, 
            {
                path: "/admin/listControlCyD/:documento",
                exact: true,
                component: ListControlCyD,
            },
            {
                path: "/admin/listUserControl/:role",
                exact: true,
                component: AllUserControl,
            },
            {
                path: "/admin/addControlVac/:documento",
                exact: true,
                component: AddControlVac,
            },
            {
                path: "/admin/addControlFollow/:documento",
                exact: true,
                component: AddControlFollow,
            },
            {
                path: "/admin/editControlFollow",
                exact: true,
                component: EditControlFollow,
            },
            {
                path: "/admin/addInfantIncome",
                exact: true,
                component: AddInfantIncome,
            }, 
            {
                path: "/admin/editInfantIncome",
                exact: true,
                component: EditInfantIncome,
            }, 
            {
                path: "/admin/addControlRemission/:idSeg",
                exact: true,
                component: AddControlRemission,
            },
            {
                path: "/admin/editControlRemission",
                exact: true,
                component: EditControlRemission,
            },   
            {
                path: "/admin/listControlRemission/:documento/:idSeguimiento",
                exact: true,
                component: ListControlRemission,
            },   
            {
                path: "/admin/addCommitment/:idSeg",
                exact: true,
                component: AddCommitment,
            }, 
            {
                path: "/admin/editCommitment",
                exact: true,
                component: EditCommitment,
            }, 
            {
                path: "/admin/ListFollowUpChecks/:documento",
                exact: true,
                component: ListFollowUpChecks,
            },
            {
                path: "/admin/EditProfileUser/:documento",
                exact: true,
                component: EditProfileUser,
            },   
            {
                path: "/admin/calculator",
                exact: true,
                component: IndexCalculator
            },
            {
                path: "/admin/calculatorState/:edad/:sexo",
                exact: true,
                component: calculateStateNutrition
            }
            
        ]
    }   
];

export default routes;