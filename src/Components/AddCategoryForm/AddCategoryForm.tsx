import React, { useState } from 'react';
import { useAddCategoryMutation } from '../../generated/graphql';


export const AddCategoryForm: React.FC = () => {
    const [addCategory,] = useAddCategoryMutation();

    const [ formToggle, setFormToggle ] = useState(false);
    const [ categoryName, setCategoryName ] = useState('');
    return(
        formToggle ? (
            <form className="category__form" onSubmit={(e) => {
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
                <button type="submit" className="button button__add addcategory__button button__submit">
                    Submit Category
                </button>
                <input className="category__input" type="text" placeholder="category name" value={categoryName} onChange={(e) => {setCategoryName(e.target.value)}} required/>
            </form>
        ) : (
            <button className="button button__add button__category"
                onClick={() => { if (!formToggle) {
                    setFormToggle(!formToggle)
                }}}
            >
                Add Category
            </button>
        )
    );
};