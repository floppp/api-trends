# API-trends
Se intentará usar las menos librerías posibles dentro de lo razonable.
Los tests se ubicarán en la misma situación que los archivos que se testean con la convención *\*\*.spec.ts*. No me gusta personalmente generar otra carpeta *test* con la misma estructura *ala* JVM.

La idea es de inicio implementar de forma básica para luego ir mejorando/refactorizando:
 - usar contenedor de dependencias sencillo (global)
     - mejorar tests (no creo que use TDD siempre)

## Validación
 - Podemos usar *express-validator* o *class-validator* + *class-transformer* (usadas en NestJS) para validar, pero siguiendo el límite autoimpuesto de usar las menos librerías posibles, no se emplean.

# Paquetes
Explicación de los paquetes no tan evidentes

 - [helmet](https://helmetjs.github.io/) seguridad
 - [ts-jest](https://kulshekhar.github.io/ts-jest/) configuración ts con jest
 - [cherio](https://cheerio.js.org/) webscrapping

# Referencias
 - [porqué ts-jest](https://jestjs.io/docs/getting-started#via-ts-jest)
