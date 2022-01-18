import {Homepage} from './pages/Homepage.jsx';
import {WorkSpace} from './pages/WorkSpace.jsx';
import {Board} from './pages/Board.jsx';

const routes = [
	{path: '/workspace', component: WorkSpace, exact: true},
	{path: '/board', component: Board, exact: false},
	{path: '/', component: Homepage, exact: true},
];

export default routes;
