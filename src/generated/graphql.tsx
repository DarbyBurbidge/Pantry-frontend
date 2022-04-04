import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Item = {
  __typename?: 'Item';
  _id: Scalars['ID'];
  expiration: Scalars['String'];
  favorite: Scalars['Boolean'];
  itemName: Scalars['String'];
  quantity: Scalars['Float'];
  tags: Array<Scalars['String']>;
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  accessToken: Scalars['String'];
  user: User;
};

export type Mutation = {
  __typename?: 'Mutation';
  addItem: ReturnObject;
  addShoppingList: ReturnObject;
  deleteItem: ReturnObject;
  deleteShoppingList: ReturnObject;
  editItem: ReturnObject;
  editUser: ReturnObject;
  login: LoginResponse;
  logout: ReturnObject;
  migrateList: ReturnObject;
  register: ReturnObject;
  registerAndLogin: LoginResponse;
  toggleFavorite: ReturnObject;
};


export type MutationAddItemArgs = {
  expiration: Scalars['String'];
  itemName: Scalars['String'];
  parentType: Scalars['String'];
  quantity: Scalars['Float'];
  tags: Array<Scalars['String']>;
};


export type MutationDeleteItemArgs = {
  id: Scalars['String'];
  parentType: Scalars['String'];
};


export type MutationEditItemArgs = {
  expiration: Scalars['String'];
  id: Scalars['String'];
  itemName: Scalars['String'];
  quantity: Scalars['Float'];
};


export type MutationEditUserArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationMigrateListArgs = {
  itemIds: Array<Scalars['String']>;
};


export type MutationRegisterArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationRegisterAndLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationToggleFavoriteArgs = {
  id: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  bye: Scalars['String'];
  currentUser?: Maybe<User>;
  getItems?: Maybe<Array<Item>>;
  getShoppingList?: Maybe<ShoppingList>;
  hello: Scalars['String'];
};

export type ReturnObject = {
  __typename?: 'ReturnObject';
  message: Scalars['String'];
  return: Scalars['Boolean'];
};

export type ShoppingList = {
  __typename?: 'ShoppingList';
  _id: Scalars['ID'];
  itemIds: Array<Scalars['String']>;
  items?: Maybe<Array<Item>>;
};

export type User = {
  __typename?: 'User';
  _id: Scalars['ID'];
  email: Scalars['String'];
  itemIds: Array<Scalars['String']>;
  items?: Maybe<Array<Item>>;
  shoppingList?: Maybe<ShoppingList>;
  tokenVersion: Scalars['Float'];
};

export type AddItemMutationVariables = Exact<{
  itemName: Scalars['String'];
  quantity: Scalars['Float'];
  expiration: Scalars['String'];
  tags: Array<Scalars['String']> | Scalars['String'];
  parentType: Scalars['String'];
}>;


export type AddItemMutation = { __typename?: 'Mutation', addItem: { __typename?: 'ReturnObject', message: string, return: boolean } };

export type DeleteItemMutationVariables = Exact<{
  id: Scalars['String'];
  parentType: Scalars['String'];
}>;


export type DeleteItemMutation = { __typename?: 'Mutation', deleteItem: { __typename?: 'ReturnObject', message: string, return: boolean } };

export type EditItemMutationVariables = Exact<{
  id: Scalars['String'];
  itemName: Scalars['String'];
  expiration: Scalars['String'];
  quantity: Scalars['Float'];
}>;


export type EditItemMutation = { __typename?: 'Mutation', editItem: { __typename?: 'ReturnObject', message: string, return: boolean } };

export type ToggleFavoriteMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type ToggleFavoriteMutation = { __typename?: 'Mutation', toggleFavorite: { __typename?: 'ReturnObject', message: string, return: boolean } };

export type AddShoppingListMutationVariables = Exact<{ [key: string]: never; }>;


export type AddShoppingListMutation = { __typename?: 'Mutation', addShoppingList: { __typename?: 'ReturnObject', message: string } };

export type DeleteShoppingListMutationVariables = Exact<{ [key: string]: never; }>;


export type DeleteShoppingListMutation = { __typename?: 'Mutation', deleteShoppingList: { __typename?: 'ReturnObject', message: string } };

export type GetShoppingListQueryVariables = Exact<{ [key: string]: never; }>;


