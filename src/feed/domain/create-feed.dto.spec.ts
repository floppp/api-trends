import * as fc from 'fast-check';
import CreateFeedDto, { validateCreateFeedDto } from './create-feed.dto';
import Feed from './feed';

describe('CreateFeedDto', () => {
  // Because how dates works in typescript is hard to manage the date so I won't test in case of date not being a date.
  it('validation function fails when some fields does not match signature', () => {
    fc.assert(
      fc.property(
        fc.record({
          header: fc.integer(),
          date: fc.date(),
          subHeader: fc.string()
        }),
        (dto: any) => !validateCreateFeedDto(dto)
      ));
    fc.assert(
      fc.property(
        fc.record({
          header: fc.string(),
          date: fc.date(),
          subHeader: fc.integer()
        }),
        (dto: any) => !validateCreateFeedDto(dto)
      )
    );
  });

  it('case failing ', () => {
    expect(validateCreateFeedDto({"header":"","date":new Date("-025912-02-01T00:14:43.999Z"),"subHeader":""}))
      .toBe(true);
    // expect(
      // validateCreateFeedDto({"header":"","date":new Date("2138-05-12T22:00:00.000Z"),"subHeader":""})
    // )
      // .toBe(true);
  });

  it('validation works for dates as string', () => {
    fc.assert(
      fc.property(
        fc.record({
          header: fc.string(),
          date: fc.date(),
          subHeader: fc.string()
        }),
        (dto: Omit<Feed, 'id'>) => validateCreateFeedDto(
          {
            ...dto,
            date: dto.date.toISOString(),
          }
        ))
    );
  })
})
