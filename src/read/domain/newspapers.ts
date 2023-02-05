const newspapers = ['elpais', 'elmundo'] as const;
type Tuple = typeof newspapers;
type Newspaper = Tuple[number];

function isNewspaper(np: string): np is Newspaper {
  return newspapers.findIndex(p => p === np) !== -1;
}

export default Newspaper;
export { newspapers, isNewspaper };
