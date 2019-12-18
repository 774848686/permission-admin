import Routers from './routers';
import {
    setMenuCookie
} from '@/utils/auth'
import store from '../store'
export const response = () => {
    let cacheRouter = null;
    return () => new Promise(resolve => {
        if (cacheRouter) {
            return resolve(cacheRouter, '');
        }
        cacheRouter = Routers;
        resolve(Routers, '')
    })
}
