# Callbacks ORM

## Ejemplo

Usar sequelize para ejecutar código después de que se actualice cada registro

Pasos:

1. Correr `npm install`.
2. Correr `node_modules/.bin/sequelize init`.
3. Cambiar credenciales en config/config.json.
4. Correr `node_modules/.bin/sequelize db:create`.
5. Correr `node_modules/.bin/sequelize model:generate --name movie --attributes name:string`.
6. Correr `node_modules/.bin/sequelize db:migrate`.
7. Correr `node_modules/.bin/sequelize db:migrate:undo`.
8. Correr `node_modules/.bin/sequelize db:migrate` otra vez.
9. Correr `node_modules/.bin/sequelize migration:create --name add_score_to_movies`.
10. Agregar un atributo score a la tabla de movies (addColumn, removeColumn).
11. Correr `node_modules/.bin/sequelize db:migrate`.

## Referencia:

* http://docs.sequelizejs.com/manual/tutorial/migrations.html
* http://sequelize.readthedocs.io/en/latest/docs/migrations/ (Doc vieja, pero tiene la definición de addColumn, removeColumn)
