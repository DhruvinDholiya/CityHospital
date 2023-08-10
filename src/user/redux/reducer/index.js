import { combineReducers } from "redux";
import { doctorsReducer } from "./doctors.reducer";
import { medicineReducer } from "./medicine.reducer";
import { cartReducer } from "./cart.reducer";
import { favouriteReducer } from "./favourite.reducer";
import departmentReducer from "../slice/DepartmentSlice";
import { counterReducer } from "./counter.reducer";
import AlertReducer from "../slice/AlertSlice";

export const rootReducer = combineReducers({
    counter: counterReducer,
    doctors: doctorsReducer,
    medicines: medicineReducer,
    cart: cartReducer,
    favourites: favouriteReducer,
    department: departmentReducer,
    alert: AlertReducer
})





