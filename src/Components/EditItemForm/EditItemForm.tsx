import React, { useState } from 'react';
import { useEditItemMutation, CurrentUserAllDocument } from '../../generated/graphql';

interface EditItemProps {
    itemName: string;
    itemExp: string;
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
    console.log(newString)
    return newString
}

const checkNA = (newExp: string) => {
    if (Date.parse(newExp).toString() === 'NaN') {
        return 'N/A'
    }
    return newExp
}

export const EditItemForm: React.FC<EditItemProps> = ({itemName, itemExp, itemId, className, formToggle}) => {
    const [newName, setNewName] = useState(itemName);
    const [newExp, setNewExp] = useState(returnToDate(itemExp))

    if(newName === 'Ground Beef') {
        console.log(newExp)
    }

    const [editItem,] = useEditItemMutation();

    const formClasses = `edit-item ${className} ${itemId}`
    console.log("rerender edit item")


    return(
        <form className={formClasses} onSubmit={async (e) => {
            e.preventDefault();
            
            try {
                await editItem({variables: {_id: itemId, itemName: newName, expiration: checkNA(newExp)}, refetchQueries: [{query: CurrentUserAllDocument}]})
            } catch (e) {
                console.error(e);
            }
            formToggle(false);
        }}>
            <div className="edit-item__input-container">
                <input type="text" className="edit-item__new-name" value={newName} onChange={(e) => {setNewName(e.target.value)}} required></input>
                <input type="date" className="edit-item__new-exp" value={newExp} onChange={(e) => {setNewExp(e.target.value)}} ></input>
            </div>
            <button type="submit" className="button button__edit">Submit Edit</button>
        </form>
    );
};