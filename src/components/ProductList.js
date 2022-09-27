import { useState } from "react";
import ProductSingle from './ProductSingle';

function ProductList () {
	const [search, setSearch] = useState('');
	const [productList, setProductList] = useState([]);

	const handleSubmit = (event) => {
    	event.preventDefault();
		console.log("update la liste");
	}

	return (
		<>
			<form onSubmit={handleSubmit}>
				<input type="text"
					value={search} 
          			onChange={(e) => setSearch(e.target.value)}/>
	    		<input type="submit" value="Submit" />
    		</form>
    		{productList.length > 0 &&
			<div> 
				{productList.map((product) => 
					<ProductSingle key={product.id} product={product} />
				)}
			</div>
    		}
		</>
	);
}

export default ProductList;