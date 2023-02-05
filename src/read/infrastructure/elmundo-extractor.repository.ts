import axios from 'axios';
import cheerio from 'cheerio';
import Feed from '../../core/domain/feed';

interface FeedExtractStrategy {
  run(): Promise<Feed[]>;
}

export default class ElMundoFeedExtractorRepository implements FeedExtractStrategy {
  async run(): Promise<Feed[]> {
    return new Promise((res, rej) => {

      const feeds: Feed[] = [];
      console.log('+++++++++++++')
      axios.get('https://www.elpais.com')
        .then((response: any) => {
          let $ = cheerio.load(response.data);
          console.log(response.data)


          $('article').map((index: number, element: any) => {
            console.log($(element));
            const header = $(element).find('h2.c_t').text();
            const subHeader = $(element).find('p.c_d').text();
            const date = new Date(); // No date in new.
            console.log(header);
            console.log(subHeader);

            feeds.push({header, subHeader, date})
          });
          res(feeds);
        })
        .catch((error: Error) => {
          rej(error.message)
        })
    })
  }
}
