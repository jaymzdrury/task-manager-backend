import hashPassword from "../utils/hashPassword";

describe("hashPassword", () => {
  it("should return large password", async () => {
    const hashedPassword = await hashPassword("password");
    expect(hashedPassword.length).toBeGreaterThan(30);
  });
});
