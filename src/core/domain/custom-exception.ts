export default class CustomException<T=unknown> extends Error {
  constructor(msg: string) {
    super(msg);
  }
}
