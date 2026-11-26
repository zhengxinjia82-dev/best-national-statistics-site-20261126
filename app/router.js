// Route table for Iceland in Numbers: ten sections, each reached by a hash
// link from the left nav. The page module for each route lives in pages/.
import overview from './pages/overview.js';
import population from './pages/population.js';
import economy from './pages/economy.js';
import jobs from './pages/jobs.js';
import prices from './pages/prices.js';
import health from './pages/health.js';
import education from './pages/education.js';
import environment from './pages/environment.js';
import regions from './pages/regions.js';
import methods from './pages/methods.js';

export const ROUTES = [
  { path: '/', label: 'Overview', kicker: '2024 at a glance', page: overview },
  { path: '/population', label: 'Population', kicker: '386,506 people', page: population },
  { path: '/economy', label: 'Economy', kicker: 'GDP $33.2bn', page: economy },
  { path: '/jobs', label: 'Jobs', kicker: '3.6% unemployed', page: jobs },
  { path: '/prices', label: 'Prices', kicker: '+46.6% since 2015', page: prices },
  { path: '/health', label: 'Health', kicker: '82.8 years', page: health },
  { path: '/education', label: 'Education', kicker: '98.2% primary', page: education },
  { path: '/environment', label: 'Environment', kicker: '99.98% renewable', page: environment },
  { path: '/regions', label: 'Regions', kicker: '8 regions', page: regions },
  { path: '/methods', label: 'Methods & sources', kicker: 'Every figure cited', page: methods },
];

export function findRoute(hash) {
  const path = (hash || '#/').replace(/^#/, '') || '/';
  return ROUTES.find((r) => r.path === path) || ROUTES[0];
}
