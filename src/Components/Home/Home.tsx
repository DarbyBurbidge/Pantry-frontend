import React, { useState } from 'react';
import {  Category, Item, useAddItemMutation, useCurrentUserAllQuery, useDeleteItemMutation } from '../../generated/graphql';
import { AddCategoryForm } from '../AddCategoryForm/AddCategoryForm';
import { AddItemForm } from '../AddItemForm/AddItemForm';
import "./Home.css"

export const Home: React.FC = () => {
    const { data, loading, error } = useCurrentUserAllQuery();
 
    const [ deleteItem, {} ] = useDeleteItemMutation();


    let body = null    
    if (error) {
        console.error(error)
    } else if (loading || !data) {
        body = <div>loading...</div>
    } else {
        const categories = data.currentUser!.categories
        body = <ul className="category__list">{categories.map((category) => {
            return (
                <li className="category__container">
                    <div className="category__header">
                        <div className="category__title">{category!.categoryName}</div>
                        <AddItemForm categoryId={category._id} />
                    </div>
                    <ul className="category__body">
                        {category!.items!.map((item) => {
                            return(
                                <li className="category__item__entry">
                                    <ul className="item__attribute__list">
                                        <li className="item item__attribute">{item.itemName} {item.expiration}</li>
                                        <li className="item__list__button item__attribute">
                                            <button className="item__button deleteitem__button"
                                                onClick={() => {deleteItem({
                                                    variables: {
                                                        _id: item._id
                                                    }
                                                });
                                                window.location.href = '/'
                                            }}
                                            >Delete Item</button>
                                        </li>
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
            <AddCategoryForm />
        </div>
    </>);
};