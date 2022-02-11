import React, { useState } from 'react';
import { Oval } from 'react-loader-spinner';
import { CurrentUserAllDocument, CurrentUserDocument, useEditUserMutation, useRegisterMutation } from '../../generated/graphql';

interface RegisterProps {
    parent: string;
    modifier?: string;
    migrate?: boolean;
}

export const Register: React.FC<RegisterProps> = ({parent, modifier, migrate}) => {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ formToggle, setFormToggle ] = useState(false);

    const [register, {loading, error}] = useRegisterMutation();
    const [userEdit,] = useEditUserMutation();

    if(error) {
        return (
            <div className={'register-form'}>{error.message}</div>
        )
    }


    return(<div>
    <form className={(formToggle && modifier) ? `register-form -${modifier}` : 'register-form'} onSubmit={async e => {
        e.preventDefault();
        if (!formToggle) {
            setFormToggle(!formToggle);
            const parentElement = document.querySelector(`.${parent}`);
            const emailElement = parentElement?.querySelector(`.register-form__input.-email`);
            emailElement?.setAttribute('required', 'true');
            parentElement?.querySelector(`.register-form__input.-password`)?.setAttribute('required', 'true');
            (emailElement as HTMLElement).focus();
            return
        } else if (migrate) {
            try {
                await userEdit({
                    variables: {
                        email,
                        password
                    }, 
                    refetchQueries: [{
                        query: CurrentUserDocument
                    }, {
                        query: CurrentUserAllDocument
                    }]
                });
            }
            catch (err) {
                console.error(err);
            }
        } else {
            try {
                //attempt to register using the form info, storing the user details in the cache
                await register({
                    variables: {
                        email,
                        password
                    }
                });
            } catch (err) {
                console.error(err);
            }
        }
    }}>
        <button className={formToggle ? `button register-form__input -submit toggle-input` : `button register-form__input -submit` } type="submit" aria-label="register submit">
            {loading ? <Oval color="#222222" secondaryColor="#AAAAAA" height={14} width={14} /> : "Register"}
        </button>
        <input
            className={formToggle ? `register-form__input -email toggle-input` : `register-form__input -email` }
            value={email}
            placeholder="email"
            aria-label="register email"
            onChange={e => {
                setEmail(e.target.value);
            }}
        />
        <input
            className={formToggle ? `register-form__input -password toggle-input` : `register-form__input -password` }
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