# Sample Queries and mutations for the GraphQL API

 <!-- {
   projects {
     id,
     name,
     status,
     client {
       id,
       name 
     }
   }
 }

 {
   project(id: "62fd879c1d9e233100875a85") {
     id,
     client {
       name
     }
   }
 }

 {
   clients {
     name,
     id
   }
 }

 mutation {
   addClient(name: "Paul Rudd", email: "antmandwale@email.com", phone: "54445-455-5555") {
     id,
     name,
     email,
     phone
   }
 }


 mutation {
   deleteClient(id:"62fd816c45ed4f9d74d35424") {
     name
   }
 }


 mutation {
   addProject(name: "Avengers Infinity War", description: "Best of the franchise", status: new, clientId: "62fd822145ed4f9d74d35426") {
     id,
     name,
     description,
     status,
     client {
       name
     }
   }
 }

 mutation {
   deleteProject(id:"62fd874b1d9e233100875a7f") {
     name
   }
 }


 mutation {
   updateClient(id :"62fd822145ed4f9d74d35426", name: "Paul Rudd", email: "antman@marvel.com", phone: "54445-455-5555") {
     id,
     name,
     email,
     phone
   }
 }


mutation {
  updateProject(id :"62fd88471d9e233100875a8a", name: "Avenger: Infinity War") {
    id,
    name,
    description,
    status
  }
} -->
