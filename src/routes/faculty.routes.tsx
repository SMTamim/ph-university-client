import { TRouteItemsPath } from "../../types/sidebar.type";
import FacultyDashboard from "../pages/faculty/FacultyDashboard";
import OfferedCourse from "../pages/faculty/OfferedCourse";

export const facultyPaths: TRouteItemsPath[] = [
    {
        name: 'Dashboard',
        path: 'dashboard',
        element: <FacultyDashboard />
    },
    {
        name: 'Offered Course',
        path: 'offered-course',
        element: <OfferedCourse />
    }
]