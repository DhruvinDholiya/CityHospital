import React from 'react'
import { Routes, Route } from "react-router-dom";
import Medicine from "../admin/containers/medicine/Medicine";
import Doctor from "../admin/containers/Doctors";
import Layout from '../admin/containers/Layout';
import Dashboard from '../admin/containers/Dashboard';

function AdminRoutes() {
    return (
        <Layout>
            <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/medicine" element={<Medicine />} />
                <Route path="/doctors" element={<Doctor />} />
            </Routes>
        </Layout>
    )
}

export default AdminRoutes;