import Welcome from "../pages/Welcome/Welcome";
import LayoutAdmin from "../layouts/LayoutAdmin";
import Login from "../pages/Login/Login";
import Home from "../pages/Home/Home";
import ListRol from "../pages/Rol/ListRol";
import AddRol from "../pages/Rol/AddRol";
import EditRol from "../pages/Rol/EditRol";
import ListUsers from "../pages/Users/ListUsers";
import ListUserDesnutrition from "../pages/Users/ListUserDesnutrition";
import AddUser from "../pages/Users/AddUser";
import EditUser from "../pages/Users/EditUser";
import User from "../pages/Users/User";
import ListVac from "../pages/ControlVac/ListVac";
import ListVacMadre from "../pages/ControlVac/ListVacMadre";
import ListControlNutri from "../pages/ControlNutri/ListControlNutri";
import DetailControlNutri from "../pages/ControlNutri/DetailControlNutri";
import DetailControlNutriMadre from "../pages/ControlNutri/DetailControlNutriMadre";
import AddControlNutri from "../pages/ControlNutri/AddControlNutri";
import EditControlNutri from "../pages/ControlNutri/EditControlNutri";
import EditControlNutriMadre from "../pages/ControlNutri/EditControlNutriMadre";
import AddControlNutriMadre from "../pages/ControlNutri/AddControlNutriMadre";
import AddControlCyD from "../pages/ControlCyD/AddControlCyD";
import EditControlCD from "../pages/ControlCyD/EditControlCD";
import ListControlCyD from "../pages/ControlCyD/ListControlCyD";
import AllUserControl from "../pages/ControlHome/AllUserControl";
import AddControlVac from "../pages/ControlVac/AddControlVac";
import EditControlVac from "../pages/ControlVac/EditControlVac";
import EditControlVacMadre from "../pages/ControlVac/EditControlVacMadre";
import AddControlFollow from "../pages/ControlFollow/AddControlFollow";
import AddInfantIncome from "../pages/ControlFollow/AddInfantIncome";
import AddMotherIncome from "../pages/ControlFollow/AddMotherIncome";
import EditControlFollow from "../pages/ControlFollow/EditControlFollow";
import EditInfantIncome from "../pages/ControlFollow/EditInfantIncome";
import DetailsInfantIncome from "../pages/ControlFollow/DetailsInfantIncome";
import DetailMotherIncome from "../pages/ControlFollow/DetailsMotherIncome";
import AddControlRemission from "../pages/ControlFollow/AddControlRemission";
import EditControlRemission from "../pages/ControlFollow/EditControlRemission";
import DetailsControlRemission from "../pages/ControlFollow/DetailsControlRemission";
import ListControlRemission from "../pages/ControlFollow/ListControlRemission";
import AddCommitment from "../pages/ControlFollow/AddCommitment";
import ListCommitment from "../pages/ControlFollow/ListCommitment";
import EditCommitment from "../pages/ControlFollow/EditCommitment";
import DetailCommitment from "../pages/ControlFollow/DetailCommitment";
import ListFollow from "../pages/ControlFollow/ListFollow";
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
import AddControlVacMadre from "../pages/ControlVac/AddControlVacMadre";
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
                path: "/admin/usersDesnutrition",
                exact: true,
                component: ListUserDesnutrition,
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
                path: "/admin/addControlNutri/:documento/:rolUser",
                exact: true,
                component: AddControlNutri,
            },    
            {
                path: "/admin/editControlNutri/:id/:documento/:rolUser",
                exact: true,
                component: EditControlNutri,
            },
            {
                path: "/admin/editControlNutriMadre/:id/:documento/:rolUser",
                exact: true,
                component: EditControlNutriMadre,
            },
            {
                path: "/admin/AddControlNutriMadre/:documento/:rolUser",
                exact: true,
                component: AddControlNutriMadre,
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
                path: "/admin/listVacMadre/:documento",
                exact: true,
                component: ListVacMadre,
            },
            {
                path: "/admin/editControlVac/:id/:documento",
                exact: true,
                component: EditControlVac,
            },
            {
                path: "/admin/EditControlVacMadre/:id/:documento",
                exact: true,
                component: EditControlVacMadre,
            },
            {
                path: "/admin/graphics/:edad/:sexo/:documento/:rolUser",
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
                path: "/admin/statisticHomeMadre/:documento/:rolUser",
                exact: true,
                component: StatisticHomeMadre,          
            },
            {
                path: "/admin/listControlNutri/:documento",
                exact: true,
                component: ListControlNutri,
            }, 
            {
                path: "/admin/DetailControlNutri/:id/:documento/:rolUser",
                exact: true,
                component: DetailControlNutri,
            }, 
            {
                path: "/admin/DetailControlNutriMadre/:id/:documento/:rolUser",
                exact: true,
                component: DetailControlNutriMadre,
            }, 
            {
                path: "/admin/listControlCyD/:documento",
                exact: true,
                component: ListControlCyD,
            },
            {
                path: "/admin/listUserControl/:rolUser",
                exact: true,
                component: AllUserControl,
            },
            {
                path: "/admin/addControlVac/:documento",
                exact: true,
                component: AddControlVac,
            },
            {
                path: "/admin/addControlFollow/:documento/:rolUser",
                exact: true,
                component: AddControlFollow,
            },
            {
                path: "/admin/editControlFollow/:idSeg/:documento",
                exact: true,
                component: EditControlFollow,
            },
            {
                path: "/admin/addInfantIncome/:idSeg",
                exact: true,
                component: AddInfantIncome,
            }, 
            {
                path: "/admin/editInfantIncome/:idSeg/:documento",
                exact: true,
                component: EditInfantIncome,
            }, 
            {
                path: "/admin/detailsInfantIncome/:idSeg/:idInc",
                exact: true,
                component: DetailsInfantIncome,
            }, 
            {
                path: "/admin/detailMotherIncome/:idSeg/:idInc",
                exact: true,
                component: DetailMotherIncome,
            }, 
            {
                path: "/admin/addMotherIncome",
                exact: true,
                component: AddMotherIncome,
            }, 
            {
                path: "/admin/addControlRemission/:idSeg/:documento",
                exact: true,
                component: AddControlRemission,
            },
            {
                path: "/admin/editControlRemission/:idSeg/:idRemi/:documento",
                exact: true,
                component: EditControlRemission,
            }, 
            {
                path: "/admin/detailsControlRemission/:idSeg/:idRemi",
                exact: true,
                component: DetailsControlRemission,
            }, 
            {
                path: "/admin/listControlRemission/:idSeg/:documento",
                exact: true,
                component: ListControlRemission,
            },   
            {
                path: "/admin/addCommitment/:idSeg/:documento",
                exact: true,
                component: AddCommitment,
            },
            {
                path: "/admin/commitments/:idSeg/:documento",
                exact: true,
                component: ListCommitment,
            }, 
            {
                path: "/admin/editCommitment/:idSeg/:idComp/:documento",
                exact: true,
                component: EditCommitment,
            }, 
            {
                path: "/admin/detailCommitment/:idSeg/:idComp",
                exact: true,
                component: DetailCommitment,
            },
            {
                path: "/admin/ListFollowUp/:documento/:rolUser",
                exact: true,
                component: ListFollow,
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
            },
            {
                path: "/admin/addControlVacMadre/:documento",
                exact: true,
                component: AddControlVacMadre,
            }
        ]
    }   
];

export default routes;