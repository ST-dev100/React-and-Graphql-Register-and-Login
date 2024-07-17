const books = [
    {
      title: 'The Awakening',
      author: 'Kate Chopin',
    },
    {
      title: 'City of Glass',
      author: 'Paul Auster',
    },
  ];

const resolvers = {  
    Query: {
      books: () => books,
    },
    Mutation: {
        signup: async (_, { firstname,lastname,email,password,username, imageFile } ) => {
            console.log(imageFile)
            console.log("signup")
            // Implement signup logic here
            return { id: '1', username, image: 'default.jpg' };
        },
        up: async(_,{file})=>{
            console.log(file)
            // Implement file upload logic here
            return "uploaded"
        }
    }
  };

export default resolvers;