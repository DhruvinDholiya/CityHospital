import { combineReducers } from "redux";
import { counterReducer } from "./counter.reducer";
import { doctorsReducer } from "./doctors.reducer";
import { medicineReducer } from "./medicine.reducer";

export const rootReducer = combineReducers({
    counter: counterReducer,
    doctors: doctorsReducer,
    medicines: medicineReducer
})





