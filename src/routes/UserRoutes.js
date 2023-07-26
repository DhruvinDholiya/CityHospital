import * as React from 'react';
import Header from '../user/component/Header';
import Footer from '../user/component/Footer';
import Home from '../user/container/Home';
import About from '../user/container/About';
import Appointment from '../user/container/Appointment';
import Contact from '../user/container/Contact';
import Departments from '../user/container/Departments';
import Doctors from '../user/container/doctors/Doctors';
import Doctor from '../user/container/doctors/Doctor';
import VisitingDoctors from '../user/container/VisitingDoctors';
import NotFound from '../user/component/NotFound';
import Auth from '../user/container/Auth';
import { Route, Routes } from 'react-router-dom';
import Medicine from '../user/container/medicines/Medicine';
import PrivateRoute from '../routes/PrivateRoute';
import Counter from '../user/container/Counter';
import Cart from '../user/container/Cart';

const UserRoutes = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/appointment' element={<Appointment />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/departments' element={<Departments />} />
        <Route element={<PrivateRoute />}>
          <Route path='/medicines' element={<Medicine />} />
        </Route>
        <Route path='/doctors' element={<Doctors />} />
        <Route path='/doctor/'>
          <Route path=':id' element={<Doctor />} />
          <Route path='visiting_doctor' element={< VisitingDoctors />} />
        </Route>
        <Route path='/auth' element={<Auth />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/counter' element={<Counter />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default UserRoutes;
