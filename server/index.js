const express = require("express");
require("dotenv").config();
const { graphqlHTTP } = require("express-graphql");
const colors = require("colors");
const connectDB = require("./config/db");
const cors = require("cors");

const port = process.env.PORT || 5000;
const app = express();

connectDB();
app.use(cors());
app.use(
  "/graphql",
  graphqlHTTP({
    schema: require("./schema/schema"),
    graphiql: process.env.NODE_ENV === "development",
  })
);

app.listen(port, console.log(`Server started on port ${port}`));
