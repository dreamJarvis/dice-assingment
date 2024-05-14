/** @format */

import ItemList from "./RepositoryItemList";

export default function Repository({
	queryData,
	totalPages,
	setPageNumber,
	pageNumber,
	loading,
}) {
	return (
		<div
			className='container'
			aria-label='container'
			aria-description='contains all the repository fetched after the input has been entered'>
			{totalPages ? (
				<div className='btn prev-page'>
					<button
						className='prev-page-btn'
						onClick={() => setPageNumber(Math.max(pageNumber - 1, 1))}
						aria-label='prev-page-btn'>
						{"<"}
					</button>
				</div>
			) : (
				<></>
			)}
			{queryData?.length ? (
				<div className='query-items'>
					<div
						className='query-item-list'
						aria-label='query-item-list'
						aria-description='contains list of all the repositories fetched from server'>
						{queryData && queryData.length && !loading ? (
							<ItemList repo_list={queryData} />
						) : (
							<span>Loading...</span>
						)}
					</div>
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
						}
						aria-label='next-page-btn'>
						{">"}
					</button>
				</div>
			) : (
				<></>
			)}
		</div>
	);
}
