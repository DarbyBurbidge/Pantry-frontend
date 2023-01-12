import { StringValueNode } from 'graphql';
import React from 'react';
import { useSetQuantMutation } from '../../generated/graphql';
import { QuantityButton } from './QuantityButton';
import { AiFillMinusSquare, AiFillPlusSquare } from 'react-icons/ai'

interface QuantityComponentProps {
    className: string;
    itemId: string;
    quantity: number;
}

export const QuantityComponent: React.FC<QuantityComponentProps> = ({className, itemId, quantity}) => {
    const [setQuantity] = useSetQuantMutation();
    
    return(<>
        <span className={`${className} quantity`}>
        <button className="quantity__button -right" onClick={() => {
                setQuantity({
                variables: {
                    id: itemId,
                    newQuant: quantity-1
                }                
            })}}><AiFillMinusSquare style={{'color': 'hsl(0, 40%, 70%)', 'scale': '1.5'}}/></button>
            <span className="quantity__seperator">
            <span className="quantity__label -left">Quantity:</span>
            <span className="quantity__data -right" style={quantity == 0 ? {color: '#ff0000'} : {}}>{quantity}</span>
            </span>
            <button className="quantity__button -right" onClick={() => {
                setQuantity({
                variables: {
                    id: itemId,
                    newQuant: quantity+1
                }                
            })}}><AiFillPlusSquare style={{'color': 'hsl(120, 40%, 70%)', 'scale': '1.5'}}/></button>
        </span>
    </>);
};