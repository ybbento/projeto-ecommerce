import "./Cards.css";
import { useEffect, useState } from "react";
import supabase from "../../providers/client";
import Liked from "./Vector.png";
import unLiked from "./Vector1.png";
function Cards(props) {
	const { brand, name, price, currency, shoeImg, shoeId } = props;
	const [like, setLike] = useState(null);
	const [button, setButton] = useState(false);

	useEffect(() => {
		const response = async () => {
			const username = process.env.REACT_APP_USERNAME;
			const { data, error } = await supabase
				.from("liked_shoe")
				.select("*")
				.eq("user_name", username)
				.eq("shoe_id", shoeId);
			error ? alert(error) : data[0] ? setLike(data[0]) : setLike(null);
		};
		response();
	}, [button, shoeId]);

	const clickLike = async () => {
		const username = process.env.REACT_APP_USERNAME;
		const { data, error } = await supabase.from("liked_shoe").upsert({
			...(like?.id && { id: like.id }),
			shoe_id: shoeId,
			user_name: username,
			is_liked: like?.is_liked ? !like.is_liked : true,
		});
		error ? alert(error) : data[0] ? setLike(data[0]) : setLike(null);
		setButton(!button);
	};
	return (
		<div className="Cards">
			<div className="Cards-like">
				<button className="Cards-button" onClick={clickLike}>
					<img src={like && like.is_liked ? Liked : unLiked} alt="shoe" />
				</button>
			</div>
			<div className="Cards-image">
				<img src={shoeImg} alt="shoe"></img>
			</div>
			<div className="Cards-textbox">
				<h2 className="Cards-text Cards-title">{brand}</h2>
				<p className="Cards-text">{name}</p>
				<div className="Cards-price">
					<p className="Cards-text Cards-currency">{currency}</p>
					<p className="Cards-text Cards-value">{price}</p>
				</div>
			</div>
		</div>
	);
}

export default Cards;
