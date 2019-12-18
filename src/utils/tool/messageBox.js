import { Message,MessageBox } from 'element-ui';
/**
 * 对二次确认方法进行封装
 * @param {*} words 提示文字
 */
export const messageBoxConform = (words) => {
    return new Promise(resolve => {
        MessageBox.confirm(words, "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
        }).then(() => {
            resolve();
        }).catch(() => {
            Message({
                type: "info",
                message: "已取消"
            });
        });
    })
}