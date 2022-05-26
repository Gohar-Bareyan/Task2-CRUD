import { ReactComponent as BackIcon } from "../../Images/back.svg"
import {
    Button
} from '@mui/material';
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import styles from "./index.module.scss"
import { useEffect, useState } from "react";
import Header from "../Header";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../Store/Root";
import { deleteToDoList, getProgressRequest, setProgressRequest } from "../../Store/ToDoList/Action";
import { useDispatch } from "react-redux";
import ModalForm from "../ModalForm";

function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '70%', mr: 1 }}>
                <LinearProgress variant="determinate" {...props} />
            </Box>
            <Box sx={{ minWidth: 35 }}>
                <Typography variant="body2" color="white">{`${Math.round(
                    props.value,
                )}%`}</Typography>
            </Box>
        </Box>
    );
}

const ToDoInfo = () => {
    const { id } = useParams()
    const { toDoList } = useSelector((state: RootState) => state.toDoList)

    const toDo = toDoList?.find((toDo: any) => toDo.id === Number(id))

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [toggleUpdateModal, setToggleUpdateModal] = useState(false);
    const handleToggleUpdateModal = () => setToggleUpdateModal(!toggleUpdateModal);

    const [updatableData, setUpdateableData] = useState({})

    // Progress
    const handleInc = (id: number) => {
        dispatch(setProgressRequest({ progress: toDo.progress + 10, toDoId: id, toDoList }))
        dispatch(getProgressRequest())
    };
    const handleDec = (id: number) => {
        dispatch(setProgressRequest({ progress: toDo.progress - 10, toDoId: id, toDoList }))
        dispatch(getProgressRequest())
    };

    useEffect(() => {
        dispatch(getProgressRequest())
    }, [])

    // GoBack
    const goBack = () => {
        navigate("/")
    }
    // delete
    const deleteList = (id: number) => {
        dispatch(deleteToDoList(id, toDoList))
        navigate("/")
    }

    return (
        <div className={styles.container}>
            <Header title={"To Do Info"} />
            <div className={styles.to_do_info_main_div}>
                <div className={styles.to_do_info_title}>
                    <h3>{toDo?.title}</h3>
                </div>
                <div className={styles.to_do_info}>
                    <div className={styles.description_div}>
                        <p>{toDo?.description}</p>
                    </div>
                    <div className={styles.info_actions}>
                        <div className={styles.percentage_div}>
                            <Box sx={{ width: '80%' }} className={styles.progress}>
                                <LinearProgressWithLabel value={toDo?.progress} />
                                <div className={styles.inc_dec_buttons}>
                                    <Button size="small" onClick={() => handleInc(toDo?.id)} className={styles.plus_button}>+</Button>
                                    <Button size="small" onClick={() => handleDec(toDo?.id)} className={styles.minus_button}>-</Button>
                                </div>
                            </Box>
                        </div>
                        <div className={styles.deadline_div}>
                            <p>Deadline  {toDo?.deadline}</p>
                        </div>
                        <div className={styles.createdAt_div}>
                            <p>Created At  {toDo?.createdAt}</p>
                        </div>
                        <div className={styles.info_buttons}>
                            <Button onClick={() => deleteList(toDo?.id)} className={styles.info_delete_button}>Delete</Button>
                            <Button className={styles.info_update_button} onClick={() => {
                                handleToggleUpdateModal();
                                setUpdateableData({ ...toDo })
                            }}>Update</Button>
                        </div>
                        <ModalForm type="update" toggleModal={toggleUpdateModal} handleToggleModal={handleToggleUpdateModal} updatableData={updatableData} />
                        <Button onClick={() => goBack()} className={styles.go_back_button}><BackIcon className={styles.back_icon} />Go Back</Button>
                    </div>
                </div>
            </div>
        </div>


    )
}

export default ToDoInfo