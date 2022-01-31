import React, { useState } from 'react';
import { useAddCategoryMutation } from '../../generated/graphql';


/* TODO: Fix focusing on input element on toggle */

export const AddCategoryForm: React.FC = () => {
    const [addCategory,] = useAddCategoryMutation();

    const [ formToggle, setFormToggle ] = useState(false);
    const [ categoryName, setCategoryName ] = useState('');


    /*
    const focusElement = document.querySelector(".add-category__input");
    console.log(focusElement);
    
    if (focusElement) {
        (focusElement as HTMLElement).focus()
    }

    */
    return(
        <div className="form-container">
        {formToggle ? (
            <form className="add-category" onSubmit={(e) => {
                e.preventDefault();
                if (!formToggle) {
                    return
                }
                addCategory({variables: {
                    categoryName
                }})
                console.log("submit");
                setFormToggle(!formToggle);
                window.location.href = '/'
            }}>
                <button className="cancel__button" type="button" onClick={() => { setFormToggle(false)}}>x</button>
                <label className="add-category__input-label">Name:</label>
                <input
                    className="add-category__input"
                    type="text"
                    placeholder="category name"
                    value={categoryName}
                    onChange={(e) => {
                        setCategoryName(e.target.value)
                    }} 
                    required
                />
                <button type="submit" className="button button__add">
                    Submit Category
                </button>
            </form>
        ) : (
            <button className="button button__add button--solo"
                onClick={() => { if (!formToggle) {
                    setFormToggle(!formToggle);
                }}}
            >
                Add Category
            </button>
        )}
        </div>
    );
};