const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // Mediante este MODELO se va crear la raza en mi BDD
  sequelize.define(
    "dog",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      height: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
        validator: {
          notNull: true,
        },
      },
      weight: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
        validator: {
          notNull: true,
        },
      },
      life_span: {
        type: DataTypes.STRING,
      },
      image: {
        type: DataTypes.STRING,
      },
      createInDb: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: true,
      },
    },
    { timestamps: false }
  );
};
