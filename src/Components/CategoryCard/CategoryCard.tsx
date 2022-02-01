import React, { useState } from 'react';
import { CurrentUserAllDocument, useDeleteCategoryMutation } from '../../generated/graphql';
import { EditCategoryForm } from '../EditCategoryFrom/EditCategoryForm';
import { ItemCard } from '../ItemCard/ItemCard';
import { AddItemForm } from '../AddItemForm/AddItemForm';

/* TODO: 1. Fix inability to focus the input element of the
    "Edit Category" Form when the "Edit" button is activated */


interface CategoryCardProps {
    category: {
        __typename?: "Category" | undefined;
        _id: string;
        categoryName: string;
        items?: {
            __typename?: "Item" | undefined;
            _id: string;
            itemName: string;
            expiration: string;
        }[] | null | undefined;
    };
}

export const CategoryCard: React.FC<CategoryCardProps> = ({category}) => {
    const [editFormToggle, setEditFormToggle] = useState(false)

    const [deleteCategory,] = useDeleteCategoryMutation();

    return(<>
        <section className="category-card">
            <div className="category-card__header">
                <div className="category-card__title">{category!.categoryName}</div>                
                <div className="category-card__buttons">
                    <button
                        className="button button__edit"
                        type="button"
                        onClick={()=> {
                            setEditFormToggle(!editFormToggle);
                            const parent = document.getElementsByClassName(`${category!._id}`);
                            console.log(parent[0]?.classList);

                            /* TODO 1: The following mess
                                I can select the element just fine. .focus() just doesn't work
                                no errors are given */

                            // const focusInput = parent[0]?.getElementsByClassName('edit-category__new-category')[0];
                            // 
                            // (focusInput as HTMLElement).focus();

                            const focusInput = parent[0].querySelector('button');
                            console.log(focusInput);
                            const active: HTMLElement = (document!.activeElement as HTMLElement);
                            active.blur();
                            try {
                                (focusInput as HTMLElement).focus()
                            } catch (e) {
                                console.log(e)
                            }
                            console.log(document.activeElement)
                            active.focus()
                            console.log(document.activeElement)

                            /* END TODO */
                        }}>
                            Edit
                        </button>
                    <button
                        className="button button__delete"
                        type="button"
                        onClick={() => {
                            deleteCategory({variables: {_id: category._id}, refetchQueries: [{query: CurrentUserAllDocument}]});
                        }}
                    >
                        Delete
                    </button>
                </div>
                <EditCategoryForm className={`display-${editFormToggle}`} categoryName={category!.categoryName} categoryId={category!._id} formToggle={setEditFormToggle}/>
            </div>
            <ul className="category-card__body">
                {category!.items!.map((item) => {
                    return(
                            <ItemCard
                                key={item._id}
                                item={item}
                            />
                    )
                })}
            </ul>
                <AddItemForm className="button button__add button--solo add-item" categoryId={category._id} />
        </section>
    </>);
};