/** @format */

import React, { useEffect } from "react";
import Item from "./Item";

export default function ItemList({
	repo_list,
	queryFetchHandler,
	pageNumber,
	query,
}) {
	// useEffect(() => {
	// 	queryFetchHandler(query, pageNumber);
	// }, [pageNumber]);

	return (
		<div className='repo_list'>
			{repo_list &&
				repo_list?.map((repo) => <Item key={repo?.id} repo_data={repo} />)}
		</div>
	);
}
