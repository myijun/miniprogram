import xLog from "./xLog";

class xError {

  static errorHandler(res, msg) {
    xLog.err(msg, JSON.stringify(res));
  }
}


export default xError;