import React from 'react';
import { Oval } from 'react-loader-spinner';
import { CurrentUserAllDocument, useCurrentUserQuery, useLogoutMutation } from '../../generated/graphql';
import { Login } from '../Login/Login';
import { Register } from '../Register/Register';
import { setAccessToken } from '../../utils/accessToken';

export const UserInfo: React.FC = () => {
    const { data, loading: loadingQuery, error } = useCurrentUserQuery();
    const [logout,{loading}] = useLogoutMutation();

    let body: any = null;
    if (error) {
        console.error(error)
    }  else if (loadingQuery) {
        body = 
            <div className="user-info">
                <Oval color="#222222" secondaryColor="#AAAAAA" height={80} width={80} />
            </div>
    }
    else if (data?.currentUser) {
        body = 
            <div className="user-info">
                <button
                    className="button button__logout"
                    type="button"
                    onClick={async () => {
                        await logout({refetchQueries: [{query: CurrentUserAllDocument}] })
                        setAccessToken('')
                        window.location.href = "/"
                    }}
                >
                    {loading ? <Oval color="#222222" secondaryColor="#AAAAAA" height={14} width={14} /> : "Logout"}
                </button>
            </div>
    }
    else {
        body =
            <div className="user-info">
                <Login parent="user-info" modifier="right"/>            
                <Register parent="user-info" modifier="right"/>
            </div>
    }
    return(<>
        {body}
    </>);
};