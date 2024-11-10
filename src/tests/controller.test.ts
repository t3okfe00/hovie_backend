import { expect } from "chai";

const base_url = "http://localhost:3000";

describe("First Test Collection", function () {
  it("should test two values....", function () {
    let expectedValue = 10;
    let actualValue = 10;

    expect(actualValue).to.be.equal(expectedValue);
  });
});
