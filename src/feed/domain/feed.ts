export default interface Feed {
  header: string;
  date: Date;
  subHeader: string;
}

export type FeedDocument = Feed & { id: string };
