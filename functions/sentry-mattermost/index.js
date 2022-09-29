const { serve } = require("micri");

const PORT = process.env.PORT || 3000;

const func = require("./function");

const server = serve(func);

server.listen(PORT, () => {
  console.log(`BOT server started on port ${PORT}`);
});
