import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import TitleBox from '../UI/titlePart/TitleBox';
import Button from '../UI/button/Button';
import { decrementAsync, incrementAsync } from '../redux/action/counter.action';

function Counter() {
  const count = useSelector((state) => state.count);
  const dispatch = useDispatch();

  const handleIncrement = () => {
    dispatch(incrementAsync());
  };

  const handleDecrement = () => {
    dispatch(decrementAsync());
  };

  return (
    <main>
      <section className='py-5'>
        <div className='container'>
          <TitleBox titleText='Counter' />
          <div className='d-flex align-items-center justify-content-center'>
            <Button onClick={handleIncrement}><AddIcon /></Button>
            <h4 className='mx-4 mb-0'>{count}</h4>
            <Button onClick={handleDecrement}><RemoveIcon /></Button>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Counter;
