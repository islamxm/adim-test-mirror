export const cn = (classNames: Array<any>) => {
  return classNames.filter(cl => typeof cl === 'string').join(" ");
}