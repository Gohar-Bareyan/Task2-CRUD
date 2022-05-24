import React, { useEffect, useRef, useState } from 'react';
import {
    Button, TextField, Autocomplete, ButtonGroup, ClickAwayListener, Grow, Paper, Popper,
    MenuItem, MenuList, Box, Modal, MobileStepper
} from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom"

import { ReactComponent as AdditionIcon } from "../../Images/addition.svg"
import styles from "./index.module.scss"
import { deleteToDoList, getToDoListRequest, setToDoListRequest, sortAlphabetically, sortByDate } from '../../Store/ToDoList/Action';
import { RootState } from '../../Store/Root';
import Header from '../Header';

const options = ['Sort by date', 'Sort alphabetically'];

//add new task - modal
const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    height: 400,
    bgcolor: '#C1C4CD ',
    border: "none",
    boxShadow: 24,
    p: 4,
    maxHeight: '90vh'
};

type Inputs = {
    deadline: number,
    title: string,
    description: string,
};

export const ToDoList = () => {
    // yup for add new task

    const validationSchema = Yup.object().shape({
        deadline: Yup.string()
            .required('Deadline must be specified'),
        title: Yup.string()
            .required('Title is required'),
        description: Yup.string()
            .required('Description is required'),
    });

    const { toDoList } = useSelector((state: RootState) => state.toDoList)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getToDoListRequest())
    }, [])

    const [open, setOpen] = useState(false);
    const anchorRef = useRef<HTMLDivElement>(null);
    const [selectedIndex, setSelectedIndex] = useState(1);
    // console.log(selectedIndex === 0);

    const handleClick = () => {
        console.info(`You clicked ${options[selectedIndex]}`);
    };

    const handleMenuItemClick = (
        event: React.MouseEvent<HTMLLIElement, MouseEvent>,
        index: number,
    ) => {
        setSelectedIndex(index);
        setOpen(false);
        if (index === 0) {
            dispatch(sortByDate())
        } else {
            dispatch(sortAlphabetically())
        }
    };

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event: Event) => {
        if (
            anchorRef.current &&
            anchorRef.current.contains(event.target as HTMLElement)
        ) {
            return;
        }

        setOpen(false);
    };

    const [toggleModal, setToggleModal] = useState(false);
    const handleToggleModal = () => setToggleModal(!toggleModal);

    const { register, reset, handleSubmit, formState: { errors } } = useForm<Inputs>({ resolver: yupResolver(validationSchema) });
    const onSubmit: SubmitHandler<Inputs> = (data) => {
        dispatch(setToDoListRequest({ data, toDoList }))
        reset()
    }

    const deleteList = (id: number) => {
        dispatch(deleteToDoList(id, toDoList))
    }

    const [searchedCriteria, setSearchedCriteria] = useState('');

    const onInputChange = (e: any, value: any) => {
        setSearchedCriteria(value)
    };

    const toDoListOptions = toDoList.map((list: any) => {
        return {
            label: list.title
        }
    })

    let toDoListArr = [...toDoList];
    if (searchedCriteria !== '') {
        toDoListArr = toDoListArr.filter((list) => {
            return list.title.indexOf(searchedCriteria) > -1
        })
    }

    const [activeStep, setActiveStep] = useState(0);


    return (
        <>
            <div className={styles.main}>
                <Header title={"To Do List"} />
                <div className={styles.menu}>
                    <Button className={styles.add_button} onClick={handleToggleModal}><AdditionIcon className={styles.add_icon} />Add new task</Button>
                    <Autocomplete
                        onInputChange={onInputChange}
                        disablePortal
                        className={styles.autocomplete}
                        options={toDoListOptions}
                        sx={{ width: 200 }}
                        renderInput={(params) => <TextField className={styles.autocomplete_textfield} {...params} placeholder="Search ..." variant="outlined" />}
                    />

                    <Modal
                        open={toggleModal}
                        onClose={handleToggleModal}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style} className={styles.modal}>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className={styles.deadline_div}>
                                    <label htmlFor='deadline'>Deadline</label>
                                    <input type="date" id="deadline" className='form-control mt-2' {...register('deadline', { required: true })} />
                                    {errors.deadline && <p className='text-danger'>Deadline must be specified</p>}
                                </div>
                                <div className={styles.add_task_div}>
                                    <label htmlFor='title'>Title</label>
                                    <input placeholder="Type your title" type="text" id="title" className='form-control mt-2' {...register('title', { required: true })} />
                                    {errors.title && <p className='text-danger'>Title is required.</p>}
                                </div>
                                <div className={styles.description_div}>
                                    <label htmlFor='description'>Description</label>
                                    <textarea placeholder="Type your description" id="description" className='form-control mt-2' {...register('description', { required: true })} />
                                    {errors.description && <p className='text-danger'>Description is required.</p>}
                                </div>
                                <span>_________________________________________________________________________________</span>
                                <div className={styles.close_create_buttons}>
                                    <Button className={styles.add_task_close_button} onClick={handleToggleModal}>Close</Button>
                                    <Button className={styles.add_task_create_button} type="submit">Create</Button>
                                </div>
                            </form>
                        </Box>
                    </Modal>


                    <ButtonGroup ref={anchorRef} aria-label="split button" className={styles.sort_button_group}>
                        <Button onClick={handleClick} className={styles.sort_button}>{options[selectedIndex]}</Button>
                        <Button
                            size="small"
                            aria-controls={open ? 'split-button-menu' : undefined}
                            aria-expanded={open ? 'true' : undefined}
                            aria-label="select merge strategy"
                            aria-haspopup="menu"
                            onClick={handleToggle}
                        >
                            <ArrowDropDownIcon />
                        </Button>
                    </ButtonGroup>
                    <Popper
                        open={open}
                        anchorEl={anchorRef.current}
                        role={undefined}
                        transition
                        disablePortal
                    >
                        {({ TransitionProps, placement }) => (
                            <Grow
                                {...TransitionProps}
                                style={{
                                    transformOrigin:
                                        placement === 'bottom' ? 'center top' : 'center bottom',
                                }}
                            >
                                <Paper>
                                    <ClickAwayListener onClickAway={handleClose}>
                                        <MenuList id="split-button-menu" autoFocusItem>
                                            {options.map((option, index) => (
                                                <MenuItem
                                                    key={option}
                                                    // disabled={index === 2}
                                                    selected={index === selectedIndex}
                                                    onClick={(event) => handleMenuItemClick(event, index)}
                                                >
                                                    {option}
                                                </MenuItem>
                                            ))}
                                        </MenuList>
                                    </ClickAwayListener>
                                </Paper>
                            </Grow>
                        )}
                    </Popper>
                </div>



                <div className={styles.table_div} id="table_div">
                    <table>
                        <thead>
                            <tr>
                                <th className={styles.title_tr}>Title</th>
                                <th className={styles.progress_tr}>Progress</th>
                                <th className={styles.actions_tr}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {toDoListArr?.map((list: any) => {
                                return (
                                    <tr key={list.id} >
                                        <td className={styles.title}><Link to={`/to-do-info/${list.id}`}>{list.title}</Link></td>
                                        <td><Link to={`/to-do-info/${list.id}`}>
                                            <MobileStepper
                                                className={styles.stepper}
                                                variant="progress"
                                                steps={6}
                                                position="static"
                                                activeStep={activeStep}
                                                sx={{ maxWidth: 500, flexGrow: 1 }}
                                                nextButton={""}
                                                backButton={""}
                                            />
                                        </Link>
                                        </td>
                                        <td>
                                            <Button className={styles.update_button} onClick={handleToggleModal}>Update</Button>
                                            <Button className={styles.delete_button} onClick={() => deleteList(list.id)}>Delete</Button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>





                {/* <Modal
                    open={toggleModal}
                    onClose={handleToggleModal}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style} className={styles.modal}>
                        {toDoListArr && toDoListArr.map((list: any) => {
                            return (
                                <form onSubmit={handleSubmit(onSubmit)} key={list.id}>

                                    <div className={styles.deadline_div}>
                                        <label htmlFor='deadline'>Deadline</label>
                                        <input type="date" id="deadline" className='form-control mt-2' {...register('deadline', { required: true })} />
                                        {errors.deadline && <p className='text-danger'>Deadline must be specified</p>}
                                    </div>
                                    <div className={styles.add_task_div}>
                                        <label htmlFor='title'>Title</label>
                                        <input placeholder="Type your title" type="text" id="title" className='form-control mt-2' {...register('title', { required: true })} />
                                        {errors.title && <p className='text-danger'>Title is required.</p>}
                                    </div>
                                    <div className={styles.description_div}>
                                        <label htmlFor='description'>Description</label>
                                        <textarea placeholder="Type your description" id="description" className='form-control mt-2' {...register('description', { required: true })} />
                                        {errors.description && <p className='text-danger'>Description is required.</p>}
                                    </div>
                                    <span>_________________________________________________________________________________</span>
                                    <div className={styles.close_create_buttons}>
                                        <Button className={styles.add_task_close_button} onClick={handleToggleModal}>Close</Button>
                                        <Button className={styles.add_task_create_button} type='submit'>Update</Button>
                                    </div>
                                </form>
                            )
                        })}

                    </Box>
                </Modal> */}
            </div>
        </>
    )
}

export default ToDoList