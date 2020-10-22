import {useEffect, useState, useRef} from 'react'

export const useFetch = (url) => {

    const [state, setState] = useState({data: null, loading: true, error: null})
    const isMounted = useRef(true)

    /* Cuando se desmonta el componente no se llama la funcion*/
    useEffect(() => {
        return () => {
            isMounted.current = false
        }
    }, [])

    useEffect(() => {

        setState({data: null, loading: true, error: null})

        fetch(url)
        .then(response => response.json())
        .then(data => {
            /* Evita que se carge información si el componente no está montado */
            if (isMounted.current) {
                setState({
                    loading: false,
                    data, // Es igual a data:data
                    error: null
                })
            } else {
                console.log('setState no se alcanzó a llamar')
            }
        }).catch(()=> {
            setState({
                data: null,
                loading: false,
                error: 'No se pudo cargar la informacion'
            })
        })

    }, [url])

    return state

}
