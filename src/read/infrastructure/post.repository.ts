import axios from 'axios';
import Feed from '../../core/domain/feed';
import { Id } from '../../core/domain/model';
import ReadException from '../domain/read.exception';

// This could be implemented as a Template pattern if
// more complexity must be added.
export default class PostRepository {
  async exec(feeds: Feed[]): Promise<any[]> {
    try {
      const responses = await Promise.all(
        feeds.map(f => axios.post<Id>("http://localhost:3000/api/v1/feed", f))
      );

      return responses.map(r => r.data);
    } catch (err) {
      throw new ReadException('Problem posting to uservice');
    }
  }
}
