const { test: setup, faker } = require('../support/env.js');
const fs = require("fs");
const path = require('node:path');

setup('eHelper intial setup (authentication)', async ({ request }, testInfo ) => {
    for (let index = 0; index < testInfo.config.workers; index++) {
        const authFile = `.auth/user${index}.json`;
        console.log('Index is: ', index);
        
        const user = {
            email: faker.internet.email(), 
            password: faker.internet.password({ length: 8 }), 
            userName: faker.string.alphanumeric({ length: { min: 4, max: 12 } })
        };

        // Sign up user
        const responseSignUp = await request.post(testInfo.project.use.config.baseUrl + '/api/users/signup', {
            data: { 
                email: user.email,
                password: user.password,
                userName: user.userName
            }
        });

        // Login user
        const responseLogin = await request.post(testInfo.project.use.config.baseUrl + '/api/users/login', {
            data: { 
                email: user.email,
                password: user.password
            }
        });

        // Save user auth data to auth file
        const requestContext = await request.storageState({ path: authFile });
        console.log(`Context for index ${index} is:\n`, requestContext);

        // Save user to person file
        const userFile = path.resolve(`.auth/person${index}.json`);
        fs.writeFileSync(userFile, JSON.stringify(user, null, 2));
        console.log(`User ${index} is:\n`, user);
    }
});
