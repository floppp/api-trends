import axios from 'axios';
import cheerio from 'cheerio';
import Feed from '../../core/domain/feed';
import { FeedExtractStrategy } from './extractor.strategy';

export default class ElMundoExtractStrategy extends FeedExtractStrategy {
  constructor(url: string = 'https://www.elmundo.es/ultimas-noticias.html') {
    super(url);
  }

  async run(html: string): Promise<Feed[]> {
    return new Promise((res, _rej) => {
      const feeds: Feed[] = [];
      let $ = cheerio.load(html);

      $('article').map((_: number, element: any) => {
        const header = $(element).find('.ue-c-cover-content__kicker').text();
        const subHeader = $(element).find('.ue-c-cover-content__headline').text();
        const date = new Date(); // No date in new.

        feeds.push({header, subHeader, date})
      });
      res(feeds);
    })
  }
}
