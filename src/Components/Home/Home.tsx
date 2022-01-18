import React from 'react';
import { useCurrentUserAllQuery } from '../../generated/graphql';
import "./Home.css"

export const Home: React.FC = () => {
    const { data, loading, error } = useCurrentUserAllQuery();

    let body = null    
    if (error) {
        console.error(error)
    } else if (loading || !data) {
        body = <div>loading...</div>
    } else {
        const categories = data.currentUser?.categories!
        body = <ul>{categories.map((category: any) => {
            return (
                <li className="category__container">
                <div className="category__title">{category.categoryName}</div>
                    <ul>
                        {category.items.map((item: any) => {
                            return(
                                <li className="category__list__entry">
                                    <ul className="item__list">
                                        <li className="item__list__entry">{item.itemName}</li>
                                        <li className="item__list__entry">{item.expiration}</li>
                                    </ul>
                                </li>
                            )
                        })}
                    </ul>
                </li>
            )
        })}
        </ul>
    }

    return(<>
        <div className="home__container">
        {body}
        </div>
    </>);
};