//Mongoose Schema for Projects
const Project = require("../models/Project");
const Client = require("../models/Client");

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLEnumType,
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
        return Client.find();
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

//Mutation Type Definition

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addClient: {
      type: Clienttype,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        phone: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        const client = new Client({
          name: args.name,
          email: args.email,
          phone: args.phone,
        });
        return client.save();
      },
    },
    deleteClient: {
      type: Clienttype,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return Client.findByIdAndDelete(args.id);
      },
    },
    addProject: {
      type: ProjectType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLNonNull(GraphQLString) },
        status: {
          type: GraphQLNonNull(
            new GraphQLEnumType({
              name: "ProjectStatus",
              values: {
                new: { value: "Not Started" },
                progress: { value: "In Progress" },
                complete: { value: "Completed" },
              },
            })
          ),
          defaultValue: "Not Started",
        },
        clientId: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        const project = new Project({
          name: args.name,
          description: args.description,
          status: args.status,
          clientId: args.clientId,
        });
        return project.save();
      },
    },
    deleteProject: {
      type: ProjectType,
      args: { id: { type: GraphQLNonNull(GraphQLID) } },
      resolve(parent, args) {
        return Project.findByIdAndDelete(args.id);
      },
    },
    updateClient: {
      type: Clienttype,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        phone: { type: GraphQLString },
      },
      resolve(parent, args) {
        return Client.findByIdAndUpdate(args.id, {
          name: args.name,
          email: args.email,
          phone: args.phone,
        });
      },
    },
    updateProject: {
      type: ProjectType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        status: {
          type: new GraphQLEnumType({
            name: "ProjectStatusUpdate",
            values: {
              new: { value: "Not Started" },
              progress: { value: "In Progress" },
              complete: { value: "Completed" },
            },
          }),
          defaultValue: "Not Started",
        },
      },
      resolve(parent, args) {
        return Project.findByIdAndUpdate(args.id, {
          name: args.name,
          description: args.description,
          status: args.status,
        });
      },
    },
  },
});

module.exports = new GraphQLSchema({ query: RootQuery, mutation: Mutation }); //Export as a schema object
