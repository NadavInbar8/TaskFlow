import { Homepage } from './pages/Homepage.jsx';
import { WorkSpace } from './pages/WorkSpace.jsx';
import { Board } from './pages/Board.jsx';
import { Login } from './pages/Login.jsx';
import { Signup } from './pages/Signup.jsx';
const routes = [
  { path: '/workspace', component: WorkSpace, exact: true },
  { path: '/board/:boardId', component: Board, exact: false },
  { path: '/login', component: Login, exact: true },
  { path: '/signup', component: Signup, exact: true },
  { path: '/', component: Homepage, exact: true },
];

export default routes;
