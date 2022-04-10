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
            <QuantityButton className="quantity__button -left" objectId={itemId} initVal={quantity} changeAmt={-1} onClickCallback={useSetQuantMutation}><AiFillMinusSquare style={{'color': 'hsl(0, 40%, 70%)', 'scale': '1.5'}}/></QuantityButton>
            <span className="quantity__seperator">
            <span className="quantity__label -left">Quantity:</span>
            <span className="quantity__data -right" style={quantity == 0 ? {color: '#ff0000'} : {}}>{quantity}</span>
            </span>
            <QuantityButton className="quantity__button -right" objectId={itemId} initVal={quantity} changeAmt={1} onClickCallback={useSetQuantMutation}><AiFillPlusSquare style={{'color': 'hsl(120, 40%, 70%)', 'scale': '1.5'}}/></QuantityButton>
        </span>
    </>);
};