/** @format */

import { QUERY_SORT_OPTIONS } from "./constants";

export const sortingByAttribute = (list, attribute, order) => {
	const attributeType = QUERY_SORT_OPTIONS.get(attribute);
	const sortedQueryList = list.sort((item1, item2) => {
		if (order === "asc") {
			if (attributeType === "number") {
				return item1[attribute] - item2[attribute];
			} else if (attributeType === "date") {
				return (
					new Date(item1[attribute]).getTime() -
					new Date(item2[attribute]).getTime()
				);
			} else {
				return item1[attribute].length - item2[attribute].length;
			}
		}
		if (attributeType === "number") {
			return item2[attribute] - item1[attribute];
		} else if (attributeType === "date") {
			return (
				new Date(item2[attribute]).getTime() -
				new Date(item1[attribute]).getTime()
			);
		} else return item2[attribute].length - item1[attribute].length;
	});
	return sortedQueryList;
};
