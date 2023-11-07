export const generateUserErrorInfo = (user) => {
    return `Una o mas propiedades fueron incompletas o invalidas.
    Lista de propiedades requeridas:
    * firts_name: necesita ser un String, se recibio ${user.first_name}
    * last_name: necesita ser un String, se recibio ${user.last_name}
    * email: necesita ser un String, se recibio ${user.email}
    * password: necesita ser un String, se recibio ${user.password}
    * age: necesita ser un String, se recibio ${user.age}
    * rol: necesita ser un String, se recibio ${user.rol}`
};

export const generateProductErrorInfo = (product) => {
    return `Una o mas propiedades fueron incompletas o invalidas.
    Lista de propiedades requeridas:
    * title: necesita ser un String, se recibio ${product.title}
    * description: necesita ser un String, se recibio ${product.description}
    * price: necesita ser un Number, se recibio ${product.price}
    * stock: necesita ser un Number, se recibio ${product.stock}
    * category: necesita ser un String, se recibio ${product.category}
    * status: necesita ser un Boolena, se recibio ${product.status}
    * code: necesita ser un String, se recibio ${product.code}`
};

