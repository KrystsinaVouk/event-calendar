import React from "react";
import LoginPage from "../pages/LoginPage";
import EventPage from "../pages/EventPage";

export interface IRoute {
    path: string;
    exact?: boolean;
    element: React.ComponentType;
}

export enum RoutesNames {
    LOGIN = `/login`,
    EVENT = `/`,
}

export const publicRoutes: IRoute[] = [
    { path: RoutesNames.LOGIN, exact: true, element: LoginPage },
];

export const privateRoutes: IRoute[] = [
    { path: RoutesNames.EVENT, exact: true, element: EventPage },
];
