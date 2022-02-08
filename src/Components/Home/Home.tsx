import React from 'react';
import { Oval } from 'react-loader-spinner';
import { useCurrentUserAllQuery } from '../../generated/graphql';
import { AddCategoryForm } from '../AddCategoryForm/AddCategoryForm';
import { CategoryCard } from '../CategoryCard/CategoryCard';
import { Register } from '../Register/Register';

const Home: React.FC = () => {
    const { data, loading, error } = useCurrentUserAllQuery();


    let body = null    
    if (error) {
        console.error(error)
        body = <div className="body">Please Log In:</div>
    } else if (loading) {
        body = <div className="body"><Oval color="#222222" secondaryColor="#AAAAAA" height={200} width={200} /></div>
    } else if (!data?.currentUser) {
        console.error('Cannot access current User: No User')
        window.location.href = '/';
    } else {
        const categories = data.currentUser!.categories
        body = <div className="body">
            {data.currentUser.email.includes('guest') ? (
                <div className="guest-banner">
                    <p className="guest-banner__message">
                        The account you are using is a temporary guest account.<br/>
                        If you would like to keep your Pantry, please sign up as a registered user:
                    </p>
                    <Register parent="guest-banner" modifier="right" migrate/>
                </div> 
            ) : null}
            <div className="category-list">
                {categories.map((category) => {
                    return (
                        <CategoryCard key={category._id} category={category} />
                    )
                })}
                <AddCategoryForm />
            </div>
            
        </div>
        
    }

    return(<>
        {body}
    </>);
};

export { Home as default };