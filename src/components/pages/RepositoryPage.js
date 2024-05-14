/** @format */

import { useEffect, useState } from "react";
import { LIMIT_PER_PAGE } from "./utils/constants";
import useDebounce from "./hooks/useDebounce";
import Repository from "./components/repository/Repository";
import useFetch from "./hooks/useFetch";
import useSortByAttribute from "./hooks/useSortByAttribute";
import InputQuery from "./components/InputQuery";

/* 
	TODO: Error Handling --> top priority

	TODO: implement aria-tags after project is done
	TODO: add Pagination
	TODO: fluid pagination

*/
export default function RepositoryPage() {
	const [query, setQuery] = useState("");
	const [pageNumber, setPageNumber] = useState(1);
	const [queryData, setQueryData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [totalPages, setTotalPages] = useState(0);
	const [sortingAttribute, setSortingAttribute] = useState("stargazers_count");
	const [sortingOrder, setSortingOrder] = useState("asc");

	const sortQueryByAttribute = useSortByAttribute();
	const fetchRepo = useFetch();

	useEffect(() => {
		debounceQuery(query, pageNumber);
	}, [pageNumber]);

	useEffect(() => {
		sortingHandler();
	}, [sortingAttribute, sortingOrder]);

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

	const debounceQuery = useDebounce(queryFetchHandler, setLoading);

	const queryInputHandler = (value) => {
		setQuery(value);
		setPageNumber(1);
		debounceQuery(value, 1);
	};

	const sortingHandler = () => {
		const sortedQueryList = sortQueryByAttribute(
			queryData,
			sortingAttribute,
			sortingOrder
		);
		setQueryData([...sortedQueryList]);
	};

	return (
		<div className='repository'>
			<InputQuery
				queryData={queryData}
				query={query}
				setSortingAttribute={setSortingAttribute}
				setSortingOrder={setSortingOrder}
				queryInputHandler={queryInputHandler}
			/>
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
