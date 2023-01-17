
import HomePage from '../pages/home.jsx';
import ChatPage from '../pages/chatPage.jsx';
import NewAcc from '../pages/newAc.jsx';

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
    path: '/newAccount',
    component: NewAcc,
  },
];

export default routes;