export type GetShoppingListQuery = { __typename?: 'Query', getShoppingList?: { __typename?: 'ShoppingList', items?: Array<{ __typename?: 'Item', _id: string, itemName: string, quantity: number, expiration: string, tags: Array<string>, favorite: boolean }> | null | undefined } | null | undefined };

export type MigrateListMutationVariables = Exact<{
  itemIds: Array<Scalars['String']> | Scalars['String'];
}>;


export type MigrateListMutation = { __typename?: 'Mutation', migrateList: { __typename?: 'ReturnObject', message: string } };

export type CurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentUserQuery = { __typename?: 'Query', currentUser?: { __typename?: 'User', _id: string, email: string } | null | undefined };

export type CurrentUserAllQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentUserAllQuery = { __typename?: 'Query', currentUser?: { __typename?: 'User', _id: string, email: string, tokenVersion: number, items?: Array<{ __typename?: 'Item', _id: string, itemName: string, quantity: number, expiration: string, tags: Array<string>, favorite: boolean }> | null | undefined, shoppingList?: { __typename?: 'ShoppingList', _id: string, items?: Array<{ __typename?: 'Item', _id: string, itemName: string, quantity: number, expiration: string, tags: Array<string>, favorite: boolean }> | null | undefined } | null | undefined } | null | undefined };

export type EditUserMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type EditUserMutation = { __typename?: 'Mutation', editUser: { __typename?: 'ReturnObject', message: string, return: boolean } };

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginResponse', accessToken: string, user: { __typename?: 'User', _id: string, email: string } } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: { __typename?: 'ReturnObject', message: string, return: boolean } };

export type RegisterMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'ReturnObject', message: string, return: boolean } };

export type RegisterAndLoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type RegisterAndLoginMutation = { __typename?: 'Mutation', registerAndLogin: { __typename?: 'LoginResponse', accessToken: string, user: { __typename?: 'User', _id: string, email: string } } };

export type HelloQueryVariables = Exact<{ [key: string]: never; }>;


export type HelloQuery = { __typename?: 'Query', hello: string };


export const AddItemDocument = gql`
    mutation addItem($itemName: String!, $quantity: Float!, $expiration: String!, $tags: [String!]!, $parentType: String!) {
  addItem(
    itemName: $itemName
    quantity: $quantity
    expiration: $expiration
    tags: $tags
    parentType: $parentType
  ) {
    message
    return
  }
}
    `;
export type AddItemMutationFn = Apollo.MutationFunction<AddItemMutation, AddItemMutationVariables>;

/**
 * __useAddItemMutation__
 *
 * To run a mutation, you first call `useAddItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addItemMutation, { data, loading, error }] = useAddItemMutation({
 *   variables: {
 *      itemName: // value for 'itemName'
 *      quantity: // value for 'quantity'
 *      expiration: // value for 'expiration'
 *      tags: // value for 'tags'
 *      parentType: // value for 'parentType'
 *   },
 * });
 */
export function useAddItemMutation(baseOptions?: Apollo.MutationHookOptions<AddItemMutation, AddItemMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddItemMutation, AddItemMutationVariables>(AddItemDocument, options);
      }
export type AddItemMutationHookResult = ReturnType<typeof useAddItemMutation>;
export type AddItemMutationResult = Apollo.MutationResult<AddItemMutation>;
export type AddItemMutationOptions = Apollo.BaseMutationOptions<AddItemMutation, AddItemMutationVariables>;
export const DeleteItemDocument = gql`
    mutation deleteItem($id: String!, $parentType: String!) {
  deleteItem(id: $id, parentType: $parentType) {
    message
    return
  }
}
    `;
export type DeleteItemMutationFn = Apollo.MutationFunction<DeleteItemMutation, DeleteItemMutationVariables>;

/**
 * __useDeleteItemMutation__
 *
 * To run a mutation, you first call `useDeleteItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteItemMutation, { data, loading, error }] = useDeleteItemMutation({
 *   variables: {
 *      id: // value for 'id'
 *      parentType: // value for 'parentType'
 *   },
 * });
 */
export function useDeleteItemMutation(baseOptions?: Apollo.MutationHookOptions<DeleteItemMutation, DeleteItemMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteItemMutation, DeleteItemMutationVariables>(DeleteItemDocument, options);
      }
