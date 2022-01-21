export default {
    openapi: '3.0.0',
    info: {
        version: "1.0.0",
        title: "MetaCare BackEnd Task",
        description: "This provides an appropriate documentation on how to consume the api.",
        license: {
            name: "Licensed Under MIT",
            url: "https://opensource.org/licenses/MIT"
        },
        contact: {
            name: 'Elisha Dutse Bello',
            email: 'elishabello2014@gmail.com',
        },
    },
    servers: [
        {
            url: 'http://localhost:1337',
            description: 'Development server',
        },
        {
            url: 'https://metacare-starwars.herokuapp.com',
            description: 'Production server',
        }
    ],
}