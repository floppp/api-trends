import axios from 'axios';
import cheerio from 'cheerio';
import Feed from '../../core/domain/feed';
import { FeedExtractStrategy } from './extractor.strategy';

export default class ElPaisFeedExtractorRepository {
  constructor(private readonly strategy: FeedExtractStrategy) { }

  run(html: string): Promise<Feed[]> {
    throw new Error('Method not implemented.');
  }

  async exec(): Promise<Feed[]> {
    const webResponse = await axios.get(this.strategy.url);

    return this.strategy.run(webResponse.data);
  }

  // async run(): Promise<Feed[]> {
  //   return new Promise((res, rej) => {

  //     const feeds: Feed[] = [];
  //     console.log('+++++++++++++')
  //     axios.get('https://www.elpais.com')
  //       .then((response: any) => {
  //         let $ = cheerio.load(response.data);
  //         console.log(response.data)


  //         $('article').map((index: number, element: any) => {
  //           console.log($(element));
  //           const header = $(element).find('h2.c_t').text();
  //           const subHeader = $(element).find('p.c_d').text();
  //           const date = new Date(); // No date in new.
  //           console.log(header);
  //           console.log(subHeader);

  //           feeds.push({header, subHeader, date})
  //         });
  //         res(feeds);
  //       })
  //       .catch((error: Error) => {
  //         rej(error.message)
  //       })
  //   })
  // }
}
