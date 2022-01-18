import { Homepage } from './pages/Homepage.jsx';
import { WorkSpace } from './pages/WorkSpace.jsx';
import { Board } from './pages/Board.jsx';
import { CardDetails } from './pages/CardDetails.jsx';

const routes = [
  { path: '/', component: Homepage },
  { path: '/workspace', component: WorkSpace },
  { path: '/board/:boardId?', component: Board },
  { path: '/carddetails/:cardId?', component: CardDetails },
];

export default routes;
