import React from 'react';

interface QuantityButtonProps {
    className: string;
    objectId: string;
    initVal: number;
    changeAmt: number;
    onClickCallback: Function;
}

export const QuantityButton: React.FC<QuantityButtonProps> = ({className, objectId, initVal, changeAmt, onClickCallback}) => {
    const [callback] = onClickCallback();
    
    return(<>
        <button className={className} type="button" onClick={() => {
            callback({
                variables: {
                    id: objectId,
                    newQuant: initVal+changeAmt
                }                
            })
        }}></button>
    </>);
};