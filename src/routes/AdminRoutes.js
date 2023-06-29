import React from 'react'
import { Routes, Route } from "react-router-dom";
import Medicine from "../admin/containers/Medicine";
import Doctor from "../admin/containers/Doctors";
import Other from "../admin/containers/Other";
import Layout from '../admin/containers/Layout';

function AdminRoutes() {
    return (
        <Layout>
            <Routes>
                <Route path="/medicine" element={<Medicine />} />
                <Route path="/doctors" element={<Doctor />} />
                <Route path="/other" element={<Other />} />
            </Routes>
        </Layout>
    )
}

export default AdminRoutes;