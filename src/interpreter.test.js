const assert = require("assert");
const { parseExpression, parseProgram } = require("../include/parser");
const { interpExpression, interpProgram, interpStatement } = require("./interpreter");

test("multiplication with a variable", () => {
  const r = interpExpression({ x: 10 }, parseExpression("x * 2").value);

  assert(r === 20);
});

test("assignment", () => {
  const st = interpProgram(parseProgram("let x = 10; x = 20;").value);

  assert(st.x === 20);
});
