import React, { useState } from 'react';
import { CurrentUserAllDocument, useAddItemMutation } from '../../generated/graphql';

interface AddItemProps {
    className: string;
    parentType: string;
    parentId: string;
}

export const AddItemForm: React.FC<AddItemProps> = ({className, parentType, parentId}) => {
    const [addItem,] = useAddItemMutation();

    const today = new Date().toISOString().split('T');
    console.log(today[0]);
    const [ formToggle, setFormToggle ] = useState(false);
    const [ itemName, setItemName ] = useState('');
    const [ hasExp, setHasExp ] = useState(true);
    const [ quantity, setQuantity ] = useState(0);
    const [ expiration, setItemExp ] = useState(today[0]);
    const [ tags, setTags ] = useState("");


    return(
        <div className={formToggle ? 'form__container form__container--active' : 'form__container'}>
            {formToggle ? (
                
                <form className="item-form" onSubmit={(e) => {
                    e.preventDefault();
                    if (!formToggle) {
                        return
                    }
                    console.log(`The expiration is ${expiration}`)
                    const submitExp = hasExp ? expiration : 'N/A';
                    addItem({variables: {
                        itemName,
                        quantity,
                        expiration: submitExp,
                        tags: tags != "" ? tags.toLowerCase().replaceAll(" ","").split(",") : [],
                        parentType,
                    }, refetchQueries: [{query: CurrentUserAllDocument}]});
                    setItemName("");
                    setHasExp(true);
                    setItemExp(today[0]);
                    setQuantity(1);
                    setTags("");
                    console.log("submit");
                    setFormToggle(!formToggle);
                }}>
                    <button className="cancel__button" type="button" onClick={() => { setFormToggle(false)}}>x</button>
                    <label className="item-form__label">Item:</label>
                    <input className="item-form__input item-name" type="text" placeholder="item name" value={itemName} onChange={(e) => {setItemName(e.target.value)}} required/>
                    <label className="item-form__label">Quantity:</label>
                    <input className="item-form__input item-quantity" type="number" min="0" max="12" value={quantity} onChange={(e) => {setQuantity(parseInt(e.target.value))}} required />
                    {
                        hasExp ? <>
                        <label className="item-form__label">Expiration:</label>
                        <input className="item-form__input item-exp" type="date" value={expiration} onChange={(e) => {setItemExp(e.target.value)}} pattern="\d{2}-\d{2}-\d{4}"/>
                        </> : <></>
                    }
                    <button className="item-form__expiration-toggle item-form__expiration-toggle--on button" type="button" onClick={() => {
                        setHasExp(!hasExp);
                    }} >
                        { hasExp ? 'Missing Expiration' : 'Has Expiration' }
                    </button>
                    <label className="item-form__label">Tags:</label> 
                    <input className="item-form__input item-tags" type="text" value={tags} onChange={(e) => {
                        setTags(e.target.value)
                    }}/>
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