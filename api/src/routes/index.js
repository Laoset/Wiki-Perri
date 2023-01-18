const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require("axios");
// const Dog = require("../models/Dog");
// const Temperament = require("../models/Temperament");
const { Dog, Temperament } = require("../db.js");
const router = Router();
const { DOGS_API_KEY } = process.env;
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//Creando funciones controladoras que luego las invocare dentro del pedido o posteo
const getApiData = async () => {
  //Me guardo lo que trae la API
  const url = await axios.get(
    `https://api.thedogapi.com/v1/breeds?api_key${DOGS_API_KEY}`
  );
  const info = url.data.map((p) => {
    return {
      id: p.id,
      name: p.name,
      life_span: p.life_span,
      height: p.height.metric,
      weight: p.weight.metric,
      image: p.image.url,
      temperament: p.temperament,
    };
  });
  return info;
};
//Me traigo TODO mi modelo de DOG e incluyo el modelo de temperamento
//Solamente el NAME de mi temperament a travez de la tabla intermedia, por ultimo se comprueba lo que me traigo por medio
//de THROUGH, es algo imperativo, siempre va.
const getDbData = async () => {
  return await Dog.findAll({
    includes: {
      model: Temperament,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
};
//Ahora toca unir mi pedido a la API como mis datos de la Bd
const getTodo = async () => {
  const info = await getApiData();
  const db = await getDbData();
  const resultadoFinal = info.concat(db);
  return resultadoFinal;
};
//Comienzo con mis request, funciona tanto como para traer todos como para QUERY params
router.get("/dogs", async (req, res) => {
  const name = req.query.name;
  let total = await getTodo();
  //PREGUNTO si existe name , osea si se hace de uso de query!
  if (name) {
    //Aca me guardo el que matchee del total de perros pero con lowercase para no problems
    let query = await total.filter((p) =>
      p.name.toLowerCase().includes(name.toLowerCase())
    );
    query.length
      ? res.status(200).send(query)
      : res.status(404).send("Error, no existe tal perro con ese nombre");
    //Si no existe ese query mando todos los dogs
  } else {
    res.status(200).send(total);
  }
});
router.get("/dogs/:idRaza", async (req, res) => {
  const { idRaza } = req.params;
  try {
    //Primero me traigo todos los perros
    const todos = await getTodo();
    //Segundo, filtro y matcheo con la raza correspondiente
    const filtrado = todos.filter((r) => r.id == idRaza);
    filtrado.length
      ? res.status(200).send(filtrado)
      : res.status(404).send("No existe tal raza de perro");
  } catch (error) {
    res.status(400).send("Error server");
  }
});
///////////////////////
router.post("/dogs", async (req, res) => {
  const { name, height, weight, life_span, image, createInDb, temperament } =
    req.body;
  const creadoDog = await Dog.create({
    name,
    height,
    weight,
    life_span,
    image,
    createInDb,
  });
  const temperamentoDog = await Temperament.findAll({
    where: { name: temperament },
  });
  //Asociar ambos (add...) significa que trae de la tabla lo que se pasa por param. METODO DE SEQUELIZE
  creadoDog.addTemperament(temperamentoDog);
  res.status(201).send("Raza creada exitosamente");
});
//////////////////////
router.get("/temperaments", async (req, res) => {
  //Me traigo info de la API
  const infoApi = await axios.get(
    `https://api.thedogapi.com/v1/breeds?api_key${DOGS_API_KEY}`
  );
  //Me guardo la info en mi DB
  const mapeadaApi = infoApi.data.map((t) => t.temperament);
  const tempera = mapeadaApi.join(",").split(", ");
  tempera.forEach((t) => {
    Temperament.findOrCreate({
      where: { name: t },
    });
  });
  const todosTemperamentos = await Temperament.findAll();
  res.status(200).send(todosTemperamentos);
});
module.exports = router;
