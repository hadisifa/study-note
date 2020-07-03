/**
 * 类class用constructor接收参数
 * 相当于
 *      function MVVM(params){}
 */

class MVVM {
  constructor(options) {
    //一上来  先把可用的东西挂载在实例上
    this.$el = options.el;
    this.$data = options.data;

    //如果有要编译的模板则开始编译
    if (this.$el) {
      //数据额劫持 就是把对象的所有属性 改成get和set方法
      new Observer(this.$data);
      this.proxyData(this.$data);
      //用数据和元素进行编译
      new Compile(this.$el, this);
    }
  }
  proxyData(data) {
    Object.keys(data).forEach((key) => {
      Object.defineProperty(this, key, {
        get() {
          return data[key];
        },
        set(newValue) {
          data[key] = newValue;
        },
      });
    });
  }
}
