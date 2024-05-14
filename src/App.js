/** @format */

import "./App.css";
import RepositoryPage from "./components/pages/RepositoryPage";

/* 
	TODO: Error Handling --> top priority

	TODO: implement aria-tags after project is done
	TODO: add Pagination
	TODO: fluid pagination

*/
function App() {
	return (
		<div className='App'>
			<RepositoryPage />
		</div>
	);
}

export default App;
// https://api.github.com/search/repositories?q=Q&per_page=10&page=3
// q=tetris+language:assembly&sort=stars&order=desc
/* 
7969
882
*/
