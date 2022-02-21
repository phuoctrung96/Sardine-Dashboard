import { DATA_TYPES } from "../domain/dataProvider";
import { stringChild, FeatureItem } from "../domain/featureItem";
import { rulesForDataDictionary } from "./ruleUtils";

// Case #1: No child
test("rulesForDataDictionary: Data for feature without child", () => {
  const input = [stringChild("Feature", "no child", false)];
  const output = [new FeatureItem("Feature", [], '""', DATA_TYPES.string, false, "no child")];
  expect(rulesForDataDictionary(input, "")).toEqual(output);
});

// Case #2: Single layered
test("rulesForDataDictionary: Data for feature with 2 children", () => {
  const input = [
    new FeatureItem(
      "Feature",
      [stringChild("Child1", "N/A", false), stringChild("Child2", "N/A", false)],
      "",
      DATA_TYPES.string,
      false,
      "single layer"
    ),
  ];
  const output = [
    new FeatureItem("Feature.Child1", [], '""', DATA_TYPES.string, false, "N/A"),
    new FeatureItem("Feature.Child2", [], '""', DATA_TYPES.string, false, "N/A"),
  ];
  expect(rulesForDataDictionary(input, "")).toEqual(output);
});

// Case #3: Double layered
test("rulesForDataDictionary: Data for feature with 2 layer of children", () => {
  const input = [
    new FeatureItem("Feature", [
      new FeatureItem("Child1", [stringChild("SubChild1", "N/A", false), stringChild("SubChild2", "N/A", false)]),
    ]),
  ];
  const output = [
    new FeatureItem("Feature.Child1.SubChild1", [], '""', DATA_TYPES.string, false, "N/A"),
    new FeatureItem("Feature.Child1.SubChild2", [], '""', DATA_TYPES.string, false, "N/A"),
  ];
  expect(rulesForDataDictionary(input, "")).toEqual(output);
});

// Case #4: With duration values
test("rulesForDataDictionary: Data for feature with duration values", () => {
  const input = [
    new FeatureItem("Feature", [
      new FeatureItem("Child1", [
        new FeatureItem(
          "SubChild1",
          [new FeatureItem("ALL"), new FeatureItem("24HRS"), new FeatureItem("7DAYS")],
          "",
          DATA_TYPES.int,
          false,
          "sub child 1 with duration values"
        ),
        new FeatureItem(
          "SubChild2",
          [new FeatureItem("30DAYS"), new FeatureItem("60DAYS"), new FeatureItem("90DAYS")],
          "",
          DATA_TYPES.int,
          false,
          "sub child 2 with duration values"
        ),
      ]),
    ]),
  ];
  const output = [
    new FeatureItem("Feature.Child1.SubChild1", [], "", DATA_TYPES.int, false, "sub child 1 with duration values"),
    new FeatureItem("Feature.Child1.SubChild2", [], "", DATA_TYPES.int, false, "sub child 2 with duration values"),
  ];
  expect(rulesForDataDictionary(input, "")).toEqual(output);
});
