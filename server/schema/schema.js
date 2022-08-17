//Mongoose Schema for Projects
const Project = require("../models/Project");
const Client = require("../models/Client");

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
} = require("graphql");

// Project Type Definition

const ProjectType = new GraphQLObjectType({
  name: "Project",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
    client: {
      type: Clienttype,
      resolve(parent, args) {
        return Client.findById(parent.clientId);
      },
    },
  }),
});

//Client Type Definition

const Clienttype = new GraphQLObjectType({
  name: "Client",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    project: {
      type: ProjectType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Project.findById(args.id);
      },
    },
    projects: {
      type: new GraphQLList(ProjectType),
      resolve(parent, args) {
        return Project.find();
      },
    },
    clients: {
      type: new GraphQLList(Clienttype),
      resolve(parent, args) {
        return Client;
      },
    },
    client: {
      //fetches a client by id with Clienttype as the schema
      type: Clienttype,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Client(args.id);
      },
    },
  },
});

module.exports = new GraphQLSchema({ query: RootQuery }); //Export as a schema object
