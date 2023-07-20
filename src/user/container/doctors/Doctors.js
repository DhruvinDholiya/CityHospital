import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../UI/button/Button';
import DoctorCard from '../../UI/doctorCard/DoctorCard';
import TitleBox from '../../UI/titlePart/TitleBox';

const doctorsData = [
    {
        id: '1',
        name: 'Atha Smith',
        post: 'Chief Medical Officer',
        info: 'Duis sagittis rutrum neque, quis tincidunt arcu pretium ac.',
        image: '../assets/img/doctors/doctors-1.jpg',
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
                    <TitleBox
                        titleText='Doctors'
                        subTitleText={['Duis sagittis rutrum neque, quis tincidunt arcu pretium ac. Suspendisse sem risus, molestie vitae arcu et, tincidunt viverra erat. Quisque in lectus id nulla viverra sodales in a risus. Aliquam ut sem ex. Duis viverra ipsum lacus, ut pharetra arcu sagittis nec. Phasellus a eleifend elit.']} />
                    <div className='text-center'>
                        <Button path='/doctor/visiting_doctor' btnType={Link} classes={'mb-5'}>Visiting Doctors</Button>
                    </div>
                    <div className="row">
                        {
                            doctorsData.map((doctor) => {
                                return (
                                    <div key={doctor.id} className={`col-lg-6 ${doctor.id !== '1' ? 'mt-4' : ''}${doctor.id === '2' ? ' mt-lg-0' : ''}`}>
                                        <DoctorCard
                                            variant='Horizontale'
                                            cardType={Link}
                                            path={'/doctor/' + doctor.id}
                                            imgPath={doctor.image}
                                            imgAlt='img'
                                            drName={doctor.name}
                                            drPost={doctor.post}
                                            drDesc={doctor.info}
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