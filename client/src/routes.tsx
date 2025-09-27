import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "./components/layout/DashboardLayout"
import Dashboard from "./pages/Dashboard"
import Customers from "./pages/Customers"
import Projects from "./pages/Projects"
import Invoices from "./pages/Invoices"
import Knowledgebase from "./pages/Knowledgebase"
import CompanyOnboarding from "./pages/CompanyOnboarding"
import CompanySettings from "./pages/CompanySettings"
import AgentsPage from "./pages/Agents";
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
                path: '/dashboard',
                element: <Dashboard />
            },
            {
                path: "agents",
                element: <AgentsPage />
            },
            {
                path: "customers",
                element: <Customers />
            },
            {
                path: "projects",
                element: <Projects />
            },
            {
                path: "invoices",
                element: <Invoices />
            },
            {
                path: "knowledgebase",
                element: <Knowledgebase />
            },
            {
                path: "company",
                element: <CompanySettings />
            },
            {
                path: 'onboarding',
                element: <CompanyOnboarding />
            }
        ],
    },
])