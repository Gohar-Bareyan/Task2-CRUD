import React, { useEffect, useRef, useState } from 'react';
import {
    Button, TextField, Autocomplete, ButtonGroup, ClickAwayListener, Grow, Paper, Popper,
    MenuItem, MenuList, Box, Typography
} from '@mui/material';

import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom"
import { DragDropContext, Draggable, DraggableId, Droppable, DropResult } from 'react-beautiful-dnd';


import { ReactComponent as AdditionIcon } from "../../Images/addition.svg"
import styles from "./index.module.scss"
import { deleteToDoList, getToDoListRequest, reOrderByDragAndDrop, sortAlphabetically, sortByDate } from '../../Store/ToDoList/Action';
import { RootState } from '../../Store/Root';
import Header from '../Header';
import ModalForm from '../ModalForm';
import StepperForm from '../StepperForm';
import { padding } from '@mui/system';

function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '70%', mr: 1 }}>
                <LinearProgress variant="determinate" {...props} />
            </Box>
            <Box sx={{ minWidth: 35 }}>
                <Typography variant="body2" color="text.secondary">{`${Math.round(
                    props.value,
                )}%`}</Typography>
            </Box>
        </Box>
    );
}
const options = ['Sort by date', 'Sort alphabetically'];

// drag and drop
const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
    boxShadow: isDragging ? "1px 1px 10px 0px green, inset 1px 1px 10px 0px green, 1px 1px 10px 0px green" : "none",
    ...draggableStyle
})


export const ToDoList = () => {
    const { toDoList } = useSelector((state: RootState) => state.toDoList)
    const [draggableTodos, setDraggableTodos] = useState([])

    // console.log(toDoList);

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getToDoListRequest())
    }, [])

    useEffect(() => {
        setDraggableTodos(toDoList)
    }, [toDoList])

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

    // Modals
    const [toggleCreateModal, setToggleCreateModal] = useState(false);
    const handleToggleCreateModal = () => setToggleCreateModal(!toggleCreateModal);

    const [toggleUpdateModal, setToggleUpdateModal] = useState(false);
    const handleToggleUpdateModal = () => setToggleUpdateModal(!toggleUpdateModal);

    const [updatableData, setUpdateableData] = useState({})

    const deleteList = (id: number) => {
        dispatch(deleteToDoList(id, toDoList))
    }

    // Search
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

    // drag and drop
    // console.log(draggableTodos);

    const onDragEnd = (result: DropResult) => {
        const { source, destination } = result
        // console.log(destination);
        if (!destination) return
        const items = Array.from(draggableTodos)
        const [newOrder] = items.splice(source.index, 1)
        items.splice(destination.index, 0, newOrder)
        setDraggableTodos(items)
        dispatch(reOrderByDragAndDrop({draggableTodos: draggableTodos, destinationIndex: destination.index, sourceIndex: source.index}))
    }


    return (
        <>
            <div className={styles.main}>

                <StepperForm />

                <Header title={"To Do List"} />

                <div className={styles.menu}>
                    <Button className={styles.add_button} onClick={handleToggleCreateModal}><AdditionIcon className={styles.add_icon} />Add new task</Button>
                    <Autocomplete
                        onInputChange={onInputChange}
                        disablePortal
                        className={styles.autocomplete}
                        options={toDoListOptions}
                        sx={{ width: 200 }}
                        renderInput={(params) => <TextField className={styles.autocomplete_textfield} {...params} placeholder="Search ..." variant="outlined" />}
                    />

                    <ModalForm type="create" toggleModal={toggleCreateModal} handleToggleModal={handleToggleCreateModal} />

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
                        <DragDropContext onDragEnd={onDragEnd}>
                            <Droppable droppableId="draggableTodos">
                                {(provided) => (
                                    <tbody {...provided.droppableProps} ref={provided.innerRef}>
                                        {draggableTodos.length > 0 && draggableTodos.map((list: any, index: any) => {
                                            return (
                                                <Draggable key={list.id} draggableId={`${list.id}`} index={index}>
                                                    {(provided, snapshot) => (
                                                        <tr ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}>
                                                            <td className={styles.title}><Link to={`/to-do-info/${list.id}`}>{list.title}</Link></td>
                                                            <td><Link to={`/to-do-info/${list.id}`}>
                                                                <Box sx={{ width: '100%' }} className={styles.progress}>
                                                                    <LinearProgressWithLabel value={list?.progress} />
                                                                </Box>
                                                            </Link>
                                                            </td>
                                                            <td>
                                                                <Button className={styles.update_button} onClick={() => {
                                                                    handleToggleUpdateModal();
                                                                    setUpdateableData({ ...list })
                                                                }}>Update</Button>
                                                                <Button className={styles.delete_button} onClick={() => deleteList(list.id)}>Delete</Button>
                                                            </td>
                                                        </tr>
                                                    )}
                                                </Draggable>

                                            )
                                        })}
                                    </tbody>
                                )}
                            </Droppable>
                        </DragDropContext>
                    </table>
                </div>

                <ModalForm type="update" toggleModal={toggleUpdateModal} handleToggleModal={handleToggleUpdateModal} updatableData={updatableData} />

            </div>
        </>
    )
}

export default ToDoList