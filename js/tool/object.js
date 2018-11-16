const toStr = Object.prototype.toString;
/**
 * @author Frank Wu
 * @since 2018-11-16
 * @param {Object} obj
 * @return {String} the type of obj [String, Object, Function. Number, ...] 
 */
export const getType = obj => toStr.call(obj).slice(8, -1);

/**
 * @since 2018-11-16
 * @param {String} val  原key
 * @param {String} char  要替换的字符
 * @description 驼峰转下划线
 * @return 返回处理后的key
 */
// export const camel2UnderLine = (val, char = '_') => {
//   return val.replace(/([A-Z])/g,`${char}$1`).toLowerCase();
// }
// const replaceUnderLine = (key) => {
//   return _strReplaceChar(key, '_', true);
// }

/**
 * 
 * @param {String} str A string prepared to be replace from camel to char
 * @param {*} char A char which camel-str will replaced to char-str
 * @param {*} reverse Should camel-str replace to char-str or reverse
 * @return resolved str
 */
const camelWithUnderline = (str, char = '_', reverse) => {
  if (reverse) {
    return str.replace(new RegExp(`${char}[a-z]`, 'g'), str => {
      return `${str.slice(1).toUpperCase()}`; 
    })
  }
  return str.replace(new RegExp(`[A-Z]`, 'g'), (letter, index) => {
    return index ? `${char}${letter.toLowerCase()}` : letter.toLowerCase();
  })
};




const fileterCamel = (obj, char = '_') => {
  const keys = Object.keys(obj)
  return keys.reduce((init, item) => {
    let str = item;
    if (/[A-Z]/g.test(item)) {
      str = camelWithUnderline(item)
    }
    init.keys.push(str)
    init.vals.push(obj[item])
    return init
  }, {
    keys: [],
    vals: [],
  })
};


const replaceUnderLineObj = obj => {
  return Object.keys(obj).reduce((init, key) => {
    // console.log(replaceUnderLine(key));
    init[replaceUnderLine(key)] = obj[key];
    return init;
  }, {});
};


const allTypeReplaceUnderLine = obj => {
  const type = Object.prototype.toString.call(obj).slice(8, -1);
  switch (type) {
    case 'Object':
      return replaceUnderLineObj(obj);
    case 'Array':
      return obj.map(item => replaceUnderLineObj(item));
    case 'String':
      return camelWithUnderline(obj, '_', true);
  }
};
