import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useFetch } from './../commons/useFetch';

function ProductSingle (props) {
  	const { id } = useParams();
	const [productItem, setProductItem] = useState({});
	const {data, loading, error, fetchData} = useFetch({
		method: "GET",
		url: 'https://world.openfoodfacts.org/api/v0/product/${code}.json?fields=product_name%2Ccategories%2Cimage_front_url%2Callergens_hierarchy%2Cingredients_text'.replace('${code}', id)	    
	});

	useEffect(() => {
		if (data && data.product) {
			setProductItem(data.product);
		} else {
			setProductItem({});
		}
	}, [data]);

	return (
		<>
			<div>Produit code : {id}</div>
			<div>{productItem.product_name}</div>
		</>
	);
}

export default ProductSingle;
