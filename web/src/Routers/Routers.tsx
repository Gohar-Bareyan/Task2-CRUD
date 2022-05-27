import { BrowserRouter, Route, Routes } from "react-router-dom";
import StepperForm from "../Components/StepperForm";
import ToDoInfo from "../Components/ToDoInfo";
import ToDoList from "../Components/ToDoList";

function Routers() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<StepperForm />} />
                    <Route path="/to-do-list" element={<ToDoList/>}/>
                    <Route path="/to-do-info/:id" element={<ToDoInfo/>}/>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default Routers