import {Navigate, Route, Routes} from "react-router-dom";
import {privateRoutes, publicRoutes, RoutesNames} from "../router/routes";
import LoginPage from "../pages/LoginPage";
import EventPage from "../pages/EventPage";
import {useTypedSelector} from "../hooks/useTypedSelector";

function AppRouter() {

    const {isAuth} = useTypedSelector((state) => state.auth);

    return isAuth ? (
        <Routes>
            {privateRoutes.map(({path, element}) => (
                <Route key={path} path={path} element={<EventPage/>}/>
            ))}
            <Route path="/*" element={<Navigate replace to={RoutesNames.EVENT}/>}/>
        </Routes>
    ) : (
        <Routes>
            {publicRoutes.map(({path, element}) => (
                <Route key={path} path={path} element={<LoginPage/>}/>
            ))}
            <Route path="/*" element={<Navigate replace to={RoutesNames.LOGIN}/>}/>
        </Routes>
    );
}

export default AppRouter;
