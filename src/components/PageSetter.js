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
		<div>
			{openPageSetter ? (
				<div className='query-item-page'>
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
					className='query-item-page'
					onDoubleClick={() => setOpenPageSetter(true)}>
					Page : {pageNumber} / {totalPages}
				</span>
			)}
		</div>
	);
}
