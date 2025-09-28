import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "./components/layout/DashboardLayout"
import Customers from "./pages/Customers"
import Projects from "./pages/Projects"
import Knowledgebase from "./pages/Knowledgebase"
import CompanyOnboarding from "./pages/CompanyOnboarding"
import LandingPage from "./pages/LandingPage";

export const AppRouter = createBrowserRouter([
    {
        path: "/",
        element: <LandingPage />
    },
    {
        path: "/dashboard",
        element: <DashboardLayout />,
        children: [
          
            {
                path: "customers",
                element: <Customers />
            },
            {
                path: "projects",
                element: <Projects />
            },
          
            {
                path: "/dashboard",
                element: <Knowledgebase />
            },
          
        ],
    },
])