import React, { useState } from 'react';
import { Oval } from 'react-loader-spinner';
import { getAccessToken, setAccessToken } from '../../utils/accessToken';
import { CurrentUserDocument, CurrentUserQuery, useLoginMutation } from '../../generated/graphql';

interface LoginProps {
    parent: string;
    modifier?: string
}

export const Login: React.FC<LoginProps> = ({parent, modifier}) => {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ formToggle, setFormToggle ] = useState(false);

    const [login, {loading, error}] = useLoginMutation();

    if(error) {
        return (
            <div className={'login-form'}>{error.message}</div>
        )
    }


    return(
        <form className={(formToggle && modifier) ? `login-form -${modifier}` : 'login-form'} onSubmit={async e => {
            e.preventDefault();
            if (!formToggle) {
                setFormToggle(!formToggle)
                // Target the parent prop so that we can target the elements from the correct form.
                const parentElement = document.querySelector(`.${parent}`);
                const emailElement = parentElement?.querySelector('.login-form__input.-email');
                emailElement?.setAttribute('required', 'true');
                parentElement?.querySelector('.login-form__input.-password')?.setAttribute('required', 'true');
                (emailElement as HTMLElement).focus();
                return
            }
            let response
            try {
                //attempt to login using the form info, storing the user details in the cache
                response = await login({
                    variables: {
                        email,
                        password
                    },
                    //stores a query in the cache that gets the current users info
                    update: (store, {data}) => {
                        if (!data) {
                            return null;
                        }
                        store.writeQuery<CurrentUserQuery>({
                            query: CurrentUserDocument,                        
                            data: {
                                __typename: 'Query',
                                currentUser: data.login.user
                            }
                        });
                    }
                });
            } catch (err) {
                console.error(err);
            }
            //assuming everything went well, set the accessToken using the token we received in the response
            if(response && response.data) {
                setAccessToken(response.data?.login.accessToken);
                console.log(getAccessToken());
            }
            //navigate back home
            window.location.href = "/";
        }}>
            <button className={ formToggle ? 'button login-form__input -submit toggle-input' : 'button login-form__input -submit' } type="submit" aria-label="login submit">
                {loading ? <Oval color="#222222" secondaryColor="#AAAAAA" height={14} width={14} /> : "Login"}
                </button>
                <input
                    className={ formToggle ? 'login-form__input -email toggle-input' : 'login-form__input -email' }
                    value={email}
                    placeholder="email"
                    aria-label="login email"
                    onChange={e => {
                        setEmail(e.target.value);
                    }}
                />
                <input
                    className={ formToggle ? 'login-form__input -password toggle-input' : 'login-form__input -password' }
                    type="password"
                    value={password}
                    placeholder="password"
                    aria-label="login password"
                    onChange={e => {
                        setPassword(e.target.value);
                    }}
                /> 
        </form>
    );
};