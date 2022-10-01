import ProductList from './pages/ProductList';
import ProductSingle from './pages/ProductSingle';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

const routes = [
  {
    path: "/",
    component: ProductList
  },
  {
    path: "/produit/{id}",
    component: ProductSingle
  }
];

function App() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Rechercher un produit</Link>
          </li>
        </ul>

        <hr />
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path={"/produit/:id"} element={<ProductSingle />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
