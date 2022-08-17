const express = require("express");
require("dotenv").config();
const { graphqlHTTP } = require("express-graphql");
const port = process.env.PORT || 5000;

const app = express();

app.use(
  "/graphql",
  graphqlHTTP({
    schema: require("./schema/schema"),
  })
);

app.listen(port, console.log(`Server started on port ${port}`));
