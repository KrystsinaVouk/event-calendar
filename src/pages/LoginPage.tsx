import React, { FC } from "react";
import { Layout, Row, Card } from "antd";
import LoginForm from "../components/LoginForm";

const LoginPage: FC = () => {
    return (
        <Layout>
            <Row justify="center" align="middle" className="h100">
                <Card>
                    <LoginForm />
                </Card>
            </Row>
        </Layout>
    );
};

export default LoginPage;
