import React, { useState, useEffect } from "react";
import categories, { getMovies } from "../api";
import "./Banner.css";

function Banner() {
	const [movie, setmovie] = useState({});

	const fetchRandomMovie = async (_path) => {
		try {
			const netflixOriginalsCategory = categories.find(
				(category) => category.name === "netflixOriginals"
			);
			const data = await getMovies(netflixOriginalsCategory.path);

			const movies = data?.results;

			const randomIndex = Math.floor(Math.random() * movies.length);

			setmovie(movies[randomIndex]);
		} catch (error) {
			console.log("Banner fetchRnadom Movvie Error: ", error);
		}
	};

	useEffect(() => {
		fetchRandomMovie();
	}, []);

	function truncate(str, n) {
		return str?.length > n ? str.substring(0, n - 1) + "..." : str;
	}

	return (
		<header
			className="banner-container"
			style={{
				backgroundSize: "cover",
				backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
				backgroundPosition: "center-center",
			}}
		>
			<div className="banner-content">
				<h1 className="banner-title">
					{" "}
					{movie?.title || movie?.name || movie?.original_name}
				</h1>

				<div className="banner-button-container">
					<div className="banner-button">Assistir</div>
					<div className="banner-button">Minha lista</div>
				</div>
				<div className="banner-description">
					<h1> {truncate(movie?.overview, 121)} </h1>
				</div>
			</div>
		</header>
	);
}

export default Banner;
