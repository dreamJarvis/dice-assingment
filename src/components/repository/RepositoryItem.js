/** @format */

export default function RepositoryItem({ repo_data }) {
	const { name, watchers_count, description, language, owner } = repo_data;
	const { avatar_url } = owner;

	return (
		<div
			className='repo-data'
			aria-label='repo-data'
			aria-description='single repository data'>
			<div className='repo-avatar' aria-label='repo-avatar'>
				{avatar_url && avatar_url.length ? (
					<img src={avatar_url} alt='repo-user-avatar' />
				) : (
					<span>loading...</span>
				)}
			</div>
			<div className='repo-details' aria-label='repo-details'>
				<span aria-label='repo-name'>
					<strong>name : </strong>
					{name}
				</span>
				<span aria-label='repo-stars'>
					<strong>stars: </strong> {watchers_count}
				</span>
				<span aria-label='repo-description'>
					<strong>description: </strong>
					{description}
				</span>
				<span aria-label='repo-language-used'>
					<strong>language: </strong>
					{language}
				</span>
			</div>
		</div>
	);
}
