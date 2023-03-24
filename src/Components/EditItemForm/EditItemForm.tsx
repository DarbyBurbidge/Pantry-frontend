import React, { useState } from 'react';
import { useEditItemMutation, CurrentUserAllDocument } from '../../generated/graphql';

interface EditItemProps {
    itemName: string;
    itemExp: string;
    itemQuant: number;
    itemId: string;
    className: string;
    formToggle: any;
}

export const returnToDate = (dateString: string) => {
    const splitString = dateString.split('/');
    let month = splitString[0]
    let day = splitString[1]
    let year = splitString[2]
    if(year && year.length < 3) {
        year = `20${year}`
    }
    if(month && month.length < 2) {
        month = `0${month}`
    } 
    if(day && day.length < 2) {
        day = `0${day}`
    }
    const newString = `${year}-${month}-${day}`
    return newString
}

const checkNA = (newExp: string) => {
    if (Date.parse(newExp).toString() === 'NaN') {
        return 'N/A'
    }
    return newExp
}

export const EditItemForm: React.FC<EditItemProps> = ({itemName, itemExp, itemQuant, itemId, className, formToggle}) => {
    const [newName, setNewName] = useState(itemName);
    const [newQuant, setNewQuant] = useState(itemQuant);
    const [newExp, setNewExp] = useState(returnToDate(itemExp));

    const [editItem,] = useEditItemMutation();

    const formClasses = `edit-item ${className} ${itemId}`


    return(
        <form className={formClasses} onSubmit={async (e) => {
            e.preventDefault();
            
            try {
                await editItem({variables: {id: itemId, itemName: newName, expiration: checkNA(newExp), quantity: newQuant}, refetchQueries: [{query: CurrentUserAllDocument}]})
            } catch (err) {
                console.error(err);
            }
            formToggle(false);
        }}>
            <div className="edit-item__input-container">
                <input type="text" className="edit-item__new-name" value={newName} onChange={(e) => {setNewName(e.target.value)}} required></input>
                <input type="number" max="12" min="0" className="edit-item__new-quant" value={newQuant} onChange={(e) => {setNewQuant(parseInt(e.target.value))}} required></input>   
                <input type="date" className="edit-item__new-exp" value={newExp} onChange={(e) => {setNewExp(e.target.value)}} ></input>
            </div>
            <button type="submit" className="button button__edit">Submit Edit</button>
        </form>
    );
};