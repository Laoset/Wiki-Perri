const { Router } = require("express");
const axios = require("axios");
/////Me traigo los modelos
const { Dog, Temperament } = require("../db.js");
const { where } = require("sequelize");
const router = Router();
//Mi KEY provista por la API al registarme
const { DOGS_API_KEY } = process.env;

//Funcion que al EJECUTARSE me trae los PERROS con su correspondientes PROPIEDADES
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

///////Funcion que me trae TODO mi modelo de DOG e incluyo el modelo de temperamento, solo el ATTRIBUTE NAME de THROUGH, es algo imperativo, siempre va.
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
  //La modifico una vez unida con el Temperamento para luego mapearla en busca de cada DOG,mapeo el TEMPERAMENTO ya que me devuelve
  let info = await dbInfo.map((dog) => {
    return {
      id: dog.id,
      name: dog.name,
      weight: dog.weight,
      life_span: dog.life_span,
      image: dog.image,
      createInDb: dog.createInDb,
      height: dog.height,
      temperament: dog.temperaments.map((t) => t.name),
    };
  });
  return info;
};
//Ahora toca unir mi FUNCION que trae data de API y la FUNCION que trae de la Bd
const getTodo = async () => {
  const apiInfo = await getApiData();
  //Este se encarga de agregarle PESO,ALTURA y TEMPS a los perros que poseen el NaN o no tienen completo
  const revision = apiInfo.map((dog) => {
    if (dog.name == "Olde English Bulldogge") dog.weight = "22 - 30";
    if (dog.name == "Smooth Fox Terrier") dog.weight = "6 - 8";
    if (dog.name == "African Hunting Dog") dog.height = "60 - 76";
    if (dog.name == "Pekingese") dog.weight = "6 - 8";
    if (dog.id == 261) dog.temperament = "Loyal, Trainable, Gentle";
    if (dog.id == 211) dog.temperament = "Loyal, Intelligent, Charming";
    if (dog.id == 196) dog.temperament = "Intelligent, Friendly, Loyal";
    if (dog.id == 197) dog.temperament = "Intelligent, Friendly, Loyal";
    return dog;
  });
  const dbInfo = await getDbData();
  return [...dbInfo, ...revision];
};
//Comienzo con mis request, funciona tanto como para traer todos como para QUERY params, luego utilizo en el SEARCHBAR
router.get("/dogs", async (req, res) => {
  const name = req.query.name;
  let total = await getTodo();
  if (name) {
    let query = total.filter((p) =>
      p.name.toLowerCase().includes(name.toLowerCase())
    );
    query.length
      ? res.status(200).send(query)
      : res.status(404).send("Error, no existe tal perro con ese nombre");
  } else {
    res.status(200).send(total);
  }
});

router.get(
  "/dogs/:idRaza",

  async (req, res) => {
    try {
      const { idRaza } = req.params;
      //Primero me traigo todos los perros
      const todos = await getTodo();
      //Segundo, filtro y matcheo con la raza correspondiente
      const filtrado = todos.filter((r) => r.id == idRaza);
      filtrado.length
        ? res.status(200).send(filtrado)
        : res.status(404).send("No existe tal raza de perro con ese ID");
    } catch (error) {
      res.status(500).send("Error server");
    }
  }
);
///DELETE DOG
router.delete(
  "/deleteDog/:id",

  async (req, res) => {
    try {
      //Hago uso del metodo DESTROY de sequelize para borrarlo de mi BDD
      await Dog.destroy({
        //Donde el {id} es lo que tomo por params y elimino de bdd
        where: {
          id: req.params.id,
        },
      });
      res.status(200).send("Eliminado correctamente");
    } catch (error) {
      res.status(400).send("Id incorrecto");
    }
  }
);
//UPDATE DOG
router.put(
  "/dogs/:id",

  async (req, res) => {
    try {
      //Hago uso del metodo UPDATE de sequelize para actualizarlo
      await Dog.update(
        {
          name: req.body.name,
          weight: req.body.weight,
          height: req.body.height,
        },
        {
          //Donde el {id} es lo que tomo por params y modifico las propiedades anteriores
          where: {
            id: req.params.id,
          },
        }
      );
      res.status(200).send("Modificado correctamente");
    } catch (error) {
      res.status(400).send("Id incorrecto");
    }
  }
);
///// POST DOG
router.post(
  "/dogs",

  async (req, res) => {
    try {
      //lo que necesito por body (formulario frontEnd)
      const { name, weight, life_span, image, height, temperaments } = req.body;
      //todo lo que tenga el modelo TEMPERAMENT donde el name sea temperaments(body)
      const newTemperament = await Temperament.findAll({
        where: { name: temperaments },
      });
      //guardo lo que se crea en mi MODELO de perro en una constante
      const creadoDog = await Dog.create({
        name,
        weight,
        life_span,
        image,
        height,
      });
      //a la informacion anterior le hago el metodo ADD que lo asocia con el modelo TEMP y le pasa la variable que tiene la info del TEMPERAMENTO, LO UNE
      await creadoDog.addTemperament(newTemperament);
      res.status(200).send(creadoDog);
    } catch (error) {
      res.status(400).send("No se pudo crear el perro, verifique datos");
    }
  }
);
//Traer temperamentos
router.get(
  "/temperaments",

  async (req, res) => {
    //Me traigo TODA la info de la API
    let infoApi = await axios.get(
      `https://api.thedogapi.com/v1/breeds?api_key${DOGS_API_KEY}`
    );
    //Mapeo la INFO que pedi anteriormente en busca de la PROPIEDAD TEMPERAMENT y la guardo
    let mapeadaApi = infoApi.data.map((t) => t.temperament); //A esa informacion le aplico metodos para poder manipularlo mejor
    let tempera = mapeadaApi.join(",").split(",");
    tempera.forEach(async (t) => {
      await Temperament.findOrCreate({
        where: { name: t },
      });
    });
    let todosTemperamentos = await Temperament.findAll();
    res.status(200).send(todosTemperamentos);
  }
);
//WELCOME
router.get("/", async (req, res) => {
  res.status(200).send("WELCOME");
});

module.exports = router;
