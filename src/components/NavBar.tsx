import React, { FC } from "react";
import { Button, Layout, Menu, Row } from "antd";
import { RoutesNames } from "../router/routes";
import { Link } from "react-router-dom";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useActions } from "../hooks/useActions";

const NavBar: FC = () => {
    const { isAuth, user } = useTypedSelector((state) => state.auth);
    const { logout } = useActions();

    return (
        <Layout.Header style={{ width: "100%" }}>
            <Row justify={`end`}>
                {isAuth ? (
                    <>
                        <div style={{ color: "white" }}>{user?.username}</div>
                        <Menu
                            theme={`dark`}
                            selectable={false}
                            mode={`horizontal`}
                        >
                            <Menu.Item key={1}>
                                <Button onClick={() => logout()}>
                                    Log out
                                </Button>
                            </Menu.Item>
                        </Menu>
                    </>
                ) : (
                    <>
                        <Menu
                            theme={`dark`}
                            selectable={false}
                            mode={`horizontal`}
                        >
                            <Menu.Item key={1}>
                                <Link to={RoutesNames.LOGIN}>Login</Link>
                            </Menu.Item>
                        </Menu>
                    </>
                )}
            </Row>
        </Layout.Header>
    );
};

export default NavBar;
