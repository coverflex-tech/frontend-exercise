import { postOrder } from "./orders";

describe("postOrder", () => {
  const items = ["benefit1", "benefit2"];
  const userId = "userId";
  let jsonFn;

  beforeEach(() => {
    jsonFn = jest.fn().mockResolvedValue({
      order: {
        order_id: "123",
        data: { items: ["benefit1", "benefit2"], total: 500 },
      },
    });

    jest.spyOn(global, "fetch").mockResolvedValue({
      json: jsonFn,
    });
  });

  it("does a post request the correct endpoint with a body", async () => {
    await postOrder(items, userId);

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith("http://localhost:4000/api/orders", {
      body: '{"items":["benefit1","benefit2"],"user_id":"userId"}',
      method: "POST",
    });
  });

  it("calls the json function", async () => {
    await postOrder(items, userId);

    expect(jsonFn).toHaveBeenCalledTimes(1);
  });

  it("calls the json function and extracts the order", async () => {
    const result = await postOrder(items, userId);

    expect(result).toEqual({
      order_id: "123",
      data: { items: ["benefit1", "benefit2"], total: 500 },
    });
  });
});
