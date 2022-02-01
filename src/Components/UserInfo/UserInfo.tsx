import React from 'react';
import { CurrentUserAllDocument, useCurrentUserQuery, useLogoutMutation } from '../../generated/graphql';
import { Login } from '../Login/Login';
import { Register } from '../Register/Register';

export const UserInfo: React.FC = () => {
    const { data, error } = useCurrentUserQuery();
    const [logout,] = useLogoutMutation();

    let body: any = null;
    if (error) {
        body = <div>{error}</div>
    }
    if (data?.currentUser) {
        body = 
            <div className="link-container">
                <button
                    className="button button__logout"
                    type="button"
                    onClick={async () => {
                        console.log("logout!")
                        await logout({refetchQueries: [{query: CurrentUserAllDocument}] })
                        window.location.href = '/'
                    }}
                >
                    Logout
                </button>
            </div>
    }
    else {
        body =
            <div className="link-container link-container--guest">
                <Login />            
                <Register />
            </div>
    }
    return(<>
        {body}
    </>);
};