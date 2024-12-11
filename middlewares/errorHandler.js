/*Dos funciones, una visualiza el error en la respuesta de json y tambien en consola(primero este) */

export function logErrors(err, req, res, next){
  console.error(err);
  next(err); //Al enviar el err entiende que es un middleware de error
}

//especifica donde se esta presentando error

export function errorHandler(err, req, res, next){
  res.status(500).json({
    message: err.message,
    stack: err.stack
  });
}
//Se utilizan para todo el proyecto, se llama en index y atrapa lo que esta pasando
