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
  userName: Scalars['String'];
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

export type CurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentUserQuery = { __typename?: 'Query', currentUser?: { __typename?: 'User', _id: string, email: string } | null | undefined };

export type CurrentUserAllQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentUserAllQuery = { __typename?: 'Query', currentUser?: { __typename?: 'User', _id: string, email: string, tokenVersion: number, categories: Array<{ __typename?: 'Category', _id: string, categoryName: string, items?: Array<{ __typename?: 'Item', _id: string, itemName: string, expiration: string }> | null | undefined }> } | null | undefined };

export type HelloQueryVariables = Exact<{ [key: string]: never; }>;


export type HelloQuery = { __typename?: 'Query', hello: string };

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginResponse', accessToken: string, user: { __typename?: 'User', _id: string, email: string } } };


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