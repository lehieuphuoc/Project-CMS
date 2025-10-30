"use client";

import React from "react";
import { Button, Layout, theme } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";

const { Header } = Layout;

interface HeaderBarProps {
    collapsed: boolean;
    onToggle: () => void;
}

export default function HeaderBar({ collapsed, onToggle }: HeaderBarProps) {
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <Header
            style={{
                padding: 0,
                background: colorBgContainer,
                display: "flex",
                alignItems: "center",
            }}
        >
            <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={onToggle}
                style={{
                    fontSize: "16px",
                    width: 64,
                    height: 64,
                }}
            />
            <h1 className="text-lg font-semibold ml-4">Admin Dashboard</h1>
        </Header>
    );
}
