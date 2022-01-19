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
                <button type="submit" className="category__button addcategory__button button__submit">
                    Submit Component
                </button>
                <input className="category__input" type="text" placeholder="category name" value={categoryName} onChange={(e) => {setCategoryName(e.target.value)}} required/>
            </form>
        ) : (
            <button className="category__button addcategory__button"
                onClick={() => { if (!formToggle) {
                    setFormToggle(!formToggle)
                }}}
            >
                Add Component
            </button>
        )
    );
};