/** @format */

import { useEffect, useState } from "react";
import "./App.css";
import { LIMIT_PER_PAGE, QUERY_SORT_OPTIONS } from "./utils/constants";
import useDebounce from "./hooks/useDebounce";
import Repository from "./components/Repository";
import useFetch from "./hooks/useFetch";
import useSortByAttribute from "./hooks/useSortByAttribute";

/* 
	TODO: implement aria-tags after project is done
	TODO: add Pagination
*/
// stargazers_count, watchers_count, score, name, created_at, updated_at
function App() {
	const [query, setQuery] = useState("");
	const [pageNumber, setPageNumber] = useState(1);
	const [queryData, setQueryData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [totalPages, setTotalPages] = useState(0);
	const [sortingAttribute, setSortingAttribute] = useState("stargazers_count");
	const [sortingOrder, setSortingOrder] = useState("asc");
	const fetchRepo = useFetch();
	const sortQueryByAttribute = useSortByAttribute();

	const queryFetchHandler = async (query, pageNumber) => {
		try {
			const data = await fetchRepo(query, pageNumber);
			setTotalPages(Math.floor(data?.total_count / LIMIT_PER_PAGE));
			setQueryData(
				sortQueryByAttribute(data?.items, sortingAttribute, sortingOrder)
			);
			setLoading(false);
		} catch (err) {
			setLoading(true);
			throw new Error(err);
		}
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

	useEffect(() => {
		sortQueryByAttribute(queryData, sortingAttribute, sortingOrder);
	}, [queryData]);

	const sortingHandler = () => {
		const sortedQueryList = sortQueryByAttribute(
			queryData,
			sortingAttribute,
			sortingOrder
		);
		console.log("sortedQueryList : ", sortedQueryList);
		setQueryData([...sortedQueryList]);
	};

	return (
		<div className='App'>
			<div className='header'>
				<div className='input-query'>
					<input
						type='text'
						value={query}
						onChange={(e) => queryInputHandler(e.target.value)}
					/>
				</div>
				{queryData && (
					<div className='query-sorting'>
						<select
							name='query-sorting_attr'
							id='query-sorting_attr'
							onChange={(e) => setSortingAttribute(e.target.value)}>
							{(() => {
								const list = [];
								QUERY_SORT_OPTIONS.forEach((value, key) => {
									list.push(
										<option key={key} value={key}>
											{key}
										</option>
									);
								});
								return list;
							})()}
						</select>
						<select
							name='query-sort_order'
							id='query-sort_order'
							onChange={(e) => setSortingOrder(e.target.value)}>
							<option value='asc'>asc</option>
							<option value='desc'>desc</option>
						</select>
						<button className='query-sort-btn' onClick={sortingHandler}>
							apply
						</button>
					</div>
				)}
			</div>
			<Repository
				queryData={queryData}
				totalPages={totalPages}
				setPageNumber={setPageNumber}
				pageNumber={pageNumber}
				loading={loading}
			/>
		</div>
	);
}

export default App;
// https://api.github.com/search/repositories?q=Q&per_page=10&page=3
// q=tetris+language:assembly&sort=stars&order=desc
/* 
7969
882
*/
