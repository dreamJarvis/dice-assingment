/** @format */

import { useEffect, useState } from "react";
import useSortByAttribute from "../../hooks/useSortByAttribute";
import useFetch from "../../hooks/useFetch";
import { LIMIT_PER_PAGE } from "../../utils/constants";
import useDebounce from "../../hooks/useDebounce";
import InputQuery from "../InputQuery";
import Repository from "../repository/Repository";
import FetchError from "../../Errors/FetchError";
import PageSetter from "../PageSetter";

/* 
	TODO: implement aria-tags after project is done

*/
export default function RepositoryPage() {
	const [query, setQuery] = useState("");
	const [pageNumber, setPageNumber] = useState(1);
	const [queryData, setQueryData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [totalPages, setTotalPages] = useState(0);
	const [error, setError] = useState(null);
	const [sortingAttribute, setSortingAttribute] = useState("stargazers_count");
	const [sortingOrder, setSortingOrder] = useState("asc");

	const sortQueryByAttribute = useSortByAttribute();
	const fetchRepo = useFetch(setError);

	useEffect(() => {
		debounceQuery(query, pageNumber);
	}, [pageNumber]);

	useEffect(() => {
		sortingHandler();
	}, [sortingAttribute, sortingOrder]);

	const queryFetchHandler = async (query, pageNumber) => {
		try {
			const data = await fetchRepo(query, pageNumber);
			if (data?.items) {
				setTotalPages(Math.floor(data?.total_count / LIMIT_PER_PAGE));
				setQueryData(
					sortQueryByAttribute(data?.items, sortingAttribute, sortingOrder)
				);
				setLoading(false);
				setError(null);
			} else {
				setError(data?.message);
				setLoading(true);
			}
		} catch (err) {
			setLoading(true);
			setError(err);
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
			{error ? (
				<FetchError error={error} />
			) : (
				<Repository
					queryData={queryData}
					totalPages={totalPages}
					setPageNumber={setPageNumber}
					pageNumber={pageNumber}
					loading={loading}
				/>
			)}
			<PageSetter
				pageNumber={pageNumber}
				setPageNumber={setPageNumber}
				totalPages={totalPages}
			/>
		</div>
	);
}
