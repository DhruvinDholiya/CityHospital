import React from 'react';
import Button from '../UI/button/Button';
import TitleBox from '../UI/titlePart/TitleBox';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useDispatch, useSelector } from 'react-redux';
import { decrement, increment } from '../redux/slice/CounterSlice';
function Counter(props) {

    const dispatch = useDispatch();
    const counterVal = useSelector(state => state.counter.count);

    const handleIncrement = () => {
        dispatch(increment());
    }
    const handleDecrement = () => {
        dispatch(decrement());
    }
    return (
        <main>
            <section className='py-5'>
                <div className='container'>
                    <TitleBox titleText='Counter'/>
                    <div className='d-flex align-items-center justify-content-center'>
                        <Button onClick={() => handleIncrement()}><AddIcon/></Button>
                        <h4 className='mx-4 mb-0'>{counterVal}</h4>
                        <Button onClick={() => handleDecrement()}><RemoveIcon /></Button>
                    </div>
                </div>

            </section>
        </main>
    );
}

export default Counter;