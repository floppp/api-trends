# API-trends
Para lanzar la aplicación en modo dev, no uso directamente un script definido en *package.json*, sino que lanzo con =npx nodemon src/main_feed.ts=.

Se intentará usar las menos librerías posibles dentro de lo razonable.

La idea inicial era implementar de forma básica para luego ir mejorando/refactorizando, pero he ido añadiendo cosas extras a medida que he ido viendo qué/cómo hacer, por lo que la implementación se va a ir mucho de las dos horas que quería poner.
 - usar contenedor de dependencias sencillo (global)
 - mejorar tests ()

El archivo .env se sube al repositorio aunque obviamente no es una buena práctica, y más cuando el repositorio es público. Pero no hay nada que esconder y quiero que sea ejecutable en otros entornos/máquinas.

Se usa docker para lanzar la instancia de mongo. Directamente el comando, no *compose*.

En el código de conexión a Mongo reuso código que ya tenía de hace varios años. Posiblemente haya alguna forma de manejar la conexión (no creo que sea necesario, al menos no ahora, usar una clase para encapsularla).

## Testing
No creo uso TDD, al menos no siempre. os tests se ubicarán en la misma situación que los archivos que se testean con la convención *\*\*.spec.ts*. No me gusta personalmente generar otra carpeta *test* con la misma estructura *ala* JVM.

## Validación
 - Podemos usar *express-validator* o *class-validator* + *class-transformer* (usadas en NestJS) para validar, pero siguiendo el límite autoimpuesto de usar las menos librerías posibles, no se emplean.

# Paquetes
Explicación de los paquetes no tan evidentes

 - [helmet](https://helmetjs.github.io/) seguridad
 - [ts-jest](https://kulshekhar.github.io/ts-jest/) configuración ts con jest
 - [cherio](https://cheerio.js.org/) webscrapping
 - [dotenv](https://github.com/motdotla/dotenv) para manejar .env
 - [fast-check](https://github.com/dubzzz/fast-check) para hacer *property based testing*. Me parece algo muy interesante y, al menos por lo que yo veo/comento con compañeros/ex-compañeros, algo demasiado poco usado.
 - [uuid]() para generación de ids del modelo *feed*.

# Referencias
 - [porqué ts-jest](https://jestjs.io/docs/getting-started#via-ts-jest)
