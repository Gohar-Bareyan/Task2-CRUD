import React, { useEffect, useRef, useState } from 'react';
import {
    Button, TextField, Autocomplete, ButtonGroup, ClickAwayListener, Grow, Paper, Popper,
    MenuItem, MenuList, Box, Typography, Modal
} from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';

import { ReactComponent as AdditionIcon } from "../../Images/addition.svg"
import styles from "./index.module.scss"
import { getToDoListRequest, setToDoListRequest } from '../../Store/ToDoList/Action';
import { useSelector } from 'react-redux';
import { RootState } from '../../Store/Root';

const top100Films = [
    { label: 'The Shawshank Redemption', year: 1994 },
    { label: 'The Godfather', year: 1972 }
];

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
    // console.log('******',toDoList);


    const dispatch = useDispatch()

    const [open, setOpen] = useState(false);
    const anchorRef = useRef<HTMLDivElement>(null);
    const [selectedIndex, setSelectedIndex] = useState(1);

    const handleClick = () => {
        console.info(`You clicked ${options[selectedIndex]}`);
    };

    const handleMenuItemClick = (
        event: React.MouseEvent<HTMLLIElement, MouseEvent>,
        index: number,
    ) => {
        setSelectedIndex(index);
        setOpen(false);
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
        dispatch(setToDoListRequest({data, toDoList}))
        reset()
    }

    useEffect(() => {
        dispatch(getToDoListRequest())
    }, [])
    
    return (
        <>
            <div className={styles.main}>
                <div className={styles.header}>
                    <h1>To Do List</h1>
                </div>
                <div className={styles.menu}>
                    <Button className={styles.add_button} onClick={handleToggleModal}><AdditionIcon className={styles.add_icon} />Add new task</Button>
                    <Autocomplete
                        // onInputChange={onInputChange}
                        disablePortal
                        className={styles.autocomplete}
                        options={top100Films}
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
                                                    disabled={index === 2}
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


                <div className={styles.table_div}>
                        <table>
                            <thead>
                                <tr>
                                    <th className={styles.title_tr}>Title</th>
                                    <th className={styles.progress_tr}>Progress</th>
                                    <th className={styles.actions_tr}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {toDoList && toDoList?.map((list:any) => {
                                    return(
                                        <tr key={list.id}>
                                            <td className={styles.title}>{list.title}</td>
                                            <td>Progress</td>
                                            <td>
                                                <Button className={styles.update_button}>Update</Button>
                                                <Button className={styles.delete_button}>Delete</Button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
            </div>
        </>
    )
}

export default ToDoList