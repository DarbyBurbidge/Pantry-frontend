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

export type Category = {
  __typename?: 'Category';
  _id: Scalars['ID'];
  categoryName: Scalars['String'];
  items?: Maybe<Array<Item>>;
  userId: Scalars['String'];
};

export type Item = {
  __typename?: 'Item';
  _id: Scalars['ID'];
  categoryId: Scalars['String'];
  expiration: Scalars['String'];
  itemName: Scalars['String'];
  userId: Scalars['String'];
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  accessToken: Scalars['String'];
  user: User;
};

export type Mutation = {
  __typename?: 'Mutation';
  addCategory: ReturnObject;
  addItem: ReturnObject;
  deleteCategory: ReturnObject;
  deleteItem: ReturnObject;
  editCategoryName: ReturnObject;
  editItem: ReturnObject;
  login: LoginResponse;
  logout: ReturnObject;
  register: ReturnObject;
};


export type MutationAddCategoryArgs = {
  categoryName: Scalars['String'];
};


export type MutationAddItemArgs = {
  categoryId: Scalars['String'];
  expiration: Scalars['String'];
  itemName: Scalars['String'];
};


export type MutationDeleteCategoryArgs = {
  _id: Scalars['String'];
};


export type MutationDeleteItemArgs = {
  _id: Scalars['String'];
};


export type MutationEditCategoryNameArgs = {
  _id: Scalars['String'];
  categoryName: Scalars['String'];
};


export type MutationEditItemArgs = {
  _id: Scalars['String'];
  expiration: Scalars['String'];
  itemName: Scalars['String'];
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationRegisterArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  bye: Scalars['String'];
  currentUser?: Maybe<User>;
  getCategories?: Maybe<Array<Category>>;
  getItems?: Maybe<Array<Item>>;
  hello: Scalars['String'];
};

export type ReturnObject = {
  __typename?: 'ReturnObject';
  message: Scalars['String'];
  return: Scalars['Boolean'];
};

export type User = {
  __typename?: 'User';
  _id: Scalars['ID'];
  categories: Array<Category>;
  email: Scalars['String'];
  tokenVersion: Scalars['Float'];
  userName: Scalars['String'];
};

export type AddCategoryMutationVariables = Exact<{
  categoryName: Scalars['String'];
}>;


export type AddCategoryMutation = { __typename?: 'Mutation', addCategory: { __typename?: 'ReturnObject', message: string, return: boolean } };

export type DeleteCategoryMutationVariables = Exact<{
  _id: Scalars['String'];
}>;


export type DeleteCategoryMutation = { __typename?: 'Mutation', deleteCategory: { __typename?: 'ReturnObject', message: string, return: boolean } };

export type EditCategoryNameMutationVariables = Exact<{
  _id: Scalars['String'];
  categoryName: Scalars['String'];
}>;


export type EditCategoryNameMutation = { __typename?: 'Mutation', editCategoryName: { __typename?: 'ReturnObject', message: string, return: boolean } };

export type AddItemMutationVariables = Exact<{
  itemName: Scalars['String'];
  categoryId: Scalars['String'];
  expiration: Scalars['String'];
}>;


export type AddItemMutation = { __typename?: 'Mutation', addItem: { __typename?: 'ReturnObject', message: string, return: boolean } };

export type DeleteItemMutationVariables = Exact<{
  _id: Scalars['String'];
}>;


export type DeleteItemMutation = { __typename?: 'Mutation', deleteItem: { __typename?: 'ReturnObject', message: string, return: boolean } };

export type EditItemMutationVariables = Exact<{
  _id: Scalars['String'];
  itemName: Scalars['String'];
  expiration: Scalars['String'];
}>;


export type EditItemMutation = { __typename?: 'Mutation', editItem: { __typename?: 'ReturnObject', message: string, return: boolean } };

export type CurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentUserQuery = { __typename?: 'Query', currentUser?: { __typename?: 'User', _id: string, email: string } | null | undefined };

export type CurrentUserAllQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentUserAllQuery = { __typename?: 'Query', currentUser?: { __typename?: 'User', _id: string, email: string, tokenVersion: number, categories: Array<{ __typename?: 'Category', _id: string, categoryName: string, items?: Array<{ __typename?: 'Item', _id: string, itemName: string, expiration: string }> | null | undefined }> } | null | undefined };

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

export type HelloQueryVariables = Exact<{ [key: string]: never; }>;


export type HelloQuery = { __typename?: 'Query', hello: string };


