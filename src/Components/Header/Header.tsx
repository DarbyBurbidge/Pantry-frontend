import { CurrentUserAllDocument, useCurrentUserQuery, useLogoutMutation } from '../../generated/graphql';
import { Login } from '../Login/Login';
import { Register } from '../Register/Register';

export const Header: React.FC = () => {
    const {data} = useCurrentUserQuery();
    const [logout,] = useLogoutMutation();

    return(<>
        <div className="header__container">
            <img className="logo" src="refrigerator_icon.webp" alt="logo" />
            <h1 className="header-title">The Pantry</h1>
            {data?.currentUser ? (
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
            ) : (
                <div className="link-container link-container--guest">
                    <Login />            
                    <Register />
                </div>
            )}
        </div>
            
    </>);
};