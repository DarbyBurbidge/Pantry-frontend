import React, { useState } from 'react';
import { HiOutlineStar, HiStar } from 'react-icons/hi';
import { ImCross } from 'react-icons/im';
import { CurrentUserAllDocument, Item, useDeleteItemMutation, useToggleFavoriteMutation } from '../../generated/graphql';
import { capitalize } from '../FilterSelect/FilterSelect';
import { ExpirationComponent } from './ExpirationComponent';
import { QuantityComponent } from './QuantityComponent';


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

export const ItemCard: React.FC<ItemCardProps> = ({item, parentType}) => {
    const [formToggle, setFormToggle] = useState(false);
    const [showDelete, setShowDelete] = useState(true);

    const [deleteItem] = useDeleteItemMutation();
    const [toggleFavorite] = useToggleFavoriteMutation();
 
    return(
        <li className="item-card">
            <div className="item-card__container">
                <span className="item-card__section item-card__section--name">
                    <span className="item-card__section -left">
                        {item.favorite ? (<>
                            <HiStar style={{'color':'gold', 'scale':'1.1'}}/>
                            <HiOutlineStar 
                                onClick={() => {
                                    toggleFavorite({variables: {
                                        id: item._id,
                                    }})
                                }}
                                style={{'position':'absolute', 'scale':'1.1'}}
                            />  
                        </>) : (
                            <HiOutlineStar 
                                onClick={() => {
                                    toggleFavorite({variables: {
                                        id: item._id,
                                    }})
                                }}
                                style={{'scale':'1.1'}}
                            />
                        )}
                    </span>
                    <span className="item-card__section">{item.itemName}</span>
                    <div className="item-card__delete -right">
                        <ImCross onClick={() => {
                            deleteItem({
                                variables: {
                                    id: item._id,
                                    parentType 
                                },
                                refetchQueries: [{query: CurrentUserAllDocument}]
                            });
                        }}
                        style={{'scale': '.5'}}
                        />
                    </div>                   
                </span>

                <ExpirationComponent className="item-card__section" itemId={item._id} expiration={item.expiration} />
                <QuantityComponent className="item-card__section" itemId={item._id} quantity={item.quantity} />                  
                
                <div className="item-card__tags">
                    <div className="item-card__tags__label">Tags:</div>
                    {item.tags.map((tag)=> {
                        return (<span className="item-card__tag">{capitalize(tag)}</span>)
                    })}
                </div>
                
                
            </div>
        </li>
    );
};