import {Homepage} from './pages/Homepage.jsx';
import {WorkSpace} from './pages/WorkSpace.jsx';
import {Board} from './pages/Board.jsx';
import {CardDetails} from './pages/CardDetails.jsx';

const routes = [
	{path: '/workspace', component: WorkSpace},
	{path: '/board', component: Board},
	{path: '/', component: Homepage},
	{path: '/board/carddetails', component: CardDetails},
];

export default routes;
