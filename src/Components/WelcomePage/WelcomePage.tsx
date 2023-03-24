import React, { useEffect } from 'react';
import { Oval } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import { CurrentUserAllDocument, CurrentUserDocument, useCurrentUserQuery, useRegisterAndLoginMutation } from '../../generated/graphql';

const generateGuest = () => {
    let guest = ''
    for (let i = 0; i < 12; i++) {
        guest += (Math.round(Math.random() * (16))).toString(16)
    }
    return guest
}

export const WelcomePage: React.FC = () => {
    const { data, error } = useCurrentUserQuery();
    const [registerAndLogin, {loading}] = useRegisterAndLoginMutation();
    const navigate = useNavigate();

    useEffect(() => {
        if (data?.currentUser) {
            navigate('/home')
        }
    }, [data, error, navigate])

    if (error) {
        console.error(error);
    }
    return(
    <div className="body welcome">
        <section className="welcome__section">
            <h1 className="welcome__title">Welcome</h1>
            <h3 className="welcome__header">Easy Pantry is here to help</h3>
            <p>Easy Pantry is an organizational app built to help you organize and keep track of your pantry so you don't have to.</p>
            <p>It's simple layout and interface makes it easy to get started.</p>
            <aside className="welcome__aside">
                <button className="welcome__action" onClick={async () => {
                    const guest = generateGuest();
                    try {
                        await registerAndLogin({
                            variables: {
                                email: `guest${guest}`,
                                password: guest
                            }, 
                            refetchQueries: [{
                                query: CurrentUserDocument
                            }, {
                                query: CurrentUserAllDocument
                            }]
                        })
                    } catch (err) {
                        console.error(err)
                    }
                        navigate('/home');
                }}>
                    {loading ? <Oval color="#222222" secondaryColor="#AAAAAA" height={14} width={14}/> : "TRY IT NOW"}
                </button>
            </aside>
        </section>
    </div>
    );
};