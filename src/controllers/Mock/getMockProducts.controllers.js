import { faker } from "@faker-js/faker"


function randomCategory() {
    const categories = ["Catetoria 1", "Catetoria 2", "Catetoria 3", "Catetoria 4", "Catetoria 5"];
    const randomIndex = Math.floor(Math.random() * categories.length);
    return categories[randomIndex];
};

function randomStock(minStock, maxStock) {
    return Math.floor(Math.random() * (maxStock - minStock + 1)) + minStock;
}

const modelProduct = () => {
    return {
        _id: faker.database.mongodbObjectId(),
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price(),
        stock: randomStock(1, 1000),
        category: randomCategory(),
        status: faker.datatype.boolean(),
        code: faker.commerce.isbn()
        };
    };

const createRandomProduct = (cantProducts) => {
    const users = [];
    for(let i = 0; i< cantProducts; i++) {
        users.push(modelProduct());
    };
    return users;
};

export const getMockProducts = (req,res) =>{
    res.status(200).send(createRandomProduct(100));
} 