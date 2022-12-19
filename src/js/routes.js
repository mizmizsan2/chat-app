
import HomePage from '../pages/home.jsx';
import ChatPage from '../pages/chatPage.jsx';
import LoginPage from '../pages/login.jsx';

var routes = [
  {
    path: '/',
    component: HomePage,
  },
  {
    path: '/chatPage',
    component: ChatPage,
  },
  {
    path: '/LoginPage',
    component: LoginPage,
  },
];

export default routes;
