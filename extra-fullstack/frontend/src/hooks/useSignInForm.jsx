import { useState, useEffect } from 'react';

export function useSignInForm() {

    const [values, setValues] = useState({
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState({
        email: '',
        password: ''
    });

    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (success) {
            const timer = setTimeout(() => {
                setSuccess(false);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [success]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setValues({ ...values, [name]: value });
        setErrors({ ...errors, [name]: '' });
    };

    const validate = () => {
        const newErrors = {};

        if (!values.email) {
            newErrors.email = 'El correo es requerido';
        } else if (!values.email.includes('@')) {
            newErrors.email = 'El correo no es válido';
        }

        if (!values.password) {
            newErrors.password = 'La contraseña es requerida';
        } else if (values.password.length < 6) {
            newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
        }

        return newErrors;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setSuccess(false);
        const newErrors = validate();

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setSuccess(true);
        setValues({ email: '', password: '' });
    };

    return { values, errors, success, handleChange, handleSubmit };
}