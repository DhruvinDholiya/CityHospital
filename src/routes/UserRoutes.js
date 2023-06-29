import * as React from 'react';
import Header from '../user/component/Header';
import Footer from '../user/component/Footer';
import Home from '../user/container/Home';
import About from '../user/container/About';
import Appointment from '../user/container/Appointment';
import Contact from '../user/container/Contact';
import Departments from '../user/container/Departments';
import Doctors from '../user/container/Doctors';
import Doctor from '../user/container/Doctor';
import VisitingDoctors from '../user/container/VisitingDoctors';
import NotFound from '../user/component/NotFound';
import Auth from '../user/container/Auth';
import { Route, Routes } from 'react-router-dom';

function UserRoutes() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/appointment' element={<Appointment />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/departments' element={<Departments />} />
        <Route path='/doctors' element={<Doctors />} />
        <Route path='/doctor/'>
          <Route path=':id' element={<Doctor />} />
          <Route path='visiting_doctor' element={< VisitingDoctors />} />
        </Route>
        <Route path='*' element={<NotFound />} />
        <Route path='/auth' element={<Auth />} />
      </Routes>
      <Footer />
    </>
  );
}

export default UserRoutes;
