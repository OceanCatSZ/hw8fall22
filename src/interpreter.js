"use strict";

function getvalue(state, name) {
  if (name in state) {
    return state.name;
  }
  assert(false);
}

function interpExpression(state, e) {
  // TODO
  if (e.kind === "number" || e.kind === "boolean"){
    return e.value;
  }
  else if (e.kind === "variable") {
    return getvalue(state, e.name);
  }
  else if (e.kind === "operator ") {
    let v1 = interpExpression(state, e.e1)
    let v2 = interpExpression(state, e.e2)
    if (e.op === "+") {
      assert(v1.type === "number" && v2.type ==="number");
      return v1 + v2;
    }
    else if (e.op === "-") {
      assert(v1.type === "number" && v2.type ==="number");
      return v1 - v2;
    }
    else if (e.op === "*") {
      assert(v1.type === "number" && v2.type ==="number");
      return v1 * v2;
    }
    else if (e.op === "/") {
      assert(v1.type === "number" && v2.type ==="number");
      return v1/v2;
    }
    else if (e.op === "&&") {
      assert(v1.type === "boolean" && v2.type ==="boolean");
      return v1 && v2;
    }
    else if (e.op === "||") {
      assert(v1.type === "boolean" && v2.type ==="boolean");
      return v1 || v2;
    }
    else if (e.op === "<") {
      assert(v1.type === "number" && v2.type ==="number");
      return v1 < v2;
    }
    else if (e.op === ">") {
      assert(v1.type === "number" && v2.type ==="number");
      return v1 > v2;
    }
    else if (e.op === "===") {
      assert(typeof v1 === typeof v2);
      return v1 === v2;
    }
    else {
      assert(false);
    }
  }
}

function interpStatement(state, stmt) {
  // TODO
}

function interpProgram(stmts) {
  // TODO
}

// DO NOT REMOVE
module.exports = {
  interpExpression,
  interpStatement,
  interpProgram,
};
