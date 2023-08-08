// import { createContext, useState, useContext } from 'react';

// const CounterContext = createContext();

// export const CounterProvider = ({ children }) => {
//     const [count, setCount] = useState(0);

//     const handleIncrement = () => {
//         setCount(count + 1);
//     };

//     const handleDecrement = () => {
//         if(count > 0) {
//             setCount(count - 1);
//         }
//     };

//     return (
//         <CounterContext.Provider value={{ count, handleIncrement, handleDecrement }}>
//             {children}
//         </CounterContext.Provider>
//     );
// };

// export const useCounter = () => {
//     return useContext(CounterContext);
// };
