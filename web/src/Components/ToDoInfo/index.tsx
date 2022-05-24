import { ReactComponent as BackIcon } from "../../Images/back.svg"
import {
    Button, MobileStepper
} from '@mui/material';
import styles from "./index.module.scss"
import { useState } from "react";
import Header from "../Header";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../Store/Root";
import { deleteToDoList } from "../../Store/ToDoList/Action";
import { useDispatch } from "react-redux";


const ToDoInfo = () => {
    const { id } = useParams()
    const { toDoList } = useSelector((state: RootState) => state.toDoList)

    const toDo = toDoList.find((toDo: any) => toDo.id === Number(id))

    const navigate = useNavigate()
    const dispatch = useDispatch()
    // Percent
    const [activeStep, setActiveStep] = useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const goBack = () => {
        navigate("/")
    }

    const deleteList = (id: number) => {
        dispatch(deleteToDoList(id, toDoList))
        navigate("/")
    }
    return (
        <div className={styles.container}>
            <Header title={"To Do Info"} />
            <div className={styles.to_do_info_main_div}>
                <div className={styles.to_do_info_title}>
                    <h3>{toDo.title}</h3>
                </div>
                <div className={styles.to_do_info}>
                    <div className={styles.description_div}>
                        <p>{toDo.description}</p>
                    </div>
                    <div className={styles.info_actions}>
                        <div className={styles.percentage_div}>
                            <MobileStepper
                                className={styles.stepper}
                                variant="progress"
                                steps={6}
                                position="static"
                                activeStep={activeStep}
                                sx={{ maxWidth: 500, flexGrow: 1 }}
                                nextButton={
                                    <Button size="small" onClick={handleNext} disabled={activeStep === 5} className={styles.plus_button}>+</Button>
                                }
                                backButton={
                                    <Button size="small" onClick={handleBack} disabled={activeStep === 0} className={styles.minus_button}>-</Button>
                                }
                            />
                        </div>
                        <div className={styles.deadline_div}>
                            <p>Deadline  {toDo.deadline}</p>
                        </div>
                        <div className={styles.createdAt_div}>
                            <p>Created At  {toDo.createdAt}</p>
                        </div>
                        <div className={styles.info_buttons}>
                            <Button onClick={() => deleteList(toDo.id)} className={styles.info_delete_button}>Delete</Button>
                            <Button className={styles.info_update_button}>Update</Button>
                        </div>
                        <Button onClick={() => goBack()} className={styles.go_back_button}><BackIcon className={styles.back_icon} />Go Back</Button>
                    </div>
                </div>
            </div>
        </div>


    )
}

export default ToDoInfo