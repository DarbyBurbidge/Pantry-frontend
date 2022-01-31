import React, { useState } from 'react';
import { CurrentUserAllDocument, useEditCategoryNameMutation } from '../../generated/graphql';

interface EditCategoryProps {
    className: string;
    categoryName: string;
    categoryId: string;
    formToggle: any;
}

export const EditCategoryForm: React.FC<EditCategoryProps> = ({className, categoryName, categoryId, formToggle}) => {
    const [newCategory, setNewCategory] = useState(categoryName);

    const [editCategory,] = useEditCategoryNameMutation();

    const formClasses = `edit-category ${className} ${categoryId}`
    console.log("rerender")


    return(
        <form className={formClasses} onSubmit={async (e) => {
            e.preventDefault();
            try {
                await editCategory({variables: {_id: categoryId, categoryName: newCategory}, refetchQueries: [{query: CurrentUserAllDocument}]})
            } catch (e) {
                console.error(e);
            }
            formToggle(false);
        }}>
            <input type="text" className="edit-category__new-category" value={newCategory} onChange={(e) => {setNewCategory(e.target.value)}} required></input>
            <button type="submit" className="button button__edit">Submit Edit</button>
        </form>
    );
};