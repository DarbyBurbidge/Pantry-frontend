import React, { useState } from 'react';
import { setAccessToken } from '../../accessToken';
import { CurrentUserDocument, CurrentUserQuery, useLoginMutation } from '../../generated/graphql';

export const Login: React.FC = () => {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ formToggle, setFormToggle ] = useState(false);

    const [login, {loading, error}] = useLoginMutation();

    if(loading) {
        return (
            <div>loading...</div>
        )
    }
    if(error) {
        return (
            <div>{error.message}</div>
        )
    }


    return(
        <form className="login-form" onSubmit={async e => {
            e.preventDefault()
            if (!formToggle) {
                setFormToggle(!formToggle)
                const focusInput = document.querySelector('.email--login');
                focusInput?.setAttribute('required', 'true');
                focusInput?.nextElementSibling?.querySelector('.password--login')?.setAttribute('required', 'true');
                (focusInput as HTMLElement).focus()
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
                console.error(err)
            }
            //assuming everything went well, set the accessToken using the token we received in the response
            if(response && response.data) {
                setAccessToken(response.data?.login.accessToken)
            }
            //navigate back home
            window.location.href = "/"
        }}>
            <button className={formToggle ? 'form-input login toggle-input button button__login' : 'form-input login button button__login' } type="submit" aria-label="login submit">Login</button>
                <input
                    className={formToggle ? 'form-input email email--login toggle-input ' : 'form-input email email--login' }
                    value={email}
                    placeholder="email"
                    aria-label="login email"
                    onChange={e => {
                        setEmail(e.target.value);
                    }}
                />
                <input
                    className={formToggle ? 'form-input password password--login toggle-input button button__login' : 'form-input password password--login button button__login' }
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