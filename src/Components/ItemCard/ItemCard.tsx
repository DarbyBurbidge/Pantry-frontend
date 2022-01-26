import React from 'react';
import { CurrentUserAllDocument, useDeleteItemMutation } from '../../generated/graphql';
import { AddItemForm } from '../AddItemForm/AddItemForm';


interface ItemCardProps {
    item: {
        __typename?: "Item" | undefined;
        _id: string;
        itemName: string;
        expiration: string;
    };
}

export const ItemCard: React.FC<ItemCardProps> = ({item}) => {
    const [ deleteItem, {} ] = useDeleteItemMutation();

    return(
        <li className="item-card">
            <ul className="item-card__container">
                <li className="item-card__attributes">
                    <span className="item-card__attributes--left">{item.itemName}</span>
                    <span className="item-card__attributes--right">{item.expiration}</span>
                </li>
                <li className="item-card__buttons">
                    <button className="button button__edit">Edit</button>  
                    <button className="button button__delete"
                        onClick={() => {
                            deleteItem({
                                variables: {
                                    _id: item._id
                                },
                                refetchQueries: [{query: CurrentUserAllDocument}]
                            });
                        }}
                    >
                        Delete
                    </button>
                </li>
            </ul>
        </li>
    );
};