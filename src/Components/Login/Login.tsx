import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setAccessToken } from '../../accessToken';
import { CurrentUserDocument, CurrentUserQuery, useLoginMutation } from '../../generated/graphql';

export const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
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


    return(<>
    <form onSubmit={async e => {
        e.preventDefault()
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
        navigate("/");
    }}>
        <div>
            <input
            value={email}
            placeholder="email"
            onChange={e => {
                setEmail(e.target.value);
            }}
            />
        </div>
        <div>
            <input
            type="password"
            value={password}
            placeholder="password"
            onChange={e => {
                setPassword(e.target.value);
            }}
            />
        </div>
    <button type="submit">Login</button> 
    </form>
    </>);
};