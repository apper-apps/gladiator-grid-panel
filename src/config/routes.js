import Home from '@/components/pages/Home';

export const routes = {
  home: {
    id: 'home',
    label: 'Gladiator Grid',
    path: '/',
    icon: 'Swords',
    component: Home
  }
};

export const routeArray = Object.values(routes);
export default routes;