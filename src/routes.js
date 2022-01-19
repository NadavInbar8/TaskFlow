import { Homepage } from './pages/Homepage.jsx';
import { WorkSpace } from './pages/WorkSpace.jsx';
import { Board } from './pages/Board.jsx';
import { CardDetails } from './pages/CardDetails.jsx';

const routes = [
  { path: '/workspace', component: WorkSpace, exact: true },
  //   { path: '/board/:cardId', component: CardDetails, exact: false },
  { path: '/board/:boardId', component: Board, exact: false },
  { path: '/', component: Homepage, exact: true },
];

export default routes;
