import { combineReducers } from "redux";
import { doctorsReducer } from "./doctors.reducer";
import { medicineReducer } from "./medicine.reducer";
import { cartReducer } from "./cart.reducer";
import { favouriteReducer } from "./favourite.reducer";
import departmentReducer from "../slice/DepartmentSlice";
import AlertReducer from "../slice/AlertSlice";
import { authReducer } from "./auth.reducer";
import  aptReducer  from "../slice/AptSlice";

export const rootReducer = combineReducers({
    doctors: doctorsReducer,
    medicines: medicineReducer,
    cart: cartReducer,
    favourites: favouriteReducer,
    department: departmentReducer,
    alert: AlertReducer,
    auth: authReducer,
    apt: aptReducer,
})





