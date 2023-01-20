const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require("axios");
// const Dog = require("../models/Dog");
// const Temperament = require("../models/Temperament");
const { Dog, Temperament } = require("../db.js");
const { where } = require("sequelize");
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
  let info = await url.data.map((p) => {
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
  let dbInfo = await Dog.findAll({
    include: [
      {
        model: Temperament,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    ],
  });
  dbInfo = dbInfo.map((dog) => {
    return {
      id: dog.id,
      name: dog.name,
      weight: dog.weight,
      life_span: dog.life_span,
      image: dog.image,
      createInDb: dog.createInDb,
      height: dog.height,
      temperament: dog.temperaments.map((temperament) => temperament.name),
    };
  });

  console.log(dbInfo);
  return dbInfo;
};
//Ahora toca unir mi pedido a la API como mis datos de la Bd
const getTodo = async () => {
  const apiInfo = await getApiData();
  const dbInfo = await getDbData();
  const resultadoFinal = [...dbInfo, ...apiInfo];
  return resultadoFinal;
};
//Comienzo con mis request, funciona tanto como para traer todos como para QUERY params
router.get("/dogs", async (req, res) => {
  const name = req.query.name;
  let total = await getTodo();
  //PREGUNTO si existe name , osea si se hace de uso de query!
  if (name) {
    //Aca me guardo el que matchee del total de perros pero con lowercase para no problems
    let query = total.filter((p) =>
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
  try {
    const { idRaza } = req.params;
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
/////////////////////// cambies
router.post("/dogs", async (req, res) => {
  try {
    const { name, weight, life_span, image, height, temperaments } = req.body;
    const newTemperament = await Temperament.findAll({
      where: { name: temperaments },
    });
    if (!newTemperament) {
      newTemperament = await Temperament.create({ name: temperaments });
    }
    const creadoDog = await Dog.create({
      name,
      weight,
      life_span,
      image,
      height,
    });
    // //Mapear los temperamentos
    // const temperamentoDog = await Temperament.findAll({
    //   where: { name: temperament },
    // });
    await creadoDog.addTemperament(newTemperament);
    res.status(201).send(creadoDog);
  } catch (error) {
    res.status(500).send(error);
  }
});
//Asociar ambos (add...) significa que trae de la tabla lo que se pasa por param. METODO DE SEQUELIZE

//////////////////////
router.get("/temperaments", async (req, res) => {
  //Me traigo info de la API
  const infoApi = await axios.get(
    `https://api.thedogapi.com/v1/breeds?api_key${DOGS_API_KEY}`
  );
  //Me guardo la info en mi DB
  let mapeadaApi = infoApi.data.map((t) => t.temperament);
  const tempera = mapeadaApi.join(",").split(",");
  tempera.forEach(async (t) => {
    await Temperament.findOrCreate({
      where: { name: t },
    });
  });
  const todosTemperamentos = await Temperament.findAll();
  res.status(200).send(todosTemperamentos);
});
module.exports = router;
