# auth

es un middleware que gestione la tokenizacion y acceso a los endpoint mas facilmente

## instalar dependencia 
 ```
 npm i --sav authmiddlewarenodejs
 ```

## modulos externos que necesita
- jsonwebtoken
- dotenv

## formato de json aceptable para trabajar con auth
```json
{
  UrlStart:"",
  ActiveTime:"",
  KEY_TOKEN:"",
}
```
## descripcion de cada objeto en el objeto
- UrlStart: en ese campo servira para establcer el endpoint que se usara para que se genere el token para el acceso
  - ### ejemplo
  ```
  UrlStart: "session"
  ```
- ActiveTime: para establecer la el tiempo que durara el token activo, en los cuales puede establecerse de la siguiente manera

  - 1m (1 minutos)
  - 1h (1 hora)
  - etc

  - ## ejemplo
   ```
  ActiveTime: "15m"
  ```
- KEY_TOKEN : aqui ira la llave que establecio en documento .env o simplemente colocarla aqui mismo

**nota:** debe de generar un archivo en la raiz del programa llamado **.env** y colocar la variable de entorno para estbler la llave para generacion de los token

```
KEY_TOKEN:[cadena]
```

  - ## ejemplo
  ```
  KEY_TOKEN: process.env.KEY_TOKEN
  o
  KEY_TOKEN: "LLAVE PARA GENERA TOKEN"
  ```

## Ejemplo
```javascript
1 const express= require('express');
2 const auth = require('auth'
3 require("dotenv").config()
4
5 const app = express();
6 const corsOptions = { origin: '*' }
7
8 const AUTHOptions = { UrlStart:"/api/sesion",
9                        ActiveTime:"15m",
10                        KEY_TOKEN:process.env.KEY_TOKEN
11                        }
12 app.use(auth(AUTHOptions))
13 app.post('api/sesion'(req,res)=>{
14    console.log(req.GenerateToken({id:30}))
15 })
16 app.listen(3000, () => {console.log(`http://localhost:3000`)})
```

**vease:** que en la linea 14 se usa un funcion llamada **GenerateToken** es la funcion que genera el token para utilizar en el sistema en el cual se tiene que colocar parametros en un objeto para utilizar esos objetos para convertir esos datos en token 

## License

[MIT](LICENSE)