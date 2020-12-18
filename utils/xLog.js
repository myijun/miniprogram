class xLog {

  /**
   * 是否开启调式功能
   */
  static isDebug = true;

  /**
   * 
   */
  static log() {

    this.isDebug && console.log.apply(console, [].slice.call(arguments));

  }

  /**
   * 
   */
  static err() {
    this.isDebug && console.error.apply(console, [].slice.call(arguments).reverse());
  }

}

export default xLog;