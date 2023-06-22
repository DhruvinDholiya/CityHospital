import { useParams } from 'react-router-dom';
import React from 'react';

const doctorsData = [
    {
        id: '1',
        name: 'Atha Smith',
        post: 'Chief Medical Officer',
        info: 'Duis sagittis rutrum neque, quis tincidunt arcu pretium ac.',
        image: '../assets/img/doctors/doctors-1.jpg'
    },
    {
        id: '2',
        name: 'John White',
        post: 'Anesthesiologist',
        info: 'Aenean ac turpis ante. Mauris velit sapien.',
        image: '../assets/img/doctors/doctors-2.jpg'
    },
    {
        id: '3',
        name: 'Umika Loha',
        post: 'Cardiology',
        info: 'Curabitur luctus eleifend odio. Phasellus placerat mi.',
        image: '../assets/img/doctors/doctors-3.jpg'
    },
    {
        id: '4',
        name: 'Daimy Smith',
        post: 'Neurosurgeon',
        info: 'Morbi vulputate, tortor nec pellentesque molestie, eros nisi ornare purus.',
        image: '../assets/img/doctors/doctors-4.jpg'
    }
]


function Doctor(props) {
    const { id } = useParams();
    const doctor = doctorsData.filter(doctor => doctor.id === id)[0];
    return (
        <main>
            <section className="doctor_details">
                <div className="container">
                    <div className="row">
                        <div className="col-5">
                            <div className="doctor_details_image">
                                <img src={doctor.image} alt="img" />
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
                            <div className="section-title text-start">
                                <h2>Hello i'm Dr. {doctor.name} <br /> Introducing My Self.</h2>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magnaaliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duisaute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                                <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione.</p>
                                <div className="signature_image text-end">
                                    <img src="../assets/img/signature.png" alt="img" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='row bottom_part'>
                        <div className='col-10'>
                            <div className='section-title text-start'>
                                <span>My Skills</span>
                                <h2>I Have Explained about Myself A bit</h2>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.</p>
                            </div>
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
        </main>
    );
}

export default Doctor;