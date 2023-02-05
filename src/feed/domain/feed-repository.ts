import Repository from "../../core/domain/repository";
import Feed from "./feed";

export default abstract class FeedRepository extends Repository<Partial<Feed>> {
  protected collection = 'feed';
}
