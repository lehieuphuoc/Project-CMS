"use client";

import React, { useState } from "react";
import { Layout } from "antd";
import SidebarAdmin from "@/components/admin/SidebarAdmin";
import HeaderAdmin from "@/components/admin/HeaderAdmin";
import Link from "next/link"   ;
import "@/app/globals.css";

const { Sider } = Layout;

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <Layout style={{ minHeight: "100vh" }}>
            <SidebarAdmin collapsed={collapsed} />
            <Layout>
                <HeaderAdmin collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
                {children}
            </Layout>
        </Layout>
    );
}
