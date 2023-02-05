import axios from 'axios';
import cheerio from 'cheerio';
import Feed from '../../core/domain/feed';
import { FeedExtractStrategy } from './extractor.strategy';

export default class ElPaisExtractStrategy extends FeedExtractStrategy {
  constructor(url: string = 'https://www.elpais.com') {
    super(url);
  }

  async run(html: string): Promise<Feed[]> {
    return new Promise((res, _rej) => {
      const feeds: Feed[] = [];
      let $ = cheerio.load(html);

      $('article').map((_: number, element: any) => {
        const header = $(element).find('h2.c_t').text();
        const subHeader = $(element).find('p.c_d').text();
        const date = new Date(); // No date in new.
        console.log(header);

        feeds.push({header, subHeader, date})
      });
      res(feeds);
    })
  }
}