export type DeleteItemMutationHookResult = ReturnType<typeof useDeleteItemMutation>;
export type DeleteItemMutationResult = Apollo.MutationResult<DeleteItemMutation>;
export type DeleteItemMutationOptions = Apollo.BaseMutationOptions<DeleteItemMutation, DeleteItemMutationVariables>;
export const EditItemDocument = gql`
    mutation editItem($id: String!, $itemName: String!, $expiration: String!, $quantity: Float!) {
  editItem(
    id: $id
    itemName: $itemName
    expiration: $expiration
    quantity: $quantity
  ) {
    message
    return
  }
}
    `;
export type EditItemMutationFn = Apollo.MutationFunction<EditItemMutation, EditItemMutationVariables>;

/**
 * __useEditItemMutation__
 *
 * To run a mutation, you first call `useEditItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editItemMutation, { data, loading, error }] = useEditItemMutation({
 *   variables: {
 *      id: // value for 'id'
 *      itemName: // value for 'itemName'
 *      expiration: // value for 'expiration'
 *      quantity: // value for 'quantity'
 *   },
 * });
 */
export function useEditItemMutation(baseOptions?: Apollo.MutationHookOptions<EditItemMutation, EditItemMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditItemMutation, EditItemMutationVariables>(EditItemDocument, options);
      }
export type EditItemMutationHookResult = ReturnType<typeof useEditItemMutation>;
export type EditItemMutationResult = Apollo.MutationResult<EditItemMutation>;
export type EditItemMutationOptions = Apollo.BaseMutationOptions<EditItemMutation, EditItemMutationVariables>;
export const ToggleFavoriteDocument = gql`
    mutation ToggleFavorite($id: String!) {
  toggleFavorite(id: $id) {
    message
    return
  }
}
    `;
export type ToggleFavoriteMutationFn = Apollo.MutationFunction<ToggleFavoriteMutation, ToggleFavoriteMutationVariables>;

/**
 * __useToggleFavoriteMutation__
 *
 * To run a mutation, you first call `useToggleFavoriteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useToggleFavoriteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [toggleFavoriteMutation, { data, loading, error }] = useToggleFavoriteMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useToggleFavoriteMutation(baseOptions?: Apollo.MutationHookOptions<ToggleFavoriteMutation, ToggleFavoriteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ToggleFavoriteMutation, ToggleFavoriteMutationVariables>(ToggleFavoriteDocument, options);
      }
export type ToggleFavoriteMutationHookResult = ReturnType<typeof useToggleFavoriteMutation>;
export type ToggleFavoriteMutationResult = Apollo.MutationResult<ToggleFavoriteMutation>;
export type ToggleFavoriteMutationOptions = Apollo.BaseMutationOptions<ToggleFavoriteMutation, ToggleFavoriteMutationVariables>;
export const AddShoppingListDocument = gql`
    mutation addShoppingList {
  addShoppingList {
    message
  }
}
    `;
export type AddShoppingListMutationFn = Apollo.MutationFunction<AddShoppingListMutation, AddShoppingListMutationVariables>;

/**
 * __useAddShoppingListMutation__
 *
 * To run a mutation, you first call `useAddShoppingListMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddShoppingListMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addShoppingListMutation, { data, loading, error }] = useAddShoppingListMutation({
 *   variables: {
 *   },
 * });
 */
export function useAddShoppingListMutation(baseOptions?: Apollo.MutationHookOptions<AddShoppingListMutation, AddShoppingListMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddShoppingListMutation, AddShoppingListMutationVariables>(AddShoppingListDocument, options);
      }
export type AddShoppingListMutationHookResult = ReturnType<typeof useAddShoppingListMutation>;
export type AddShoppingListMutationResult = Apollo.MutationResult<AddShoppingListMutation>;
export type AddShoppingListMutationOptions = Apollo.BaseMutationOptions<AddShoppingListMutation, AddShoppingListMutationVariables>;
export const DeleteShoppingListDocument = gql`
    mutation deleteShoppingList {
  deleteShoppingList {
    message
  }
}
    `;
export type DeleteShoppingListMutationFn = Apollo.MutationFunction<DeleteShoppingListMutation, DeleteShoppingListMutationVariables>;

