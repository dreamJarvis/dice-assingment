/** @format */

import { useState } from "react";
import "./App.css";
import { GITHUB_REPO_SEARCH_URL, LIMIT_PER_PAGE } from "./utils/constants";
import ItemList from "./components/ItemList";

/* 
	TODO: implement aria-tags after project is done
	TODO: add Pagination
	TODO: add useDebouncing
	TODO: add throttling for fetching next page info
*/

// q=tetris+language:assembly&sort=stars&order=desc
function App() {
	const [query, setQuery] = useState();
	const [pageNumber, setPageNumber] = useState(1);
	const [queryData, setQueryData] = useState("");
	const [loading, setLoading] = useState(true);
	const [totalPages, setTotalPages] = useState(0);

	const queryHandler = () => {
		fetch(
			GITHUB_REPO_SEARCH_URL +
				`${query}&per_page=${LIMIT_PER_PAGE}&page=${pageNumber}`
		)
			.then((response) => response.json())
			.then((data) => {
				console.log("data : ", data);
				console.log("data : ", data?.total_count);
				setTotalPages(Math.floor(data?.total_count / LIMIT_PER_PAGE));
				setQueryData(data?.items);
				setLoading(false);
			});
	};

	/* 
		TODO: fluid pagination
	*/
	// const totalNavBtns = () => {
	// 	const list = [];
	// 	for (let i = 1; i <= totalItemCount; i++) {
	// 		list.push(
	// 			<button className='nav-item' onClick={() => setPageNumber(i)}>
	// 				{i}
	// 			</button>
	// 		);
	// 	}
	// 	return list;
	// };

	return (
		<div className='App'>
			<div className='query'>
				<input
					type='text'
					value={query}
					onChange={(e) => setQuery(e.target.value)}
				/>
				<button onClick={queryHandler}>search</button>
			</div>
			{queryData.length > 1 ? (
				<div className='container'>
					<div className='btn prev-page'>
						<button
							className='prev-page-btn'
							onClick={() => setPageNumber(Math.max(pageNumber - 1, 1))}>
							{"<"}
						</button>
					</div>
					<div className='query-items'>
						<div className='query-item-list'>
							{queryData && queryData.length && loading ? (
								<span>Loading...</span>
							) : (
								<ItemList
									repo_list={queryData}
									queryHandler={queryHandler}
									pageNumber={pageNumber}
								/>
							)}
						</div>
						<span className='query-item_page'>Page : {pageNumber}</span>
					</div>

					<div className='btn next-page'>
						<button
							className='next-page-btn'
							onClick={() =>
								setPageNumber(Math.min(pageNumber + 1, totalPages))
							}>
							{">"}
						</button>
					</div>
				</div>
			) : (
				<span>no input...</span>
			)}

			{/* 
				shows the list of repo
			*/}
		</div>
	);
}

export default App;
// https://api.github.com/search/repositories?q=Q&per_page=10&page=3
// q=tetris+language:assembly&sort=stars&order=desc
