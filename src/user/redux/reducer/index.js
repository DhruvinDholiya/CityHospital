import { combineReducers } from "redux";
import { doctorsReducer } from "./doctors.reducer";
import { medicineReducer } from "./medicine.reducer";
import { cartReducer } from "./cart.reducer";
import { favouriteReducer } from "./favourite.reducer";
import { departmentReducer } from "./department.reducer";
import counterReducer  from "../slice/CounterSlice";

export const rootReducer = combineReducers({
    counter: counterReducer,
    doctors: doctorsReducer,
    medicines: medicineReducer,
    cart: cartReducer,
    favourites: favouriteReducer,
    department: departmentReducer
})





