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

function Home () {
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
			<section className="Home">
				<h1 className="Home__title">Rechercher un produit</h1>
				<div className="Home__form Form">
					<form className="Form__form" 
						  onSubmit={handleSubmit}>
						<input className="Form__input"
							   type="text"
		          			   onChange={(e) => setSearch(e.target.value)}/>
			    		<input className="Form__submit"
			    			   type="submit" 
			    			   value="valider" 
			    			   disabled={search === ''} />
		    		</form>
		    		{loadingState && 
		    			<span className="Form__message" >chargement en cours...</span>
		    		}
		    		{errorMessage !== '' && 
		    			<span className="Form__message">{errorMessage}</span>
		    		}
	    		</div>
	    		{productList && productList.count > 0  &&
					<div className="ProductList"> 
						{productList.products.map((product, index) => 
	           				<Link className="ProductList__item"
	           					  key={index}
	           				      to={"/produit/" + product.id}>
	           					<span className="ProductList__itemLabel">{product.product_name}</span>
	           					<div className="ProductList__itemContainer">
		           					<img className="ProductList__itemImage" 
		           						 src={product.image_front_small_url}
		           						 alt={product.product_name} />
           						</div>
	           				</Link>						
						)}					
					</div>
	    		}
	    		{!loadingState && productList && productList.count === 0 &&
	    			<span className="Form__message">Aucun résultat</span>	
	    		}
    		</section>
		</>
	);
}

export default Home;