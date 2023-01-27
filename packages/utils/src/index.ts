export const isString = (val: unknown): val is string => {
  return typeof val === "string";
};

export const gridToApi = (data: { page: number; pageSize: number }) => ({
  limit: data.pageSize,
  offset: data.pageSize * data.page,
});

export const capitalize = (val: string) =>
  val.charAt(0).toUpperCase() + val.slice(1);
