/** @format */

export default function Item({ repo_data }) {
	const {
		name,
		watchers_count,
		description,
		language,
		owner,
		score,
		stargazers_count,
		updated_at,
		created_at,
	} = repo_data;
	const { avatar_url } = owner;

	return (
		<div className='repo-data'>
			<div className='repo-avatar'>
				{avatar_url && avatar_url.length ? (
					<img src={avatar_url} alt='repo-user-avatar' />
				) : (
					<span>loading...</span>
				)}
			</div>
			<div className='repo-details'>
				<span>
					<strong>name : </strong>
					{name}
				</span>
				<span>
					<strong>stars: </strong> {watchers_count}
				</span>
				<span>
					<strong>description: </strong>
					{description}
				</span>
				<span>
					<strong>language: </strong>
					{language}
				</span>
			</div>
		</div>
	);
}
