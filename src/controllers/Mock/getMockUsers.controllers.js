import { faker } from "@faker-js/faker"

function randomRole() {
    const roles = ["user", "user", "user", "user", "admin"];
    const randomIndex = Math.floor(Math.random() * roles.length);
    return roles[randomIndex];
};

function randomAge(minAge, maxAge) {
    return Math.floor(Math.random() * (maxAge - minAge + 1)) + minAge;
}


const modelUser = () => {
    
    return {
        _id: faker.database.mongodbObjectId(),
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        age: randomAge(18, 110),
        cart: faker.database.mongodbObjectId(),
        rol: randomRole()
        };
    };

const createRandomUser = (cantUsers) => {
    const users = [];
    for(let i = 0; i< cantUsers; i++) {
        users.push(modelUser());
    };
    return users;
};

console.log(createRandomUser(10));
