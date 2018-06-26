# CRUD

## Ejemplo

Usar sequelize para manipular modelos.

Pasos:

1. Instalar sequelize `npm install sequelize`.
2. Instalar sqlite3 `npm install sqlite3`.
3. Abrir consola `node`.
4. Copy/paste de partes del código index.js.

Mas información:

* http://docs.sequelizejs.com/
* https://www.sqlite.org/index.html
* http://docs.sequelizejs.com/manual/tutorial/models-definition.html#data-types
* https://www.pluralsight.com/courses/code-school-try-sql

Para los curiosos:

* https://stackoverflow.com/questions/588004/is-floating-point-math-broken

## Ejercicio

1. Agrega un atributo score al modelo película. Acuérdate de sincronizarlo.
2. Lee el archivo movies.csv y agrega todas las películas. Deberían haber 6.
3. Modifica el título de Avengers a 'Avengers 2'.
4. Imprime los nombres de las películas que tienen un score de mas de 4.5.
