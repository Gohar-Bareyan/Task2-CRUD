import { BrowserRouter, Route, Routes } from "react-router-dom";
import ToDoInfo from "../Components/ToDoInfo";
import ToDoList from "../Components/ToDoList";

function Routers() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<ToDoList />} />
                    <Route path="/to-do-info/:id" element={<ToDoInfo/>}/>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default Routers