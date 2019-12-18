import request from '@/utils/request'
import {
    assignKeysA
} from '@/utils/index'
// 用户登录
export function postLogin(username, password) {
    let param = {
        account: username,
        password
    };
    return new Promise(resolve => {
        resolve({
            returnValue: {
                token: 'test'
            }
        });
    });
}
// 查询用户信息
export function getInfo(token) {
    return new Promise(resolve => {
        resolve({
            data: {
                roles: [0,1,2,3,4,5,6,7,8,9,10],
            }
        })
    })
}
