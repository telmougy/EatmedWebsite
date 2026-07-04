import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Exclude `studio` (the embedded Sanity Studio) so it isn't locale-redirected.
  matcher: ['/((?!api|studio|_next|_vercel|.*\\..*).*)'],
};
