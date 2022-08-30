import { isTypeSystemDefinitionNode } from 'graphql';
import React, { useState } from 'react';
import { useSetExpMutation } from '../../generated/graphql';
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai'

interface ExpirationComponentProps {
    className: string;
    itemId: string;
    expiration: string;
}

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

const almostExpired = (timeLeft: number | string) => {
    return ((typeof(timeLeft) == 'number') && (timeLeft >= 0) && (timeLeft <= 3)) ? false : true;
}

const calcExpString = (timeLeft: string | number) => {
    if (typeof(timeLeft) != 'number') {
        return 'N/A'
    }
    return `${timeLeft} Day${timeLeft != 1 ? 's' : ''}`
}

export const ExpirationComponent: React.FC<ExpirationComponentProps> = ({className, itemId, expiration}) => {
    const [newExp, setNewExp] = useState(expiration !== 'N/A'? expiration : 'N/A');
    const [showForm, formToggle] = useState(false);
    
    const [setExp] = useSetExpMutation();

    const timeLeft = timeToExpire(expiration);
    const displayRed = almostExpired(timeLeft);
    
    return(<>
        <span className={`${className} expiration`} style={!displayRed ? {color: '#ff0000'}: {}}>
            <span className="expiration__seperator" onClick={() => formToggle(!showForm)}>
                <span className="expiration__label -left">{`Expires:`}</span>
                {showForm ? <AiFillCaretUp style={{'position': 'absolute', 'bottom': '-.25rem'}}/> : <AiFillCaretDown style={{'position': 'absolute', 'bottom': '-.25rem'}}/>}
                <span className="expiration__data -right">{calcExpString(timeLeft)}</span>
            </span>
            
            {showForm ? (
                <span className="expiration__seperator -column">
                    <form className="expiration__form" onSubmit={async (e) => {
                        e.preventDefault();
                    
                        try {
                            await setExp({variables: {
                                id: itemId,
                                newExp: newExp
                            }})
                        } catch (e) {
                            console.error(e);
                        }
                    }}>
                    <input type="date" className="input-field" value={newExp} onChange={(e) => {setNewExp(e.target.value)}} defaultValue=""></input>
                    <button type="submit" className="expiration__button button button__edit">Submit Edit</button>
                    </form>
                </span>
            ) : ( 
                null
            )}
        </span>
    </>);
};