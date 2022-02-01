import React from 'react';
import { getAccessToken } from '../../accessToken';
import { useCurrentUserAllLazyQuery, useCurrentUserAllQuery } from '../../generated/graphql';
import { AddCategoryForm } from '../AddCategoryForm/AddCategoryForm';
import { CategoryCard } from '../CategoryCard/CategoryCard';

const Home: React.FC = () => {
    const { data, loading, error } = useCurrentUserAllQuery();


    let body = null    
    if (error) {
        console.error(error)
        body = <div className="body">Please Log In:</div>
    } else if (loading) {
        body = <div className="body">loading... I wish you luck</div>
    } else if (!data?.currentUser) {
        body = <div className="body">{/*<WelcomePage />*/`${getAccessToken()} `} This is no data, why is the query not firing</div>
    } else {
        const categories = data.currentUser!.categories
        body = <div className="body">
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