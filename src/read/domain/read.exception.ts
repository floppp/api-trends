import Feed from '../../core/domain/feed';
import CustomException from '../../core/domain/custom-exception';

export default class ReadException extends CustomException {
  constructor(msg: string) {
    super(`[ReadException] ${msg}`);
  }
}
