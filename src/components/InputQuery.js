/** @format */

import React from "react";
import { QUERY_SORT_OPTIONS } from "../utils/constants";

export default function InputQuery({
	queryData,
	query,
	setSortingAttribute,
	setSortingOrder,
	queryInputHandler,
}) {
	return (
		<div
			className='repo-input-query'
			aria-label='repo-input-query'
			aria-description='input for repository'>
			<div className='input-query' aria-label='input-query'>
				<input
					type='text'
					placeholder='type repo name...'
					value={query}
					onChange={(e) => queryInputHandler(e.target.value)}
				/>
			</div>
			{queryData && (
				<div
					className='query-sorting'
					aria-label='query-sorting'
					aria-description='apply sorting to fetched repository data'>
					<select
						name='query-sorting_attr'
						id='query-sorting_attr'
						onChange={(e) => setSortingAttribute(e.target.value)}>
						{(() => {
							const list = [];
							QUERY_SORT_OPTIONS.forEach((value, key) => {
								list.push(
									<option key={key} value={key}>
										{key}
									</option>
								);
							});
							return list;
						})()}
					</select>
					<select
						name='query-sort_order'
						id='query-sort_order'
						onChange={(e) => setSortingOrder(e.target.value)}>
						<option value='asc'>asc</option>
						<option value='desc'>desc</option>
					</select>
				</div>
			)}
		</div>
	);
}
