import React, { useState } from 'react';
import { CurrentUserAllDocument, useAddItemMutation } from '../../generated/graphql';

interface AddItemProps {
    className: string;
    categoryId: string;
}

export const AddItemForm: React.FC<AddItemProps> = ({className, categoryId}) => {
    const [addItem,] = useAddItemMutation();

    const today = new Date().toISOString().split('T')
    console.log(today[0])
    const [ formToggle, setFormToggle ] = useState(false);
    const [ itemName, setItemName ] = useState('');
    const [ hasExp, setHasExp ] = useState(true);
    const [ expiration, setItemExp ] = useState(today[0]);


    return(
        <div className={formToggle ? 'form__container form__container--active' : 'form__container'}>
            {formToggle ? (
                
                <form className="item-form exp-alter" onSubmit={(e) => {
                    e.preventDefault();
                    if (!formToggle) {
                        return
                    }
                    console.log(`The expiration is ${expiration}`)
                    const submitExp = hasExp ? expiration : 'N/A';
                    addItem({variables: {
                        itemName,
                        categoryId,
                        expiration: submitExp
                    }, refetchQueries: [{query: CurrentUserAllDocument}]})
                    console.log("submit");
                    setFormToggle(!formToggle);
                }}>
                    <button className="cancel__button" type="button" onClick={() => { setFormToggle(false)}}>x</button>
                    <label className="item-form__name-label exp-alter">Item:</label>
                    <input className="item-form__input item-name exp-alter" type="text" placeholder="item name" value={itemName} onChange={(e) => {setItemName(e.target.value)}} autoFocus required/>
                    <label className="item-form__exp-label exp-alter">Expiration:</label>
                    <input className="item-form__input item-exp exp-alter" type="date" value={expiration} onChange={(e) => {setItemExp(e.target.value)}} pattern="\d{2}-\d{2}-\d{4}"/>
                    <button className="item-form__expiration-toggle item-form__expiration-toggle--on button exp-alter" type="button" onClick={() => {
                        const elements = document.getElementsByClassName('exp-alter');
                        console.log(elements);
                        for (let i = 0; i < elements.length; i++) {
                            elements[i].classList.remove(`exp-${hasExp}`);
                            elements[i].classList.add(`exp-${!hasExp}`);
                        }
                        setHasExp(!hasExp);
                    }} >
                        { hasExp ? 'Missing Expiration' : 'Has Expiration' }
                    </button> 
                    <button className="button button__add add-item submit-item" type="submit" >
                        Submit Item
                    </button>
                </form>
            ) : (
                <button className={className}
                    onClick={() => { if (!formToggle) {
                        setFormToggle(!formToggle)
                    }}}
                >
                    Add Item
                </button>
            )}
            
        </div>
    );
};