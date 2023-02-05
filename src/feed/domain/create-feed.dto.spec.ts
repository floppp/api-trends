import fc from 'fast-check';
import { validateCreateFeedDto } from './create-feed.dto';

describe('CreateFeedDto', () => {
  it('validation function fails when data is randomly generated', () => {
    fc.assert(
      fc.property(
        fc.record({
          title: fc.string(),
          date: fc.date(),
          subHeader: fc.string()
        }),
        (dto) => {
        // Alternatively: no return statement and direct usage of expect or assert
          return validateCreateFeedDto(dto);
      })
    );
  })
})
