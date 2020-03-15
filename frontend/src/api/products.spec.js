import { getProducts } from "./products";

describe("getProduts", () => {
  let jsonFn;

  beforeEach(() => {
    jsonFn = jest.fn().mockResolvedValue({
      products: ["benefit1", "benefit2"],
    });

    jest.spyOn(global, "fetch").mockResolvedValue({
      json: jsonFn,
    });
  });

  it("does a post request the correct endpoint", async () => {
    await getProducts();

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith("http://localhost:4000/api/products");
  });

  it("calls the json function", async () => {
    await getProducts();

    expect(jsonFn).toHaveBeenCalledTimes(1);
  });

  it("calls the json function and extracts the products", async () => {
    const result = await getProducts();

    expect(result).toEqual(["benefit1", "benefit2"]);
  });
});
