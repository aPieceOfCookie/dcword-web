//数据验证工具包

/**
 * 检测数据是否为空
 * @param {*} item
 * @returns boolean
 */
export function valueIsNull1(item) {
  if (item == null || item == "" || item == undefined || item == "undefined") {
    return false;
  } else {
    return true;
  }
}

/**
 * 检测数据是否为空
 * @param {*} item
 * @returns 自己或者""
 */
export function valueIsNull2(item) {
  if (item == null || item == "" || item == undefined || item == "undefined") {
    return "";
  } else {
    return item;
  }
}
