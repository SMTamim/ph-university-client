import { TRouteItemsPath } from "../../types/sidebar.type";
import StudentDashboard from "../pages/student/StudentDashboard";

export const studentPaths: TRouteItemsPath[] = [
    {
        name: 'Dashboard',
        path: 'dashboard',
        element: <StudentDashboard />
    }
]