import express, { json } from 'express';
import { setupDB } from './config/db.config.js';
import usuarioRoutes from './api/routes/usuario.routes.js';
import figuraRoutes from './api/routes/figura.routes.js';
import maniobraRoutes from './api/routes/maniobra.routes.js';

const app = express();
const port = 3000;

app.use(json());
app.use('/api/usuarios', usuarioRoutes); 
app.use('/api/figuras', figuraRoutes);
app.use('/api/maniobras', maniobraRoutes);

app.get('/', (req, res) => {
  console.log(req.params);
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`API en la URL http://localhost:${port}`);
  setupDB();
});
