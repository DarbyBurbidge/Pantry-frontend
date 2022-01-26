import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setAccessToken } from '../../accessToken';
import { CurrentUserDocument, CurrentUserQuery, useLoginMutation } from '../../generated/graphql';

export const Register: React.FC = () => {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ formToggle, setFormToggle ] = useState(false);
    //The new History
    const navigate = useNavigate();

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


    return(<div>
    <form className="register-form" onSubmit={async e => {
        e.preventDefault()
        if (!formToggle) {
            setFormToggle(!formToggle)
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
        <button className={formToggle ? 'form-input register toggle-input' : 'form-input register' } type="submit" aria-label="register submit">Register</button>
            <input
                className={formToggle ? 'form-input email toggle-input' : 'form-input email' }
                value={email}
                //placeholder="email"
                aria-label="register email"
                onChange={e => {
                    setEmail(e.target.value);
                }}
            />
            <input
                className={formToggle ? 'form-input password toggle-input' : 'form-input password' }
                type="password"
                value={password}
                //placeholder="password"
                aria-label="register password"
                onChange={e => {
                    setPassword(e.target.value);
                }}
            /> 
    </form>
    </div>);
};