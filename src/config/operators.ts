export const operatorsMap = {
  text: ["equals", "contains", "startsWith", "endsWith"],
  number: ["equals", "gt", "lt", "between"],
  date: ["between"],
  boolean: ["is"],
  singleSelect: ["is", "isNot"],
  multiSelect: ["in", "notIn"],
};
