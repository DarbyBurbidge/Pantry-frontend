import { getNullableType } from 'graphql';
import React, { useState } from 'react';
import { CurrentUserAllDocument, useDeleteItemMutation } from '../../generated/graphql';
import { EditItemForm } from '../EditItemForm/EditItemForm';


interface ItemCardProps {
    item: {
        __typename?: "Item" | undefined;
        _id: string;
        itemName: string;
        quantity: number;
        expiration: string;
    };
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

export const ItemCard: React.FC<ItemCardProps> = ({item}) => {
    const [formToggle, setFormToggle] = useState(false);

    const [ deleteItem,] = useDeleteItemMutation();

    const timeLeft = timeToExpire(item.expiration)
    const showExpire = ((typeof(timeLeft) == 'number') && (timeLeft >= 0)) ? true : false;

    return(
        <li className="item-card">
            <div className="item-card__container">
                <span className="item-card__attributes">
                    <span className="item-card__attributes--left">{item.itemName}</span>
                    <span className="item-card__attributes--right">{item.quantity}</span>
                </span>
                <span className="item-card__attributes" style={!showExpire ? {display: 'none', color: '#d19494'} : {}}>
                    <span className="item-card__attributes--center">{`Expires in ${timeLeft} Day${timeLeft != 1 ? 's' : ''}`}</span>
                </span>
                <div className="item-card__buttons">
                    <button className="button button__edit" onClick={() => setFormToggle(!formToggle)}>Edit</button>  
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
                </div>
                <EditItemForm itemName={item.itemName} itemExp={item.expiration} itemQuant={item.quantity} itemId={item._id} className={`display-${formToggle}`} formToggle={setFormToggle}/>
            </div>
        </li>
    );
};