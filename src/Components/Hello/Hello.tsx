import React from 'react';
import { useHelloQuery } from '../../generated/graphql';

export const Hello: React.FC = () => {
    const {data} = useHelloQuery();
    if (data) {
    return(<>
        {data.hello}
    </>);
    }
    return(
        <>
        loading...
        </>
    )
};