/**
 * __useDeleteShoppingListMutation__
 *
 * To run a mutation, you first call `useDeleteShoppingListMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteShoppingListMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteShoppingListMutation, { data, loading, error }] = useDeleteShoppingListMutation({
 *   variables: {
 *   },
 * });
 */
export function useDeleteShoppingListMutation(baseOptions?: Apollo.MutationHookOptions<DeleteShoppingListMutation, DeleteShoppingListMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteShoppingListMutation, DeleteShoppingListMutationVariables>(DeleteShoppingListDocument, options);
      }
export type DeleteShoppingListMutationHookResult = ReturnType<typeof useDeleteShoppingListMutation>;
export type DeleteShoppingListMutationResult = Apollo.MutationResult<DeleteShoppingListMutation>;
export type DeleteShoppingListMutationOptions = Apollo.BaseMutationOptions<DeleteShoppingListMutation, DeleteShoppingListMutationVariables>;
export const GetShoppingListDocument = gql`
    query getShoppingList {
  getShoppingList {
    items {
      _id
      itemName
      quantity
      expiration
      tags
      favorite
    }
  }
}
    `;

/**
 * __useGetShoppingListQuery__
 *
 * To run a query within a React component, call `useGetShoppingListQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetShoppingListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetShoppingListQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetShoppingListQuery(baseOptions?: Apollo.QueryHookOptions<GetShoppingListQuery, GetShoppingListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetShoppingListQuery, GetShoppingListQueryVariables>(GetShoppingListDocument, options);
      }
export function useGetShoppingListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetShoppingListQuery, GetShoppingListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetShoppingListQuery, GetShoppingListQueryVariables>(GetShoppingListDocument, options);
        }
export type GetShoppingListQueryHookResult = ReturnType<typeof useGetShoppingListQuery>;
export type GetShoppingListLazyQueryHookResult = ReturnType<typeof useGetShoppingListLazyQuery>;
export type GetShoppingListQueryResult = Apollo.QueryResult<GetShoppingListQuery, GetShoppingListQueryVariables>;
export const MigrateListDocument = gql`
    mutation migrateList($itemIds: [String!]!) {
  migrateList(itemIds: $itemIds) {
    message
  }
}
    `;
export type MigrateListMutationFn = Apollo.MutationFunction<MigrateListMutation, MigrateListMutationVariables>;

/**
 * __useMigrateListMutation__
 *
 * To run a mutation, you first call `useMigrateListMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMigrateListMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [migrateListMutation, { data, loading, error }] = useMigrateListMutation({
 *   variables: {
 *      itemIds: // value for 'itemIds'
 *   },
 * });
 */
export function useMigrateListMutation(baseOptions?: Apollo.MutationHookOptions<MigrateListMutation, MigrateListMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MigrateListMutation, MigrateListMutationVariables>(MigrateListDocument, options);
      }
export type MigrateListMutationHookResult = ReturnType<typeof useMigrateListMutation>;
export type MigrateListMutationResult = Apollo.MutationResult<MigrateListMutation>;
export type MigrateListMutationOptions = Apollo.BaseMutationOptions<MigrateListMutation, MigrateListMutationVariables>;
export const CurrentUserDocument = gql`
    query CurrentUser {
  currentUser {
    _id
    email
  }
}
    `;

/**
 * __useCurrentUserQuery__
 *
 * To run a query within a React component, call `useCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCurrentUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useCurrentUserQuery(baseOptions?: Apollo.QueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, options);
      }
export function useCurrentUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, options);
        }
export type CurrentUserQueryHookResult = ReturnType<typeof useCurrentUserQuery>;
export type CurrentUserLazyQueryHookResult = ReturnType<typeof useCurrentUserLazyQuery>;
export type CurrentUserQueryResult = Apollo.QueryResult<CurrentUserQuery, CurrentUserQueryVariables>;
export const CurrentUserAllDocument = gql`
    query CurrentUserAll {
  currentUser {
    _id
    email
    tokenVersion
    items {
      _id
      itemName
      quantity
      expiration
      tags
      favorite
    }
    shoppingList {
      _id
      items {
        _id
        itemName
        quantity
        expiration
        tags
        favorite
      }
    }
  }
}
    `;

/**
 * __useCurrentUserAllQuery__
 *
 * To run a query within a React component, call `useCurrentUserAllQuery` and pass it any options that fit your needs.
 * When your component renders, `useCurrentUserAllQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCurrentUserAllQuery({
 *   variables: {
 *   },
 * });
 */
