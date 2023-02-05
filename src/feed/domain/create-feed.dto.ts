import Feed from "./feed";

type CreateFeedDto = Omit<Feed, 'id' | 'date'> & { date: string };

function validateCreateFeedDto(dto: any): dto is CreateFeedDto {
  const date: Date | undefined = new Date(dto.date);

  return typeof dto.header === 'string' &&
    typeof dto.subHeader === 'string' &&
    date &&
    date instanceof Date;
}

export default CreateFeedDto;
export { validateCreateFeedDto };
