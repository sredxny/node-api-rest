//=================
// Puerto
//=================
process.env.PORT = process.env.PORT || 8080;

//=================
// Entorno
//=================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//=================
// Vencimiento del token
//=================
//60 secs
//60 min
//24 hrs
//30 dias

process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;

//=================
// Seed de auteticacion
//=================
process.env.SEED = process.env.SEED || 'este-es-el-secret';