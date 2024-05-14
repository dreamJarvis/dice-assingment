/** @format */

import Item from "./Item";

export default function ItemList({ repo_list }) {
	return (
		<div className='repo_list'>
			{repo_list &&
				repo_list?.map((repo) => <Item key={repo?.id} repo_data={repo} />)}
		</div>
	);
}
