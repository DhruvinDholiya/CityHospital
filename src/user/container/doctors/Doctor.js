import { useParams } from 'react-router-dom';
import React, { useEffect } from 'react';
import TitleBox from '../../UI/titlePart/TitleBox';
import { useDispatch, useSelector } from 'react-redux';
import { getDoctors } from '../../redux/action/doctor.action';

function Doctor() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const doctorsData = useSelector((state) => state.doctors.doctors)

    useEffect(() => {
        dispatch(getDoctors());
    }, []);

    const doctor = doctorsData.find(doctor => doctor.id === parseInt(id));

    return (
        <main>
            {doctor ? (
                <section className="doctor_details">
                    <div className="container">
                        <div className="row">
                            <div className="col-5">
                                <div className="doctor_details_image">
                                    <img src={`../assets/img/doctors/doctors-${doctor.id}.jpg`} alt="img" />
                                    <h4>Dr. {doctor.name}</h4>
                                    <span>{doctor.post}</span>
                                    <ul className="social">
                                        <li><a href="/"><i className="fab fa-facebook-f" /></a></li>
                                        <li><a href="/"><i className="fab fa-twitter" /></a></li>
                                        <li><a href="/"><i className="fab fa-linkedin-in" /></a></li>
                                        <li><a href="/"><i className="fab fa-instagram" /></a></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-6">
                                <TitleBox
                                    type='left'
                                    titleText={<>Hello i'm Dr. {doctor.name} <br /> Introducing My Self.</>}
                                    subTitleText={[
                                        'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magnaaliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duisaute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
                                        'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione.'
                                    ]}
                                />
                                <div className="signature_image text-end">
                                    <img src="../assets/img/signature.png" alt="img" />
                                </div>
                            </div>
                        </div>
                        <div className='row bottom_part'>
                            <div className='col-10'>
                                <TitleBox
                                    type='left'
                                    OrangeTitleText='My Skills'
                                    titleText='I Have Explained about Myself A bit'
                                    subTitleText={['Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.']}
                                />
                                <ul className='row skill_desc'>
                                    <li>Cancer Services</li>
                                    <li>Liver Transplant</li>
                                    <li>Kidney Cancer</li>
                                    <li>Cardiac Arrhythmia</li>
                                    <li>Dental Services</li>
                                    <li>Radiation Oncology</li>
                                    <li>Kidney Stone Center</li>
                                    <li>Male Urology Services</li>
                                    <li>Heart Transplant</li>
                                    <li>Pediatric Liver Transplant</li>
                                    <li>Pediatric Heart Transplant</li>
                                    <li>Pancreas Transplant</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
            ) : (
                <div>Loading...</div>
            )}
        </main>
    );
}

export default Doctor;