import { getUser } from "./users";

describe("getUser", () => {
  let jsonFn;

  beforeEach(() => {
    jsonFn = jest.fn().mockResolvedValue({
      user: {
        user_id: "johndoe",
        data: { balance: 500, product_ids: ["benefit1", "benefit2"] },
      },
    });

    jest.spyOn(global, "fetch").mockResolvedValue({
      json: jsonFn,
    });
  });

  it("does a post request the correct endpoint", async () => {
    await getUser("johndoe");

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith("http://localhost:4000/api/users/johndoe");
  });

  it("calls the json function", async () => {
    await getUser("johndoe");

    expect(jsonFn).toHaveBeenCalledTimes(1);
  });

  it("calls the json function and extracts the user", async () => {
    const result = await getUser("johndoe");

    expect(result).toEqual({
      data: { balance: 500, product_ids: ["benefit1", "benefit2"] },
      user_id: "johndoe",
    });
  });
});
