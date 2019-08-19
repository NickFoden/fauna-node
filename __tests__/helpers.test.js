const { mapToObj } = require("../helpers");

describe("mapToObj function", () => {
  const testId1 = Math.random();
  const testId2 = Math.random();
  const testId3 = Math.random();
  const testArray = [
    { ref: { id: testId1 }, data: "cool one" },
    { ref: { id: testId2 }, data: "cool two" },
    { ref: { id: testId3 } }
  ];

  const finalObj = mapToObj(testArray);
  it("should take an array of items with ref - ids and data and return an object", () => {
    expect(finalObj[testId1]).toEqual("cool one");
    expect(finalObj[testId2]).toEqual("cool two");
  });

  it("Should skip items with no data", () => {
    expect(Object.keys(finalObj).length).toEqual(2);
  });
});
