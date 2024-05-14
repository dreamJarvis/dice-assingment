/** @format */

export const GITHUB_REPO_SEARCH_URL =
	" https://api.github.com/search/repositories?q=";
export const LIMIT_PER_PAGE = 10;
export const QUERY_DELAY = 300;
export const QUERY_SORT_OPTIONS = new Map([
	["stargazers_count", "number"],
	["watchers_count", "number"],
	["score", "number"],
	["created_at", "date"],
	["updated_at", "date"],
	["name", "string"],
]);
