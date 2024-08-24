const stringHelpers = {
  capitalFirst: ({ value }: { value?: string }) => {
    if (!value) return "";
    return value.charAt(0).toUpperCase() + value.slice(1);
  },
  capitalizeWords: ({ value }: { value?: string }) => {
    if (!value) return "";
    return value
      .split(" ")
      .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  },
};
export default stringHelpers;
