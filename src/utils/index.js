/**
 * 将日期对象转化为一个预设格式的字符串
 * @param {Date} date 一个日期对象
 * @param {预期格式} fmt 预期格式
 */
export function format(date, fmt) {
    var o = {
        // 月份
        'M+': date.getMonth() + 1,
        // 日
        'd+': date.getDate(),
        // 小时
        'h+': date.getHours(),
        // 分
        'm+': date.getMinutes(),
        // 秒
        's+': date.getSeconds(),
        // 季度
        'q+': Math.floor((date.getMonth() + 3) / 3),
        // 毫秒
        'S': date.getMilliseconds()
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
        }
    }
    return fmt;
}

export function formatTime(time, option) {
    time = +time * 1000
    const d = new Date(time)
    const now = Date.now()

    const diff = (now - d) / 1000

    if (diff < 30) {
        return '刚刚'
    } else if (diff < 3600) { // less 1 hour
        return Math.ceil(diff / 60) + '分钟前'
    } else if (diff < 3600 * 24) {
        return Math.ceil(diff / 3600) + '小时前'
    } else if (diff < 3600 * 24 * 2) {
        return '1天前'
    }
    if (option) {
        return parseTime(time, option)
    } else {
        return d.getMonth() + 1 + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分'
    }
}
/**
 * 合并对象
 * @param {Object} target  目标
 * @param {Array} sources  对象
 * @param {Array} keys     字段
 */
export function assignKeysA(target, sources, keys) {
    for (let i = 0; i < sources.length; i++) {
        assignKeys(target, sources[i], keys);
    }
    return target;
}

export function delKeys(target, keys) {
    for (let i = 0; i < keys.length; i++) {
        delete target[keys[i]];
    }
}
export function assignKeys(target = {}, source, keys) {
    if (source != undefined) {
        let key, value;
        for (let i = 0; i < keys.length; i++) {
            key = keys[i];
            value = source[key];
            if (value !== undefined) {
                target[key] = value;
            }
        }
    }
    return target;
}
/**
 * 合并数组
 * @param {Array} target 
 * @param {Array} source 
 */
export function assignArray(target,source){
    return target.map(element => {
        const temp = source.find(item=>item.prop===element.prop);
        if(temp){
          element = Object.assign(element,temp);
        }
        return element;
    });
  }
