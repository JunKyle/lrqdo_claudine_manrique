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
			<section className="ProductSingle">
				<h1 className="ProductSingle__title">{productItem.product_name}</h1>
				<div className="ProductSingle__container">
					<div className="ProductSingle__wrapper">
		    		{productItem && productItem.categories &&
						<>
							<h2 className="ProductSingle__subtitle">Catégories</h2>
							<p>{productItem.categories}</p>
						</>
					}
					{productItem && productItem.allergens_hierarchy && productItem.allergens_hierarchy.length > 0 &&
						<>
							<h2 className="ProductSingle__subtitle">Liste des allergènes</h2>
							<ul>
							{productItem.allergens_hierarchy.map((allergen, index) => 
		           				<li key={index}>{allergen}</li>	
							)}
							</ul>
						</>
					}
					{productItem && productItem.ingredients_text && 
						<>
							<h2 className="ProductSingle__subtitle">Ingrédients</h2>
							<p>{productItem.ingredients_text}</p>
						</>
					}
					</div>
					<img className="ProductSingle__image"
						 src={productItem.image_front_url}
						 alt={productItem.product_name} />
				</div>
			</section>
		</>
	);
}

export default ProductSingle;
