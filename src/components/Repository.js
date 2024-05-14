/** @format */

import { useEffect } from "react";
import ItemList from "./RepositoryItemList";

/* 
TODO: apply sorting
*/
export default function Repository({
	queryData,
	totalPages,
	setPageNumber,
	pageNumber,
	loading,
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
						{queryData && queryData.length && !loading ? (
							<ItemList repo_list={queryData} />
						) : (
							<span>Loading...</span>
						)}
					</div>
					{/* 
                  TODO: allow user to edit page number, manually
               */}
					<span className='query-item_page'>
						Page : {pageNumber} / {totalPages}
					</span>
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
