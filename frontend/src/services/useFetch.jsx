import { useEffect, useState } from 'react';

export function useFetch(url, options){
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch(url, options)
            .then(response => response.json())
            .then(response => setData(response))
            .catch(err => console.error(err));
    },[]);
    return {data};
}