import { TRoute, TRouteItemsPath } from "../../types/sidebar.type";

export const routeGenerator = (items: TRouteItemsPath[]) => {
  const routes = items.reduce((acc: TRoute[], item) => {
    if (item.path && item.element) {
      const itemPath = {
        path: item.path,
        element: item.element
      };
      acc.push(itemPath);
    }
    if (item.children) {
      item.children.forEach((child) => {
        const itemPath = {
          path: child.path!, // it'll never be null
          element: child.element
        };
        acc.push(itemPath);
      });
    }
    return acc;
  }, []);
  return routes;
};
