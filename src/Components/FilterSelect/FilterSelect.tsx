import React, { useState } from 'react';

interface FilterSelectProps {
    tags: string[];
    filter: string;
    setFilter: Function;
}

export const capitalize = (str: String) => {
    const capitalized = str.charAt(0).toUpperCase() + str.slice(1);
    return capitalized
}

export const FilterSelect: React.FC<FilterSelectProps> = ({tags, filter, setFilter}) => {   
    //const [filter, setFilter] = useState("");

    return(<>
        <div className="filter">
            <label className="filter__filter">Search: <input className="filter__filter__input" value={filter} onChange={(e) => {setFilter(e.target.value)}}/></label>
            <div className="filter__tag-container"><h2 className="filter__tag-container__label">Tags:</h2>
                <span className="filter__tag-container__tag button button__edit" onClick={() => {setFilter("")}}>All Items</span>
                {tags.sort().map((tag) => {
                    return(<span className="filter__tag-container__tag button button__edit" onClick={() => {setFilter(tag)}}>{capitalize(tag)}</span>)
                })}
            </div>
        </div>
    </>);
};