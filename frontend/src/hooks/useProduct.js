import { useEffect, useState } from "react";
import { getProductById } from "../api/api";

export function useProduct(id) {
    const [product, setProduct] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if(!id) return;
        getProductById(id).then(data => {
            setProduct(data)
            setLoading(false)
        })
    }, [id])
    return { product, loading }
}