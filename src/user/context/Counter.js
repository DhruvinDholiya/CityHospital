import React from 'react';
import { useCounter } from './CounterContext';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import TitleBox from '../UI/titlePart/TitleBox';
import Button from '../UI/button/Button';

function Counter() {

    const { count, handleIncrement, handleDecrement } = useCounter();

    return (
        <main>
            <section className='py-5'>
                <div className='container'>
                    <TitleBox titleText='Counter' />
                    <div className='d-flex align-items-center justify-content-center'>
                        <Button onClick={() => handleIncrement()}><AddIcon /></Button>
                        <h4 className='mx-4 mb-0'>{count}</h4>
                        <Button onClick={() => handleDecrement()}><RemoveIcon /></Button>
                    </div>
                </div>

            </section>
        </main>
    );
}

export default Counter;