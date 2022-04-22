const { serve } = require("micri");
const pkg = require("./package.json");

const PORT = process.env.PORT || 3000;

const func = require("./function");

const server = serve(func);

server.listen(PORT, () => {
  console.log(`${pkg.name} server started on port ${PORT}`);
});
