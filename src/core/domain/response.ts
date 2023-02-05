import CustomException from './custom-exception';

/**
 *  Either-like with union type. Maybe it won't be in use yet.
 */
type Response<T> = CustomException<T> | T

export default Response;
