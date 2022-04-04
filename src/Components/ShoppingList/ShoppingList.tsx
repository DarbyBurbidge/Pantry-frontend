import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CurrentUserAllDocument, useCurrentUserAllQuery, useMigrateListMutation } from '../../generated/graphql';
import { AddItemForm } from '../AddItemForm/AddItemForm';
import { ItemCard } from '../ItemCard/ItemCard';


export const ShoppingList: React.FC = () => {
    const navigate = useNavigate();

    const { data, loading, error } = useCurrentUserAllQuery();
    const [ migrateList, ] = useMigrateListMutation();

    const shoppingList = data?.currentUser?.shoppingList
    const items = shoppingList?.items
    console.log(items)

    return(
        <div className="body">
            <div className="list-container">
            {
                shoppingList ? (
                    <>
                        <ul className="card-list">
                            {
                                items?.map((item)=> {
                                    return (
                                        <ItemCard key={item._id} item={item} parentType="list"/>
                                    )
                                })
                            }
                        </ul>
                        <AddItemForm className="button button__add" parentType="list" parentId={shoppingList._id}/>
                        { items?.length != 0 ? (
                            <button className="button button__edit" type="button" onClick={() => {
                                migrateList({
                                    variables: {
                                        itemIds: items?.map((item) => {return item._id})!,
                                    },
                                    refetchQueries: [{query: CurrentUserAllDocument}]
                                });
                                navigate("/home");
                            }}>Add List to Pantry</button> 
                            ) : (
                                <h1 className="error button button__delete">No Items</h1>
                            )
                        }
                    </>
                ) : (
                    <h1 className="error button button__delete">There is no shopping list. Please add a shopping list:</h1>
                )
            }
                </div>
                <button className="button button__add" type="button" onClick={() => {
                    navigate("/home");
                }}>Pantry Home</button>
        </div>
    );
};