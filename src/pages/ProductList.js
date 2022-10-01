import { useState, useEffect } from 'react';
import { useFetch } from './../commons/useFetch';
import { Link } from "react-router-dom";
import ProductSingle from './ProductSingle';

const routes = [
  {
    path: "/produit/{id}",
    component: ProductSingle
  }
];

function ProductList () {
	const [search, setSearch] = useState('');
	const [url, setUrl] = useState('');
	const [productList, setProductList] = useState({});
	const [loadingState, setLoadingState] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const {data, loading, error, fetchData} = useFetch({
	    method: "GET",
	    url: search ? 'https://world.openfoodfacts.org/cgi/search.pl?search_terms=${searchTerm}&search_simple=1&action=process&fields=id%2Cproduct_name%2Cimage_front_small_url&json=1&page=1&page_size=24'.replace('${searchTerm}', search) : ''
	});

	useEffect(() => {
		if (data && data.products) {
			setProductList(data);
		} else {
			setProductList({});
		}
	}, [data]);

	useEffect(() => {
		if (error) {
			setErrorMessage('Erreur de chargement de vos produits, veuillez réessayer plus tard : ' + error);
		} else {
			setErrorMessage('');			
		}
	}, [error]);

	useEffect(() => {
		setLoadingState(loading);
	}, [loading]);

	const handleSubmit = (event) => {
		event.preventDefault();
    	fetchData();		
	}

	return (
		<>
				<main>
				<form onSubmit={handleSubmit}>
					<input type="text"
	          			onChange={(e) => setSearch(e.target.value)}/>
		    		<input type="submit" value="Submit" disabled={search === ''} />
	    		</form>
	    		{errorMessage !== '' && 
	    			<span>{errorMessage}</span>
	    		}
	    		{loadingState && 
	    			<span>chargement en cours...</span>
	    		}
	    		{productList && productList.count > 0  &&
					<div className="ProductList"> 
						{productList.products.map((product, index) => 
	           				<Link className="ProductList__item"
	           					  key={index}
	           				      to={"/produit/" + product.id}>
	           					<img src={product.image_front_small_url}
	           						 alt={product.product_name} />
	           					<div>{product.product_name}</div>
	           				</Link>						
						)}
					</div>
	    		}
    		</main>
		</>
	);
}

export default ProductList;