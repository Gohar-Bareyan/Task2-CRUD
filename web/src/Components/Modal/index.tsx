import { Button, Box, Modal } from '@mui/material';
import { useState } from 'react';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, SubmitHandler } from 'react-hook-form';

import styles from "./index.module.scss"
import { useDispatch } from 'react-redux';
import { setToDoListRequest } from '../../Store/ToDoList/Action';

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

const ModalComponent = () => {
    const validationSchema = Yup.object().shape({
        deadline: Yup.string()
            .required('Deadline must be specified'),
        title: Yup.string()
            .required('Title is required'),
        description: Yup.string()
            .required('Description is required'),
    });

    const dispatch = useDispatch()

    const [toggleModal, setToggleModal] = useState(false);
    const handleToggleModal = () => setToggleModal(!toggleModal);
    const { register, reset, handleSubmit, formState: { errors } } = useForm<Inputs>({ resolver: yupResolver(validationSchema) });
    const onSubmit: SubmitHandler<Inputs> = () => {
        reset()
    }
    return (
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

    )
}

export default ModalComponent