import React, { FC, useEffect } from "react";
import "./App.css";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import { Layout } from "antd";
import { useActions } from "./hooks/useActions";
import { IUser } from "./models/IUser";

const App: FC = () => {
    const { setUser, setIsAuth } = useActions();

    useEffect(() => {
        if (localStorage.getItem("auth")) {
            setUser({
                username: localStorage.getItem("username" || ""),
            } as IUser);
            setIsAuth(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Layout style={{ justifyContent: "center", alignItems: "center" }}>
            <NavBar />
            <Layout.Content style={{ width: 700 }}>
                <AppRouter />
            </Layout.Content>
        </Layout>
    );
};

export default App;
