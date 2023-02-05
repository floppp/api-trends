import Newspaper from "../domain/newspapers";
import ElMundoExtractStrategy from "./elmundo-strategy";
import ElPaisExtractStrategy from "./elpais-strategy";
import { FeedExtractStrategy } from "./extractor.strategy";

// Actually this could be the exposed if we don't care about mutating
// values.
const strats: { [key in Newspaper]: FeedExtractStrategy } = {
  elpais: new ElPaisExtractStrategy(),
  elmundo: new ElMundoExtractStrategy(),
};

export default function factory(np: Newspaper): FeedExtractStrategy {
  return strats[np];
}
