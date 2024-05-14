/** @format */

import { GITHUB_REPO_SEARCH_URL, LIMIT_PER_PAGE } from "../utils/constants";

export default function useFetch() {
	return async (query, pageNumber) => {
		let fetchAPI = `${query}&per_page=${LIMIT_PER_PAGE}&page=${pageNumber}`;
		try {
			const fetchData = await fetch(GITHUB_REPO_SEARCH_URL + fetchAPI);
			const fetchDataJson = await fetchData.json();
			console.log("fetchDataJson : ", fetchDataJson);
			return fetchDataJson;
		} catch (err) {
			console.log("err : ", err);
			throw new Error(err);
		}
	};
}
