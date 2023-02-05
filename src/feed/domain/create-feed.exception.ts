import Feed from './feed';
import CustomException from '../../core/domain/custom-exception';

export default class CreateFeedException extends CustomException<Feed> {
  constructor(msg: string) {
    super(`[CreateFeedException] ${msg}`);
  }
}
