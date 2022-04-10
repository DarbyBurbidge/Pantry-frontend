import React from 'react';

interface QuantityButtonProps {
    objectId: string;
    initVal: number;
    changeAmt: number;
    onClickCallback: Function;
}

export const QuantityButton: React.FC<QuantityButtonProps> = ({objectId, initVal, changeAmt, onClickCallback}) => {
    const [callback] = onClickCallback();
    
    return(<>
        <button className="button" type="button" onClick={() => {
            callback({
                variables: {
                    id: objectId,
                    newQuant: initVal+changeAmt
                }
                
            })
        }}>{""}</button>
    </>);
};