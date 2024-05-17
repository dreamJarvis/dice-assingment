/** @format */

import React, { useState } from "react";

export default function PageSetter({ pageNumber, setPageNumber, totalPages }) {
	const [openPageSetter, setOpenPageSetter] = useState(false);
	const [editPageNum, setEditPageNum] = useState(pageNumber);

	const editPageNumberHandler = () => {
		setOpenPageSetter(false);
		setPageNumber(editPageNum);
	};

	return (
		<div className='query-item-page'>
			{openPageSetter ? (
				<div
					className='query-item-page-setter query-item-page-setter-input'
					aria-label='query-item-page-setter'
					aria-description='select page number from total pages of data'>
					<input
						type='number'
						onChange={(e) =>
							setEditPageNum(Math.min(Math.max(e.target.value, 1), totalPages))
						}
					/>
					<button onClick={editPageNumberHandler}>set</button>
				</div>
			) : (
				<span
					className='query-item-page-setter'
					aria-label='query-item-page-setter'
					onDoubleClick={() => setOpenPageSetter(true)}>
					Page : {pageNumber} / {totalPages}
				</span>
			)}
		</div>
	);
}
