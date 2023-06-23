const mapping: Record<string, string> = {
  bookings: 'booking',
  companies: 'company',
  subscriptions: 'subscription',
  'tennis-courts': 'tennis_court',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
