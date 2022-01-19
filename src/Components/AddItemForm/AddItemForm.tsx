import React, { useState } from 'react';
import { useAddItemMutation } from '../../generated/graphql';
import "./AddItemForm.css"

interface AddItemProps {
    categoryId: string
}

export const AddItemForm: React.FC<AddItemProps> = ({categoryId}) => {
    const [addItem,] = useAddItemMutation();

    const [ formToggle, setFormToggle ] = useState(false);
    const [ itemName, setItemName ] = useState('');
    const [ expiration, setItemExp ] = useState('')


    return(
        formToggle ? (
            <form className="item__form" onSubmit={(e) => {
                e.preventDefault();
                if (!formToggle) {
                    return
                }
                addItem({variables: {
                    itemName,
                    categoryId,
                    expiration
                }})
                console.log("submit");
                setFormToggle(!formToggle);
                window.location.href = '/'
            }}>
                <button type="submit" className="item__button additem__button button__submit">
                    Submit Item
                </button>
                <input className="item__input" type="text" placeholder="item name" value={itemName} onChange={(e) => {setItemName(e.target.value)}} required/>
                <input className="item__input" type="date" value={expiration} onChange={(e) => {setItemExp(e.target.value)}} required/>
            </form>
        ) : (
            <button className="item__button additem__button"
                onClick={() => { if (!formToggle) {
                    setFormToggle(!formToggle)
                }}}
            >
                Add Item
            </button>
        )
    );
};