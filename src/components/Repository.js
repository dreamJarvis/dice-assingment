/** @format */

import React from "react";
import ItemList from "./ItemList";

export default function Repository({
	queryData,
	totalPages,
	setPageNumber,
	pageNumber,
	query,
	loading,
	queryFetchHandler,
}) {
	return (
		<div className='container'>
			{totalPages ? (
				<div className='btn prev-page'>
					<button
						className='prev-page-btn'
						onClick={() => setPageNumber(Math.max(pageNumber - 1, 1))}>
						{"<"}
					</button>
				</div>
			) : (
				<></>
			)}
			{queryData?.length ? (
				<div className='query-items'>
					<div className='query-item-list'>
						{queryData && queryData.length && loading ? (
							<span>Loading...</span>
						) : (
							<ItemList
								query={query}
								repo_list={queryData}
								queryFetchHandler={queryFetchHandler}
								pageNumber={pageNumber}
							/>
						)}
					</div>
					<span className='query-item_page'>Page : {pageNumber}</span>
				</div>
			) : (
				<span>no input...</span>
			)}
			{totalPages > 1 ? (
				<div className='btn next-page'>
					<button
						className='next-page-btn'
						onClick={() =>
							setPageNumber(Math.min(Math.max(pageNumber, 1) + 1, totalPages))
						}>
						{">"}
					</button>
				</div>
			) : (
				<></>
			)}
		</div>
	);
}
