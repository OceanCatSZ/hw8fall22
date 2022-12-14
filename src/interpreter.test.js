"use strict";

const assert = require("assert");
const { parseExpression, parseProgram } = require("../include/parser.js");
const { interpExpression, interpProgram, interpStatement } = require("./interpreter.js");

test("interpExpression interprets multiplication with a variable", () => {
  const r = interpExpression({ x: 10 }, parseExpression("x * 2").value);

  assert(r === 20);
});

test("interpProgram interprets basic declaration then assignment", () => {
  const st = interpProgram(parseProgram("let x = 10; x = 20;").value);

  assert(st.x === 20);
});
