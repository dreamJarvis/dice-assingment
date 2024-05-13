/** @format */

import { useEffect, useState } from "react";
import "./App.css";
import { GITHUB_REPO_SEARCH_URL, LIMIT_PER_PAGE } from "./utils/constants";
import ItemList from "./components/ItemList";
import useFetch from "./hooks/useFetch";
import useDebounce from "./hooks/useDebounce";
import Repository from "./components/Repository";

/* 
	TODO: implement aria-tags after project is done
	TODO: add Pagination
	TODO: add useDebouncing
	TODO: add throttling for fetching next page info
*/

// q=tetris+language:assembly&sort=stars&order=desc
function App() {
	const [query, setQuery] = useState("");
	const [pageNumber, setPageNumber] = useState(1);
	const [queryData, setQueryData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [totalPages, setTotalPages] = useState(0);
	// const fetchRepo = useFetch();

	// TODO: debounding on query

	const queryFetchHandler = (query, pageNumber) => {
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

	const debounceQuery = useDebounce(queryFetchHandler, setLoading);

	const queryInputHandler = (value) => {
		setQuery(value);
		setPageNumber(1);
		debounceQuery(value, 1);
	};

	useEffect(() => {
		debounceQuery(query, pageNumber);
	}, [pageNumber]);

	return (
		<div className='App'>
			<div className='query'>
				<input
					type='text'
					value={query}
					onChange={(e) => queryInputHandler(e.target.value)}
				/>
			</div>

			<Repository
				queryData={queryData}
				totalPages={totalPages}
				setPageNumber={setPageNumber}
				pageNumber={pageNumber}
				query={query}
				loading={loading}
				queryFetchHandler={queryFetchHandler}
			/>
		</div>
	);
}

export default App;
// https://api.github.com/search/repositories?q=Q&per_page=10&page=3
// q=tetris+language:assembly&sort=stars&order=desc
