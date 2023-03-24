import React, { useState } from 'react';
import { Oval } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import { CurrentUserAllDocument, Item, useAddShoppingListMutation, useCurrentUserAllQuery } from '../../generated/graphql';
import { AddItemForm } from '../AddItemForm/AddItemForm';
import { FilterSelect } from '../FilterSelect/FilterSelect';
import { ItemCard } from '../ItemCard/ItemCard';
import { Register } from '../Register/Register';
import { fetchAccessToken } from '../../utils/accessToken';

const getTags = (items: Array<Item> | null | undefined) => {
    let allTags: string[] | undefined = [];
    allTags = items?.reduce((tags, item) => {
        return tags.concat(item.tags)
    }, allTags)
    const cleanTags = [...new Set(allTags)]
    return cleanTags
}


const Home: React.FC = () => {
    const [search, setSearch] = useState("")
    const navigate = useNavigate();
    const { data, loading, error } = useCurrentUserAllQuery();
    const [addShoppingList, ] = useAddShoppingListMutation();


    let body = null    
    if (error) {
        console.error(error)
        body = <div className="body">An Error Occurred</div>
    } else if (loading) {
        body = <div className="body"><Oval color="#222222" secondaryColor="#AAAAAA" height={200} width={200} /></div>
    } else if (!data?.currentUser) {
        console.error('Cannot access current User: No User')
        window.location.href = '/';
    } else {
        const items = data.currentUser!.items
        body = <div className="body">
            {data.currentUser.email.includes('guest') ? (
                <div className="guest-banner">
                    <p className="guest-banner__message">
                        The account you are using is a temporary guest account.<br/>
                        If you would like to keep your Pantry, please sign up as a registered user:
                    </p>
                    <Register parent="guest-banner" modifier="right" migrate/>
                </div>
            ) : null}
            <FilterSelect tags={getTags(items)} filter={search} setFilter={setSearch}/>
            <ul className="card-list">
                {
                items?.filter((item) => {
                    if (search === "" || search === undefined) {
                        return (
                            true
                        )
                    }
                    if (search && (
                            // If itemName contains the search
                            item.itemName.toLowerCase().includes(search.toLowerCase()) 
                        || 
                            // Or if any of the tags include the search (reducing it to a boolean 'if any')
                            item.tags.reduce((prev: boolean, tag) => {
                                if (prev) {
                                    return true
                                }
                                return tag.toLowerCase().includes(search.toLowerCase())
                            }
                            , false))) {
                        return (
                            true
                        )
                    }
                    return false
                }).map((item) => {
                    return (
                        <ItemCard key={item._id} item={item} parentType="user"/>
                    )
                })}
            </ul>
            <AddItemForm className="button button__add" parentType="user" parentId={data.currentUser._id}/>
            {data?.currentUser?.shoppingList ? (
                <button type="button" className="button button__add" onClick={() => {navigate('/shopping-list')}}>Shopping List</button>
            ) : (
                 <button className="button button__add" type="button" onClick={async () => {
                        const favorites = data?.currentUser?.items?.filter((item) => {
                            return item.favorite
                        });
                        const ids = favorites?.map((item) => { return item._id })
                        await addShoppingList({ variables: { itemIds: ids ? ids : []}, refetchQueries: [{query: CurrentUserAllDocument}]});
                        fetchAccessToken();
                        navigate("/shopping-list");
                    }}>Create Shopping List</button>
            )}
        </div>
        
    }

    return(<>
        {body}
    </>);
};

export { Home as default };