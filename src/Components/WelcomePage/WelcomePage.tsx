import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CurrentUserAllDocument, useCurrentUserQuery, useLoginMutation, useRegisterMutation } from '../../generated/graphql';

const generateGuest = () => {
    let guest = ''
    for (let i = 0; i < 12; i++) {
        guest += (Math.round(Math.random() * (16))).toString(16)
    }
    return guest
}

export const WelcomePage: React.FC = () => {
    const { data, error } = useCurrentUserQuery();
    const [register,] = useRegisterMutation();
    const [login,] = useLoginMutation();
    const navigate = useNavigate();

    const parent = document.querySelector('.welcome__aside');
    const form = parent?.querySelector('.register-form');

    if (error) {
        console.log(error);
    } else if (data?.currentUser) {
        console.log('Welcome!')
        navigate('/home')
    }
    return(
    <div className="body welcome">
        <section className="welcome__section">
            <h1 className="welcome__title">Welcome</h1>
            <h3 className="welcome__header">The Pantry is here to help</h3>
            <p>The Pantry is an organizational app built to help you organize and keep track of your kitchen.</p>
            <p>It's simple layout and interface makes it easy to get started and use</p>
            <aside className="welcome__aside">
                <button className="welcome__action" onClick={async () => {
                    const guest = generateGuest();
                    register({
                        variables: {
                            email: `guest${guest}`,
                            password: guest
                        }
                    })
                    .then(async ({data}) => {
                        console.log(data?.register.message);
                        try {
                            const res = await login({
                                variables: {
                                    email: `guest${guest}`,
                                    password: guest
                                },
                                refetchQueries: [{query: CurrentUserAllDocument}]
                            });
                        } catch (err) {
                            console.error(err);
                        }
                        navigate('/home');
                    })
                    .catch((err) => {
                        console.error(err);
                    });
                }}>
                    TRY IT NOW
                </button>
            </aside>
        </section>
    </div>
    );
};