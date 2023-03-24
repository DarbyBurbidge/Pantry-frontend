import { UserInfo } from '../UserInfo/UserInfo';


interface HeaderProps {
    skip: boolean;
}

/* Container for basic header components
the skip prop is there to skip rendering UserInfo
in the case where the accessToken doesn't exist yet*/
export const Header: React.FC<HeaderProps> = ({skip}) => {

    return(<>
        <div className="header__container">
            <img className="logo" src="refrigerator_icon.webp" alt="logo" />
            <h1 className="header-title">Easy Pantry</h1>
            {!skip ? (
                <UserInfo />
            ) : (
                <div className="user-info"></div>
            )}
        </div>
            
    </>);
};