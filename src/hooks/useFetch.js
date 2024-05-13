/** @format */

import { LIMIT_PER_PAGE } from "../utils/constants";

export default function useFetch() {
	return async (query, pageNumber, sort, attribute, order) => {
		let fetchAPI = `${query}&per_page=${LIMIT_PER_PAGE}&page=${pageNumber}`;
		if (sort) {
			fetchAPI += `&sort=${attribute}`;
			if (!order) fetchAPI += `order=desc`;
			else fetchAPI += `order=asc`;
		}

		try {
			const fetchData = await fetch(fetchAPI);
			const fetchDataJson = await fetchData.json();
			return fetchDataJson;
		} catch (err) {
			console.log("err : ", err);
			throw new Error(err);
		}
	};
}
