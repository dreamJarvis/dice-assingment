/** @format */

import RepositoryItem from "./RepositoryItem";

export default function RepositoryItemList({ repo_list }) {
	return (
		<div className='repo-list' aria-label='repo-list'>
			{repo_list &&
				repo_list?.map((repo) => (
					<RepositoryItem key={repo?.id} repo_data={repo} />
				))}
		</div>
	);
}
