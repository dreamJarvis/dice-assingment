/** @format */

import { useState } from "react";
import ItemList from "./RepositoryItemList";

/* 
	TODO:  error-handling
*/
export default function Repository({
	queryData,
	totalPages,
	setPageNumber,
	pageNumber,
	loading,
}) {
	const [openPageSetter, setOpenPageSetter] = useState(false);
	const [editPageNum, setEditPageNum] = useState(pageNumber);

	const editPageNumberHandler = () => {
		setOpenPageSetter(false);
		setPageNumber(editPageNum);
	};

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
					{openPageSetter ? (
						<div>
							<input
								type='number'
								onChange={(e) =>
									setEditPageNum(
										Math.min(Math.max(e.target.value, 1), totalPages)
									)
								}
							/>
							<button onClick={editPageNumberHandler}>set</button>
						</div>
					) : (
						<span
							className='query-item_page'
							onDoubleClick={() => setOpenPageSetter(true)}>
							Page : {pageNumber} / {totalPages}
						</span>
					)}
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
