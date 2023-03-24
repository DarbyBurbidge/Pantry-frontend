import React from 'react';
import { HiOutlineStar, HiStar } from 'react-icons/hi';
import { ImCross } from 'react-icons/im';
import { CurrentUserAllDocument, Item, useDeleteItemMutation, useToggleFavoriteMutation } from '../../generated/graphql';
import { capitalize } from '../FilterSelect/FilterSelect';
import { ExpirationComponent } from './ExpirationComponent';
import { QuantityComponent } from './QuantityComponent';


interface ItemCardProps {
    item: Item;
    parentType: string;
}

export const ItemCard: React.FC<ItemCardProps> = ({item, parentType}) => {
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
                        return (<span key={item._id + tag} className="item-card__tag">{capitalize(tag)}</span>)
                    })}
                </div>
                
                
            </div>
        </li>
    );
};