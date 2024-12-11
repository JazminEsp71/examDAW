import moviesRouter from './moviesRouter.js';
import directorRouter from './directorRouter.js';

function routerApi(app){
  app.use('/directors', directorRouter);
  app.use('/movies', moviesRouter);
}

export default routerApi;
