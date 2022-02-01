import { CurrentUserAllDocument, useCurrentUserLazyQuery, useLogoutMutation } from '../../generated/graphql';
import { Login } from '../Login/Login';
import { Register } from '../Register/Register';
import { UserInfo } from '../UserInfo/UserInfo';


interface HeaderProps {
    skip: boolean;
}
export const Header: React.FC<HeaderProps> = ({skip}) => {

    return(<>
        <div className="header__container">
            <img className="logo" src="refrigerator_icon.webp" alt="logo" />
            <h1 className="header-title">The Pantry</h1>
            {!skip ? (
                <UserInfo />
            ) : (
                <div className="link-container"></div>
            )}
        </div>
            
    </>);
};