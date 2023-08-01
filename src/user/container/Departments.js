import React, { useEffect } from 'react';
import TitleBox from '../UI/titlePart/TitleBox';
import { useDispatch, useSelector } from 'react-redux';
import { getDepartment } from '../redux/action/department.action';
import Loader from '../UI/loader/Loader'

function Departments(props) {
    const dispatch = useDispatch();
    const departmentData = useSelector((state) => state.department.department);

    useEffect(() => {
        dispatch(getDepartment());
    }, []);
    return (
        <>
            {
                departmentData.length === 0 ? <Loader style={{ height: 'calc(100vh - 138px)' }} /> :
                    <main>
                        <section id="departments" className="departments">
                            <div className="container">
                                <TitleBox titleText='Departments' />
                                <div className="row">
                                    <div className="col-lg-3">
                                        <ul className="nav nav-tabs flex-column">
                                            {
                                                departmentData.map((val, i) => {
                                                    return (
                                                        <li key={val.id} className='nav-item'>
                                                            <a className={i === 0 ? 'nav-link active show' : 'nav-link'} data-bs-toggle="tab" href={`#tab-${i + 1}`}>{val.name}</a>
                                                        </li>
                                                    )
                                                })
                                            }
                                        </ul>
                                    </div>
                                    <div className="col-lg-9 mt-4 mt-lg-0">
                                        <div className="tab-content">
                                            {
                                                departmentData.map((val, i) => {
                                                    return (
                                                        <div className={i === 0 ? 'tab-pane active show' : 'tab-pane'} id={`tab-${i + 1}`}>
                                                            <div className='row'>
                                                                <div className="col-lg-8 details order-2 order-lg-1">
                                                                    <h3>{val.name}</h3>
                                                                    <p>{val.desc}</p>
                                                                </div>
                                                                <div className="col-lg-4 text-center order-1 order-lg-2">
                                                                    <img src="../assets/img/departments-1.jpg" alt="img" className="img-fluid" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </main>
            }
        </>
    );
}

export default Departments;