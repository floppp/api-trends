import Repository from "../../core/domain/repository";
import Feed from "../../core/domain/feed";

export default abstract class FeedRepository extends Repository<Feed> {
  protected collection = 'feed';
}
