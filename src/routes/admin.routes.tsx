import { ReactNode } from "react";
import AdminDashboard from "../pages/admin/AdminDashboard";
import CreateAdmin from "../pages/admin/CreateAdmin";
import CreateFaculty from "../pages/admin/CreateFaculty";
import CreateStudent from "../pages/admin/CreateStudent";
import { NavLink } from "react-router-dom";

type TRoute = {
    path: string,
    element: ReactNode,
};
type TSidebarItem = {
    key: string,
    label: ReactNode,
    children?: TSidebarItem[]
};

const adminPaths = [
    {
        name: 'Dashboard',
        path: 'dashboard',
        element: <AdminDashboard />
    },
    {
        name: 'User Management',
        children: [
            {
                name: 'Create Admin',
                path: 'create-admin',
                element: <CreateAdmin />,
            },
            {
                name: 'Create Student',
                path: 'create-student',
                element: <CreateStudent />,
            },
            {
                name: 'Create Faculty',
                path: 'create-faculty',
                element: <CreateFaculty />,
            },
        ],
    },
]


export const adminSidebarItems = adminPaths.reduce((acc: TSidebarItem[], item) => {
    if (item.path && item.name) {
        acc.push({
            key: item.name,
            label: <NavLink to={`/admin/${item.path}`}>{item.name}</NavLink>
        });
    }
    if (item.children) {
        acc.push({
            key: item.name,
            label: item.name,
            children: item.children.map(child => ({
                key: child.name,
                label: <NavLink to={`/admin/${child.path}`}>{child.name}</NavLink>
            }))
        });
    }
    return acc;
}, [])

const adminRoutes = adminPaths.reduce((acc: TRoute[], item) => {
    if (item.path && item.element) {
        const itemPath = {
            path: item.path,
            element: item.element
        };
        acc.push(itemPath)
    }
    if (item.children) {
        item.children.forEach(child => {
            const itemPath = {
                path: child.path,
                element: child.element
            };
            acc.push(itemPath)
        })
    }
    return acc;
}, [])

export default adminRoutes;