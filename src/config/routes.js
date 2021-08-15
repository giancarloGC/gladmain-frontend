import Home from "../pages/Home";
import LayoutBasic from "../layouts/LayoutBasic";

const routes = [
    {
        path: "/",
        exact: false,
        component: LayoutBasic,
        routes: [
            {
                path: "/",
                component: Home,
                exact: true
            }
        ]
    }
];

export default routes;