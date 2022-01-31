import React from 'react';
import { useCurrentUserAllQuery } from '../../generated/graphql';
import { AddCategoryForm } from '../AddCategoryForm/AddCategoryForm';
import { CategoryCard } from '../CategoryCard/CategoryCard';
import "./Home.css"

export const Home: React.FC = () => {
    const { data, loading, error } = useCurrentUserAllQuery();


    let body = null    
    if (error) {
        console.error(error)
        body = <div className="body">Please Log In:</div>
    } else if (loading) {
        body = <div className="body">loading... I wish you luck</div>
    } else if (!data?.currentUser) {
        body = <div className="body">{/*<WelcomePage />*/}</div>
    } else {
        const categories = data.currentUser!.categories
        body = <div className="body">
            <ul className="category-list">
                {categories.map((category) => {
                    return (
                        <CategoryCard key={category._id} category={category} />
                    )
                })}
                <AddCategoryForm />
            </ul>
            
        </div>
        
    }

    return(<>
        {body}
    </>);
};