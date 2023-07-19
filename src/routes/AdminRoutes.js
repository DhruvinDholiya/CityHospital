import React from 'react'
import { Routes, Route } from "react-router-dom";
import Medicine from "../admin/containers/medicine/Medicine";
import Layout from '../admin/containers/Layout';
import Dashboard from '../admin/containers/Dashboard';
import Doctors from '../admin/containers/doctors/Doctors';

function AdminRoutes() {
    return (
        <Layout>
            <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/medicine" element={<Medicine />} />
                <Route path="/doctors" element={<Doctors />} />
            </Routes>
        </Layout>
    )
}

export default AdminRoutes;