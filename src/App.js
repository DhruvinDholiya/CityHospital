import Header from './component/Header';
import Footer from './component/Footer';
import Home from './container/Home';
import About from './container/About';
import Appointment from './container/Appointment';
import Contact from './container/Contact';
import Departments from './container/Departments';
import Doctors from './container/Doctors';
import { Route, Routes } from 'react-router-dom';
import Doctor from './container/Doctor';
import VisitingDoctors from './container/VisitingDoctors';
import NotFound from './component/NotFound';
import Auth from './container/Auth';
// import AuthByStates from './container/AuthByStates';

function App() {
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
        {/* <Route path='/doctor/:id' element={<Doctor />} />
        <Route path='/doctor/visiting_doctor' element={< VisitingDoctors />} /> */}
        <Route path='/doctor/'>
          <Route path=':id' element={<Doctor />} />
          <Route path='visiting_doctor' element={< VisitingDoctors />} />
        </Route>
        <Route path='*' element={<NotFound />}/>
        <Route path='/auth' element={<Auth />}/>
        {/* <Route path='/auth' element={<AuthByStates />} /> */}
      </Routes>
      <Footer />
    </>
  );
}

export default App;
