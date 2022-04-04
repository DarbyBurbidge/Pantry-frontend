import { getNullableType } from 'graphql';
import React, { useState } from 'react';
import { HiOutlineStar, HiStar } from 'react-icons/hi';
import { CurrentUserAllDocument, Item, useDeleteItemMutation, useToggleFavoriteMutation } from '../../generated/graphql';
import { EditItemForm } from '../EditItemForm/EditItemForm';
import { capitalize } from '../FilterSelect/FilterSelect';


interface ItemCardProps {
    item: Item
    parentType: string;
}

/* This whole block is likely a waste
    It was meant as a function to convert a date into a 4 digit number
    if it's not the current year but it's unnecessary
const thisYear = (date: string) => {
    console.log(`The date is: ${date}`)
    if (date == 'N/A') {
        return date
    }
    const today = new Date().toDateString();
    const thisYear = today.split(' ')[3];
    const givenYear = returnToDate(date).split('-')[0];
    if (thisYear != givenYear) {
        return givenYear.substring(2,4)
    }
    return givenYear
}
*/

const timeToExpire = (expiration: string) => {
    if (expiration == 'N/A') {
        return expiration
    }
    const today = new Date();
    const expDate = new Date(expiration);
    if ((today.getFullYear() == expDate.getFullYear()) && (today.getMonth() == expDate.getMonth())) {
        const difference = (expDate.getDate() - today.getDate())
        console.log(difference)
        return difference;
    }
    return expiration
}

export const ItemCard: React.FC<ItemCardProps> = ({item, parentType}) => {
    const [formToggle, setFormToggle] = useState(false);

    const [deleteItem,] = useDeleteItemMutation();
    const [toggleFavorite,] = useToggleFavoriteMutation();

    const timeLeft = timeToExpire(item.expiration)
    const showExpire = ((typeof(timeLeft) == 'number') && (timeLeft >= 0) && (timeLeft <= 3)) ? true : false;

    return(
        <li className="item-card">
            <div className="item-card__container">
                <span className="item-card__attributes item-card__attributes--name">
                    <span className="item-card__attributes--left">{item.itemName}</span>
                    {
                        item.favorite ? (
                            <>
                            <HiStar
                                className="item-card__attributes--right"
                                color="gold"
                                size="1.5rem"    
                            />
                            <HiOutlineStar
                            className="item-card__attributes--right -overlap"
                            color="#222"
                            size="1.5rem"
                            onClick={() => {
                                    toggleFavorite({
                                        variables: {
                                            id: item._id
                                        }
                                    ,
                                        refetchQueries: [{query: CurrentUserAllDocument}]
                                    })
                                }}
                            />
                            </>
                        ) : (
                            <HiOutlineStar
                                className="item-card__attributes--right"
                                color="#222"
                                size="1.5rem"
                                onClick={() => {
                                        toggleFavorite({
                                            variables: {
                                                id: item._id
                                            }
                                        ,
                                            refetchQueries: [{query: CurrentUserAllDocument}]
                                        })
                                    }}
                            />
                        )
                    }
                </span>
                    
                <span className="item-card__attributes">
                    <span className="item-card__attributes--left">Quantity:</span>
                    <span className="item-card__attributes--right" style={item.quantity == 0 ? {color: '#ff0000'} : {}}>{item.quantity}</span>
                </span>
                <span className="item-card__attributes" style={!showExpire ? {display: 'none'} : {color: '#ff0000'}}>
                    <span className="item-card__attributes--left">{`Expires:`}</span>
                    <span className="item-card__attributes--right">{`${timeLeft} Day${timeLeft != 1 ? 's' : ''}`}</span>
                </span>
                <div className="item-card__tags">
                    <div className="item-card__tags__label">Tags:</div>
                    {item.tags.map((tag)=> {
                        return (<span className="item-card__tag">{capitalize(tag)}</span>)
                    })}
                </div>
                <div className="item-card__buttons">
                    <button className="button button__edit" onClick={() => setFormToggle(!formToggle)}>Edit</button>  
                    <button className="button button__delete"
                        onClick={() => {
                            deleteItem({
                                variables: {
                                    id: item._id,
                                    parentType 
                                },
                                refetchQueries: [{query: CurrentUserAllDocument}]
                            });
                        }}
                    >
                        Delete
                    </button>
                </div>
                <EditItemForm itemName={item.itemName} itemExp={item.expiration} itemQuant={item.quantity} itemId={item._id} className={`display-${formToggle}`} formToggle={setFormToggle}/>
            </div>
        </li>
    );
};