export const AddCategoryDocument = gql`
    mutation addCategory($categoryName: String!) {
  addCategory(categoryName: $categoryName) {
    message
    return
  }
}
    `;
export type AddCategoryMutationFn = Apollo.MutationFunction<AddCategoryMutation, AddCategoryMutationVariables>;

/**
 * __useAddCategoryMutation__
 *
 * To run a mutation, you first call `useAddCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addCategoryMutation, { data, loading, error }] = useAddCategoryMutation({
 *   variables: {
 *      categoryName: // value for 'categoryName'
 *   },
 * });
 */
export function useAddCategoryMutation(baseOptions?: Apollo.MutationHookOptions<AddCategoryMutation, AddCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddCategoryMutation, AddCategoryMutationVariables>(AddCategoryDocument, options);
      }
export type AddCategoryMutationHookResult = ReturnType<typeof useAddCategoryMutation>;
export type AddCategoryMutationResult = Apollo.MutationResult<AddCategoryMutation>;
export type AddCategoryMutationOptions = Apollo.BaseMutationOptions<AddCategoryMutation, AddCategoryMutationVariables>;
export const DeleteCategoryDocument = gql`
    mutation deleteCategory($_id: String!) {
  deleteCategory(_id: $_id) {
    message
    return
  }
}
    `;
export type DeleteCategoryMutationFn = Apollo.MutationFunction<DeleteCategoryMutation, DeleteCategoryMutationVariables>;

/**
 * __useDeleteCategoryMutation__
 *
 * To run a mutation, you first call `useDeleteCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCategoryMutation, { data, loading, error }] = useDeleteCategoryMutation({
 *   variables: {
 *      _id: // value for '_id'
 *   },
 * });
 */
export function useDeleteCategoryMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCategoryMutation, DeleteCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteCategoryMutation, DeleteCategoryMutationVariables>(DeleteCategoryDocument, options);
      }
export type DeleteCategoryMutationHookResult = ReturnType<typeof useDeleteCategoryMutation>;
export type DeleteCategoryMutationResult = Apollo.MutationResult<DeleteCategoryMutation>;
export type DeleteCategoryMutationOptions = Apollo.BaseMutationOptions<DeleteCategoryMutation, DeleteCategoryMutationVariables>;
export const EditCategoryNameDocument = gql`
    mutation editCategoryName($_id: String!, $categoryName: String!) {
  editCategoryName(_id: $_id, categoryName: $categoryName) {
    message
    return
  }
}
    `;
export type EditCategoryNameMutationFn = Apollo.MutationFunction<EditCategoryNameMutation, EditCategoryNameMutationVariables>;

/**
 * __useEditCategoryNameMutation__
 *
 * To run a mutation, you first call `useEditCategoryNameMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditCategoryNameMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editCategoryNameMutation, { data, loading, error }] = useEditCategoryNameMutation({
 *   variables: {
 *      _id: // value for '_id'
 *      categoryName: // value for 'categoryName'
 *   },
 * });
 */
export function useEditCategoryNameMutation(baseOptions?: Apollo.MutationHookOptions<EditCategoryNameMutation, EditCategoryNameMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditCategoryNameMutation, EditCategoryNameMutationVariables>(EditCategoryNameDocument, options);
      }
export type EditCategoryNameMutationHookResult = ReturnType<typeof useEditCategoryNameMutation>;
export type EditCategoryNameMutationResult = Apollo.MutationResult<EditCategoryNameMutation>;
export type EditCategoryNameMutationOptions = Apollo.BaseMutationOptions<EditCategoryNameMutation, EditCategoryNameMutationVariables>;
export const AddItemDocument = gql`
    mutation addItem($itemName: String!, $categoryId: String!, $expiration: String!) {
  addItem(itemName: $itemName, categoryId: $categoryId, expiration: $expiration) {
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
 *      categoryId: // value for 'categoryId'
 *      expiration: // value for 'expiration'
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
    mutation deleteItem($_id: String!) {
  deleteItem(_id: $_id) {
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
 *      _id: // value for '_id'
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
    mutation editItem($_id: String!, $itemName: String!, $expiration: String!) {
  editItem(_id: $_id, itemName: $itemName, expiration: $expiration) {
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
 *      _id: // value for '_id'
 *      itemName: // value for 'itemName'
 *      expiration: // value for 'expiration'
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
    query currentUserAll {
  currentUser {
    _id
    email
    tokenVersion
    categories {
      _id
      categoryName
      items {
        _id
        itemName
        expiration
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