const fs = require("fs");
const config = require("../config/config.json");
const swaggerToTS = require("@manifoldco/swagger-to-ts");
const fetch = require("node-fetch");

fetch(`${config.base_url}/swagger-docs`).then((response) => {
  response.json().then((data) => {
    const output = swaggerToTS.default(data);
    fs.writeFile("./domain/domain.ts", output, (err, result) => {
      if (err) {
        console.error(err);
      }
    });
  });
});
