import * as Yup from 'yup';

export const todoFormSchema = Yup.object().shape({
    deadline: Yup.string()
        .required('Deadline must be specified'),
    title: Yup.string()
        .required('Title is required'),
    description: Yup.string()
        .required('Description is required'),
});