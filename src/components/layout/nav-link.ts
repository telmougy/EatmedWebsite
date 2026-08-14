/**
 * Shape of a primary nav entry, shared by the desktop and mobile navs so the
 * key union can't drift between them. `key` indexes the `Nav` message namespace.
 */
export type NavLink = {
  href: string;
  key:
    | 'home'
    | 'about'
    | 'products'
    | 'projects'
    | 'approvals'
    | 'app'
    | 'contact';
};
