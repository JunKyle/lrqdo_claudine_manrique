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
			<main>
				<div className="ProductSingle">
					<h1 className="ProductSingle__title">{productItem.product_name}</h1>
					<img className="ProductSingle__image"
						 src={productItem.image_front_url}
						 alt={productItem.product_name} />
	    		{productItem && productItem.categories &&
					<>
						<h2 className="ProductSingle__subtitle">Catégories</h2>
						<div className="ProductSingle__paragraph">{productItem.categories}</div>
					</>
				}
				{productItem && productItem.allergens_hierarchy &&
					<>
						<h2 className="ProductSingle__subtitle">Liste des allergènes</h2>
						<div className="ProductSingle__paragraph">{productItem.allergens_hierarchy}</div>
					</>
				}
				{productItem && productItem.ingredients_text && 
					<>
						<h2 className="ProductSingle__subtitle">Ingrédients</h2>
						<div className="ProductSingle__paragraph">{productItem.ingredients_text}</div>
					</>
				}
				</div>
			</main>
		</>
	);
}

export default ProductSingle;
