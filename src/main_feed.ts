import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()
import ConsoleLogger from './shared/loggers/console.logger';

const logger = ConsoleLogger.instance;

logger.logInfo(process.env.MONGO_URI ?? '')
