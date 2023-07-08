import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../UI/button/Button';

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

function Doctors(props) {
    return (
        <main>
            <section id="doctors" className="doctors">
                <div className="container">
                    <div className="section-title">
                        <h2>Doctors</h2>
                        <p>Duis sagittis rutrum neque, quis tincidunt arcu pretium ac. Suspendisse sem risus, molestie vitae arcu et,
                            tincidunt viverra erat. Quisque in lectus id nulla viverra sodales in a risus. Aliquam ut sem ex. Duis viverra
                            ipsum lacus, ut pharetra arcu sagittis nec. Phasellus a eleifend elit.</p>
                            <Button path='/doctor/visiting_doctor' btnType={Link} classes={'my-4'}>Visiting Doctors</Button>
                    </div>
                    <div className="row">
                        {
                            doctorsData.map((doctor) => {
                                return (<div key={doctor.id} className={`col-lg-6 ${doctor.id !== '1' ? 'mt-4' : ''}${doctor.id === '2' ? ' mt-lg-0' : ''}`}>
                                    <Link to={'/doctor/' + doctor.id} className="member d-flex align-items-start">
                                        <div className="pic">
                                            <img src={doctor.image} className="img-doctor" alt="img" />
                                        </div>
                                        <div className="member-info">
                                            <h4>{doctor.name}</h4>
                                            <span>{doctor.post}</span>
                                            <p>{doctor.info}</p>
                                            <div className="social">
                                                <a href="/"><i className="ri-twitter-fill"></i></a>
                                                <a href="/"><i className="ri-facebook-fill"></i></a>
                                                <a href="/"><i className="ri-instagram-fill"></i></a>
                                                <a href="/"> <i className="ri-linkedin-box-fill"></i></a>
                                            </div>
                                        </div>
                                    </Link>
                                </div>)
                            })
                        }
                    </div>
                </div>
            </section>
        </main>
    );
}

export default Doctors;