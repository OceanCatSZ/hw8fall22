const { parseProgram } = require("../include/parser");
const { interpProgram } = require("./interpreter");

const program = `
  let n = 20;

  let a = 1;
  let b = 1; 

  while (n > 0) {
    let c = b;

    b = b + a;

    a = c;

    n = n - 1;
  }

  print(b);
`;

const result = parseProgram(program);

if (result.ok) {
  const state = interpProgram(result.value);
  console.log(`Program terminated with state: ${state}`);
} else {
  console.log("Parsing Error: " + result.message);
}
