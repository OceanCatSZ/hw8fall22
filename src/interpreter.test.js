"use strict";

const assert = require("assert");
const { parseExpression, parseProgram } = require("../include/parser.js");
const {
  interpExpression,
  interpProgram,
  interpStatement,
} = require("./interpreter.js");

test("interpExpression interprets multiplication with a variable", () => {
  const r = interpExpression({ x: 10 }, parseExpression("x * 2").value);
  assert(r === 20);
});
//test("interpExpression interprets addition with a variable");

test("interpProgram interprets basic declaration then assignment", () => {
  const st = interpProgram(parseProgram("let x = 10; x = 20;").value);
  assert(st.x === 20);
});

test("scoping is correct", () => {
  const p = interpProgram(
    parseProgram(
      "let x = 1; if (x === 1) {x = 2; let x = 2;} else {let x = 3;}"
    ).value
  );
  assert(p.x === 2);
});

test("while loop is correct", () => {
  const w = interpProgram(
    parseProgram("let x = 0; while (x < 5) {x = x + 1;}").value
  );
  assert((w.x = 5));
});
