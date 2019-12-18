
const ispro =  process.env.NODE_ENV === 'production';
export const urlHeader_rbac = ispro ? 'http://irbac.l1ug5.cn/' : 'http://118.31.247.151:18700/';
export const urlHeader = ispro ? 'http://imanager.l1ug5.cn/' : 'http://118.31.247.151:18510/';
export const activityTypeUrl = ispro?'http://iactivity.l1ug5.cn':'http://118.31.247.151:18610';