export function useCurrentUserAllQuery(baseOptions?: Apollo.QueryHookOptions<CurrentUserAllQuery, CurrentUserAllQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CurrentUserAllQuery, CurrentUserAllQueryVariables>(CurrentUserAllDocument, options);
      }
export function useCurrentUserAllLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CurrentUserAllQuery, CurrentUserAllQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CurrentUserAllQuery, CurrentUserAllQueryVariables>(CurrentUserAllDocument, options);
        }
export type CurrentUserAllQueryHookResult = ReturnType<typeof useCurrentUserAllQuery>;
export type CurrentUserAllLazyQueryHookResult = ReturnType<typeof useCurrentUserAllLazyQuery>;
export type CurrentUserAllQueryResult = Apollo.QueryResult<CurrentUserAllQuery, CurrentUserAllQueryVariables>;
export const EditUserDocument = gql`
    mutation EditUser($email: String!, $password: String!) {
  editUser(email: $email, password: $password) {
    message
    return
  }
}
    `;
export type EditUserMutationFn = Apollo.MutationFunction<EditUserMutation, EditUserMutationVariables>;

/**
 * __useEditUserMutation__
 *
 * To run a mutation, you first call `useEditUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editUserMutation, { data, loading, error }] = useEditUserMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useEditUserMutation(baseOptions?: Apollo.MutationHookOptions<EditUserMutation, EditUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditUserMutation, EditUserMutationVariables>(EditUserDocument, options);
      }
export type EditUserMutationHookResult = ReturnType<typeof useEditUserMutation>;
export type EditUserMutationResult = Apollo.MutationResult<EditUserMutation>;
export type EditUserMutationOptions = Apollo.BaseMutationOptions<EditUserMutation, EditUserMutationVariables>;
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    accessToken
    user {
      _id
      email
    }
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout {
    message
    return
  }
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($email: String!, $password: String!) {
  register(email: $email, password: $password) {
    message
    return
  }
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const RegisterAndLoginDocument = gql`
    mutation RegisterAndLogin($email: String!, $password: String!) {
  registerAndLogin(email: $email, password: $password) {
    accessToken
    user {
      _id
      email
    }
  }
}
    `;
export type RegisterAndLoginMutationFn = Apollo.MutationFunction<RegisterAndLoginMutation, RegisterAndLoginMutationVariables>;

/**
 * __useRegisterAndLoginMutation__
 *
 * To run a mutation, you first call `useRegisterAndLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterAndLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerAndLoginMutation, { data, loading, error }] = useRegisterAndLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useRegisterAndLoginMutation(baseOptions?: Apollo.MutationHookOptions<RegisterAndLoginMutation, RegisterAndLoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterAndLoginMutation, RegisterAndLoginMutationVariables>(RegisterAndLoginDocument, options);
      }
export type RegisterAndLoginMutationHookResult = ReturnType<typeof useRegisterAndLoginMutation>;
export type RegisterAndLoginMutationResult = Apollo.MutationResult<RegisterAndLoginMutation>;
export type RegisterAndLoginMutationOptions = Apollo.BaseMutationOptions<RegisterAndLoginMutation, RegisterAndLoginMutationVariables>;
export const HelloDocument = gql`
    query Hello {
  hello
}
    `;

/**
 * __useHelloQuery__
 *
 * To run a query within a React component, call `useHelloQuery` and pass it any options that fit your needs.
 * When your component renders, `useHelloQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHelloQuery({
 *   variables: {
 *   },
 * });
 */
export function useHelloQuery(baseOptions?: Apollo.QueryHookOptions<HelloQuery, HelloQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<HelloQuery, HelloQueryVariables>(HelloDocument, options);
      }
export function useHelloLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HelloQuery, HelloQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<HelloQuery, HelloQueryVariables>(HelloDocument, options);
        }
export type HelloQueryHookResult = ReturnType<typeof useHelloQuery>;
export type HelloLazyQueryHookResult = ReturnType<typeof useHelloLazyQuery>;
export type HelloQueryResult = Apollo.QueryResult<HelloQuery, HelloQueryVariables>;