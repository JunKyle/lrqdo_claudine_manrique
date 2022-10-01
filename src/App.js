import Home from './pages/Home';
import ProductSingle from './pages/ProductSingle';
import './App.scss';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from "react-router-dom";

const routes = [
{
    path: "/",
    component: Home
},
{
    path: "/produit/{id}",
    component: ProductSingle
}
];

function App() {
  return (
    <Router>
        <nav className="Nav">
            <Link className="Nav__link"
                  to="/">Home</Link>
        </nav>
        <main className="App">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path={"/produit/:id"} element={<ProductSingle />} />
            </Routes>
        </main>
    </Router>
    );
}

export default App;
