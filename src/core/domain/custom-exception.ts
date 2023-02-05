export default class CustomException<T> extends Error {
  constructor(msg: string) {
    super(msg);
  }
}
