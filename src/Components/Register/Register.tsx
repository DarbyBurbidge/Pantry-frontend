import React, { useState } from 'react';
import { useRegisterMutation } from '../../generated/graphql';

export const Register: React.FC = () => {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ formToggle, setFormToggle ] = useState(false);

    const [register, {loading, error}] = useRegisterMutation();

    if(loading) {
        return (
            <div className="register-form">loading...</div>
        )
    }
    if(error) {
        return (
            <div className="register-form">{error.message}</div>
        )
    }


    return(<div>
    <form className="register-form" onSubmit={async e => {
        e.preventDefault()
        if (!formToggle) {
            setFormToggle(!formToggle)
            const focusInput = document.querySelector('.email--register');
            focusInput?.setAttribute('required', 'true');
            document.querySelector('.password--register')?.setAttribute('required', 'true');
            (focusInput as HTMLElement).focus()
            return
        }
        try {
            //attempt to register using the form info, storing the user details in the cache
            await register({
                variables: {
                    email,
                    password
                }
            });
        } catch (err) {
            console.error(err)
        }
    }}>
        <button className={formToggle ? 'form-input register toggle-input' : 'form-input register' } type="submit" aria-label="register submit">Register</button>
            <input
                className={formToggle ? 'form-input email email--register toggle-input' : 'form-input email email--register' }
                value={email}
                placeholder="email"
                aria-label="register email"
                onChange={e => {
                    setEmail(e.target.value);
                }}
            />
            <input
                className={formToggle ? 'form-input password password--register toggle-input' : 'form-input password password--register' }
                type="password"
                value={password}
                placeholder="password"
                aria-label="register password"
                onChange={e => {
                    setPassword(e.target.value);
                }}
            /> 
    </form>
    </div>);
};