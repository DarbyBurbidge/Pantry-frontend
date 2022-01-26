import React from 'react';
import { AddItemForm } from '../AddItemForm/AddItemForm';
import { ItemCard } from '../ItemCard/ItemCard';

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
    return(<>
        <li className="category-card">
            <div className="category-card__header">
                <div className="category-card__title">{category!.categoryName}</div>
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
        </li>
    </>);
};