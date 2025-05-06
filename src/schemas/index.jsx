import * as Yup from 'yup'

export const AuthRegisterSchema = Yup.object({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    name: Yup.string().required('Hospital Name is required'),
    email: Yup.string().email('Email must be a valid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
    checked: Yup.bool().oneOf([true], 'This field must be checked')
})

export const AuthLoginSchema = Yup.object({
    email: Yup.string().email('Email must be a valid email').required('Email is required'),
    password: Yup.string().required('Password is required')
})

export const userSchema = Yup.object({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    role: Yup.string().required('Role is required'),
    email: Yup.string().email('Email must be a valid email').required('Email is required'),
    phone: Yup.string().required('Phone is required'),
    dateOfBirth: Yup.date().required('Date of Birth is required'),
    joiningDate: Yup.date().required('Joining Date is required'),
})