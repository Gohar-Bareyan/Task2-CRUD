import { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { Box, Modal, MobileStepper, Paper, Typography, Button, ImageListItem } from '@mui/material';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { useNavigate, Link } from "react-router-dom"

import styles from "./index.module.scss"
import menu_buttons from "../../Images/menu_buttons.png"
import to_do_list from "../../Images/to_do_list.png"
import create_or_update from "../../Images/create_or_update.png"
import to_do_list_info from "../../Images/to_do_list_info.png"

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};

const steps = [
    {
        label: 'Use of buttons',
        description: `Add new task button opens a modal where you can add new tasks for you.
            Search button is designed for searching some tasks from your To Do List.
            You can also sort your To Do List alphabetically or by date.`,
        image: menu_buttons
    },
    {
        label: 'To Do List',
        description:
            `Your tasks are going to be written in this To Do List table.
             You'll see the title and progress of your task, you'll also be able to update or delete your task.`,
        image: to_do_list
    },
    {
        label: 'Create or Update a task',
        description: `This is the form which will allow you to create a new task or update the existing one`,
        image: create_or_update
    },
    {
        label: 'Task in detail',
        description: `Here you'll see the whole information about your task,
            you'll also be able to perform some actions like delete/update your task, 
            to increase/decrease the progress of your task, and go back to To Do List page`,
        image: to_do_list_info
    },
];

const StepperForm = () => {
    const navigate = useNavigate()

    // modal
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
        navigate("/to-do-list")
    };

    useEffect(() => {
        if (activeStep === 3) {
            handleClose()
        } else {
            handleOpen()
        }
    }, [])

    // carusel
    const theme = useTheme();
    const [activeStep, setActiveStep] = useState(Number(localStorage.getItem('lastStep')) || 0);
    const maxSteps = steps.length;

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    localStorage.setItem("lastStep", JSON.stringify(activeStep))

    return (
        <>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={{ ...style, width: 600 }} className={styles.box}>
                    <Paper
                        className={styles.paper}
                        square
                        elevation={0}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            height: 60,
                            pl: 2
                        }}
                    >
                        <Typography className={styles.label}>{steps[activeStep].label}</Typography>
                    </Paper>
                    <Box sx={{ height: 370, maxWidth: 400, width: '100%', p: 0, ml: 9 }}>
                        {steps[activeStep].description}
                        <ImageListItem className={styles.image_list_item}>
                            <img src={steps[activeStep].image} />
                        </ImageListItem>
                    </Box>
                    <MobileStepper
                        variant="text"
                        steps={maxSteps}
                        position="static"
                        activeStep={activeStep}

                        nextButton={
                            <Button
                                size="small"
                                onClick={handleNext}
                                disabled={activeStep === maxSteps - 1}
                            >
                                Next
                                {theme.direction === 'rtl' ? (
                                    <KeyboardArrowLeft />
                                ) : (
                                    <KeyboardArrowRight />
                                )}
                            </Button>
                        }
                        backButton={
                            <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                                {theme.direction === 'rtl' ? (
                                    <KeyboardArrowRight />
                                ) : (
                                    <KeyboardArrowLeft />
                                )}
                                Back

                            </Button>

                        }

                    />
                    {activeStep === 3 && (
                        <Paper square elevation={0} sx={{ p: 3 }} className={styles.completed_paper}>
                            <Typography>All steps completed - you&apos;re finished</Typography>
                            <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                                Reset
                            </Button>
                            <Link className={styles.finish_link} to={"/to-do-list"}><Button sx={{ mt: 1, mr: 1 }}>
                                Finish
                            </Button></Link>
                        </Paper>
                    )}
                </Box>
            </Modal>
        </>
    )
}

export default StepperForm