import { Button, Box, Modal } from '@mui/material';
import { useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, SubmitHandler } from 'react-hook-form';

import styles from "./index.module.scss"
import { useDispatch } from 'react-redux';
import { setToDoListRequest, updateToDoList } from '../../Store/ToDoList/Action';
import { useSelector } from 'react-redux';
import { RootState } from '../../Store/Root';
import { todoFormSchema } from '../../Validations/Schemas';

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

interface Props {
    type: string,
    toggleModal: boolean,
    handleToggleModal: Function,
    updatableData?: any
}

const ModalForm = (props: Props) => {
    const { toDoList } = useSelector((state: RootState) => state.toDoList)
    const dispatch = useDispatch()

    const { register, setValue, reset, handleSubmit, formState: { errors } } = useForm<Inputs>({ resolver: yupResolver(todoFormSchema) });
    const onSubmit: SubmitHandler<Inputs> = (data, id) => {
        if (props.type === 'create') {
            dispatch(setToDoListRequest({ data, toDoList }))
            return props.handleToggleModal()
        } else if (props.type === 'update') {
            const { updatableData: { id } } = props;
            dispatch(updateToDoList({ data, id }))
            return props.handleToggleModal()
        }
        reset()
    }

    const renderActionButton = () => {
        if (props.type === 'create') {
            return <Button className={styles.add_task_create_button} type="submit">Create </Button>
        } else if (props.type === 'update') {
            return <Button className={styles.add_task_create_button} type="submit">Update</Button>
        }
    }

    useEffect(() => {
        const { updatableData, type } = props;

        if (updatableData?.hasOwnProperty('id') && type === 'update') {
            setValue("deadline", updatableData.deadline);
            setValue("title", updatableData.title);
            setValue("description", updatableData.description);
        }
    }, [props.updatableData]);

    return (
        <Modal
            open={props.toggleModal}
            onClose={() => props.handleToggleModal()}
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
                        <Button className={styles.add_task_close_button} onClick={() => props.handleToggleModal()}>Close</Button>
                        {renderActionButton()}
                    </div>
                </form>
            </Box>
        </Modal>
    )
}

export default ModalForm