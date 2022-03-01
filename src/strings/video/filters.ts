export const FilterErrorText = {
  invalidFilterName: (name: string): string => `No filter exists with provided name: ${name}`,
  invalidFilterOptions: (name: string, options: string): string => `Invalid options for ${name} filter: ${options}`,
}
