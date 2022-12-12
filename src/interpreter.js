"use strict";

const assert = require("assert");

function validityOfNames(name) {
  function isNumber(num) {
    return typeof Number(num) === "number" && !isNaN(num);
  }
  function isLetter(c) {
    return c.toUpperCase() !== c.toLowerCase();
  }
  function isSpecial(s) {
    return s === "$" || s === "_";
  }
  for (let i = 0; i < name.length; ++i) {
    let cur = name[i];
    if (i === 0) {
      if (isNumber(cur)) {
        return false;
      }
    }
    if (!isNumber(cur) && !isLetter(cur) && !isSpecial(cur)) {
      return false;
    }
  }
  return true;
}

function findVariableInParentState(state, name) {
  if (name in state) {
    return state;
  } else {
    if ("outer-scope" in state) {
      return findVariableInParentState(state["outer-scope"], name);
    } else {
      throw new Error("please initialize this variable first");
    }
  }
}

function getvalue(state, name) {
  state = findVariableInParentState(state, name);
  return state[name];
}

function interpExpression(state, e) {
  // TODO
  if (e.kind === "number") {
    if (Math.floor(e.value) !== e.value) {
      throw new Error("number is not an integer");
    }
    return e.value;
  } else if (e.kind === "boolean") {
    return e.value;
  } else if (e.kind === "variable") {
    assert(validityOfNames(e.name) === true, "name is invalid");
    return getvalue(state, e.name);
  } else if (e.kind === "operator") {
    let v1 = interpExpression(state, e.e1);
    let v2 = interpExpression(state, e.e2);
    if (e.op === "+") {
      assert(
        typeof v1 === "number" && typeof v2 === "number",
        "operation + can only happen between numbers."
      );
      return v1 + v2;
    } else if (e.op === "-") {
      assert(
        typeof v1 === "number" && typeof v2 === "number",
        "operation - can only happen between numbers."
      );
      return v1 - v2;
    } else if (e.op === "*") {
      assert(
        typeof v1 === "number" && typeof v2 === "number",
        "operation * can only happen between numbers."
      );
      return v1 * v2;
    } else if (e.op === "/") {
      assert(
        typeof v1 === "number" && typeof v2 === "number",
        "operation / can only happen between numbers."
      );
      return v1 / v2;
    } else if (e.op === "&&") {
      assert(
        typeof v1 === "boolean" && typeof v2 === "boolean",
        "operation && can only happen between booleans"
      );
      return v1 && v2;
    } else if (e.op === "||") {
      assert(
        typeof v1 === "boolean" && typeof v2 === "boolean",
        "operation || can only happen between booleans"
      );
      return v1 || v2;
    } else if (e.op === "<") {
      assert(
        typeof v1 === "number" && typeof v2 === "number",
        "operation < can only happen between numbers"
      );
      return v1 < v2;
    } else if (e.op === ">") {
      assert(
        typeof v1 === "number" && typeof v2 === "number",
        "operation < can only happen between numbers"
      );
      return v1 > v2;
    } else if (e.op === "===") {
      return v1 === v2;
    } else {
      throw new Error("Unidentified operand.");
    }
  }
}

function setValue(state, name, value) {
  state[name] = value;
}

function assignValue(state, name, value) {
  if (name in state) {
    state[name] = value;
    return;
  } else {
    if ("outer-scope" in state) {
      return assignValue(state["outer-scope"], name, value);
    } else {
      throw new Error("please initialize this variable first");
    }
  }
}

function interpWhile(state, test, body) {
  let tempState = { "outer-scope": state };
  let condition = interpExpression(state, test);
  //assert(typeof condition === "boolean", "condition should be boolean");
  if (condition === false) {
    return state;
  } else {
    body.forEach((s) => interpStatement(tempState, s));
    return interpWhile(state, test, body);
  }
}

function interpStatement(state, stmt) {
  // TODO
  if (stmt.kind === "let") {
    assert(
      typeof stmt.name === "string",
      "variable's name should be a string."
    );
    assert(validityOfNames(stmt.name) === true, "name is invalid");
    if (stmt.name in state) {
      throw new Error("variable already exist.");
    }
    let value = interpExpression(state, stmt.expression);
    setValue(state, stmt.name, value);
    return state;
  } else if (stmt.kind === "assignment") {
    assert(typeof stmt.name === "string", "variable's name should be a string");
    assert(validityOfNames(stmt.name) === true, "name is invalid");
    //let tempState = findVariableInParentState(state, stmt.name);
    let value = interpExpression(state, stmt.expression);
    assignValue(state, stmt.name, value);
    return state;
  } else if (stmt.kind === "if") {
    let condition = interpExpression(state, stmt.test);
    //assert(typeof condition === "boolean", "condition should be boolean");
    let ifState = { "outer-scope": state };
    if (condition === true) {
      let stmtArr = stmt.truePart;
      stmtArr.forEach((s) => interpStatement(ifState, s));
      return state;
    } else {
      stmtArr = stmt.falsePart;
      stmtArr.forEach((s) => interpStatement(ifState, s));
      return state;
    }
  } else if (stmt.kind === "while") {
    let test = stmt.test;
    let body = stmt.body;
    return interpWhile(state, test, body);
  } else if (stmt.kind === "print") {
    console.log(interpExpression(state, stmt.expression));
    return state;
  } else {
    throw new Error("statement invalid.");
  }
}

function interpProgram(stmts) {
  // TODO
  let state = {};
  stmts.forEach((s) => interpStatement(state, s));
  return state;
}

// DO NOT REMOVE
module.exports = {
  interpExpression,
  interpStatement,
  interpProgram,
};
