import { useState, useEffect } from "react";
import "./App.css";
import Cards from "./components/Cards/Cards";
import Header from "./components/Header/Header";
import Discount from "./components/Discount/Discount";
import supabase from "./providers/client.js";

function App() {
	const [shoes, setShoes] = useState([]);

	useEffect(() => {
		const request = async () => {
			const { data, error } = await supabase.from("shoe").select("*");
			console.log(data);
			setShoes(data);
		};
		request();
	}, []);
	return (
		<div className="App">
			<Header></Header>
			<Discount></Discount>
			<div className="container">
				<h2>Search results</h2>
				<section className="section-Cards">
					{shoes.map((shoe) => (
						<Cards
							key={shoe.id}
							brand={shoe.brand}
							name={shoe.name}
							price={shoe.price}
							currency={shoe.currency}
							shoeImg={shoe.image}
							shoeId={shoe.id}
						></Cards>
					))}
				</section>
			</div>
		</div>
	);
}

export default App;
