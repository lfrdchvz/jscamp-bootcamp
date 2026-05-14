import { useState, useEffect } from 'react';

export function useSignUpForm() {

    const [values, setValues] = useState({
        fullName: '',
        phone: '',
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState({
        fullName: '',
        phone: '',
        email: '',
        password: ''
    });

    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (success) {
            const timer = setTimeout(() => setSuccess(false), 3000);
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

        if (!values.fullName.trim()) {
            newErrors.fullName = 'El nombre completo es requerido';
        } else if (values.fullName.trim().length < 3) {
            newErrors.fullName = 'El nombre debe tener al menos 3 caracteres';
        }

        if (!values.phone.trim()) {
            newErrors.phone = 'El teléfono es requerido';
        } else if (!/^\+?[\d\s\-()]{7,15}$/.test(values.phone.trim())) {
            newErrors.phone = 'El teléfono no es válido';
        }

        if (!values.email.trim()) {
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
        setValues({ fullName: '', phone: '', email: '', password: '' });
    };

    return { values, errors, success, handleChange, handleSubmit };
}