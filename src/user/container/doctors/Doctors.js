import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import DoctorCard from '../../UI/doctorCard/DoctorCard';
import TitleBox from '../../UI/titlePart/TitleBox';
import { useDispatch, useSelector } from 'react-redux';
import { getDoctors } from '../../redux/action/doctor.action';

function Doctors() {
    const dispatch = useDispatch();
    const doctorsData  = useSelector((state) => state.doctors.doctors);
    
    useEffect(() => {
        dispatch(getDoctors());
    },[])
    return (
        <main>
            <section id="doctors" className="doctors">
                <div className="container">
                    <TitleBox
                        titleText='Doctors'
                        subTitleText={['Duis sagittis rutrum neque, quis tincidunt arcu pretium ac. Suspendisse sem risus, molestie vitae arcu et, tincidunt viverra erat. Quisque in lectus id nulla viverra sodales in a risus. Aliquam ut sem ex. Duis viverra ipsum lacus, ut pharetra arcu sagittis nec. Phasellus a eleifend elit.']} />
                    <div className="row">
                        {
                            doctorsData.map((doctor) => {
                                return (
                                    <div key={doctor.id} className={`col-lg-6 ${doctor.id !== '1' ? 'mt-4' : ''}${doctor.id === '2' ? ' mt-lg-0' : ''}`}>
                                        <DoctorCard
                                            variant='Horizontale'
                                            cardType={Link}
                                            path={'/doctor/' + doctor.id}
                                            imgPath={'../assets/img/doctors/doctors-'+doctor.id+'.jpg'}
                                            imgAlt='img'
                                            drName={doctor.name}
                                            drPost={doctor.post}
                                            drDesc={doctor.desc}
                                            socialMedia={[
                                                <i className="ri-twitter-fill"></i>,
                                                <i className="ri-facebook-fill"></i>,
                                                <i className="ri-instagram-fill"></i>,
                                                <i className="ri-linkedin-box-fill"></i>
                                            ]}
                                        />
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </section>
        </main>
    );
}

export default Doctors;