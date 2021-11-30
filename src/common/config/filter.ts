/**
 * 添加 nunjucks 过滤器
 */
export default {
  // 为nkj加入一个过滤器
  shorten: function (str: string, count: number) {
    return str.slice(0, count || 5);
  },
  //三元表达式
  ternary: function (a: any, b: any, c: any) {
    return a ? b : c;
  },
  //format
  format: function (a: any, ...arg: any[]) {
    return a.replace(/%s/g, function () {
      return arg.shift();
    });
  },
  //去掉所有的html标记
  delHtmlTag: function (str: string) {
    return str.replace(/<[^>]+>/g, ''); //去掉所有的html标记
  },
  //slice
  slice: function (str: string, start?: number, end?: number) {
    if (start && end) {
      return str.slice(start, end);
    } else if (start) {
      return str.slice(start);
    } else {
      return str;
    }
  },
};
