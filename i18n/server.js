const express = require("express");
const app = express();
const i18next = require ('i18next');
const backend = require ('i18next-fs-backend');
const middleware = require ('i18next-http-middleware');

i18next.use(backend).use(middleware.LanguageDetector)
.init({
    fallbackLng: 'en',
    backend:{
        loadPath: './src/locales/{{lng}}/translation.json'
    }
})

app.use(middleware.handle(i18next));
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));   

app.get('/', (req,res) => {
    res.send({message:req.t('welcome')})
})
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});