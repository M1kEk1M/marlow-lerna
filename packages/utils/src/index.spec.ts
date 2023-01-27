import { gridToApi } from "./index";

describe("gridToApi", () => {
  it("Generate correct offset based on page data", () => {
    const data = {
      page: 3,
      pageSize: 25,
    };

    const result = gridToApi(data);

    expect(result.offset).toEqual(75);
  });
});
