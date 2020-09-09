# authmiddlewarenodejs

es un middleware que gestione la tokenizacion y acceso a los endpoint mas facilmente

## instalar dependencia 
 ```
 npm i --save authmiddlewarenodejs
 ```

## formato de json aceptable para trabajar con con un solo grupo

```
{
  UrlStart:"",
  Ignore: [],
  ActiveTime:"",
  KEY_TOKEN:"",
  NameToken: "",
  EncryptionMethod: ""
}
```
# descripcion de cada objeto en el objeto


# **UrlStart:**

- en ese campo servira para establcer el endpoint que se usara para que se genere el token para el acceso
  ## **ejemplo**
  ```
  UrlStart: "session"
  ```
 # **Ignore:**
 este servira para que la tokenizacion de los endpoint no afecta a las rutas que se le colocara 

 ## **ejemplo:**
 ```
 Ignore[
   "api/clientall",
   "public/cliente/?"
 ]
 ```
 ## **nota:**
 - vease el segundo ejemplo que tiene el simibolo **?** ese simbolo significa que puede aparecer cualquier valor en en esa posicion eso es usando cuando es un parametro get enviado como es variable por tal forma que se coloca ese simbolo

 - este propiedad es opcional

 # **ActiveTime:**
 para establecer la el tiempo que durara el token activo, en los cuales puede establecerse de la siguiente manera

  - 1m (1 minutos)
  - 1h (1 hora)
  - etc
  
  ## **Nota:**
  - tambien se puede  aplicar mediante numeros u operaciones expresado en milisegundos
  
  - tambien ese valor es opcional

  ## **ejemplo**
   ```
  ActiveTime: "15m"
  
  o
  
  ActiveTime: 2000
  
  o
  
  ActiveTime: 60* 60 *60 * 24
  ```

# **KEY_TOKEN:**

 aqui ira la llave que establecio en documento .env o simplemente colocarla aqui mismo

**nota:**
- debe de generar un archivo en la raiz del programa llamado **.env** y colocar la variable de entorno para establecer la llave para generacion de los token

- tambien se puede colocar cualquier nombre en la variable entorno para guardar el token
## **ejemplo**

```
KEY_TOKEN: process.env.KEY_TOKEN
o
KEY_TOKEN:"LLAVE PARA GENERA TOKEN"
```
# **NameToken:**
este parametros servira para establecer con que nombre se colocara como paramtro para que lo establezcan en los encabezados a la hora de enviar una peticion el servidor

## **ejemplo**
```
NameToken: "access-token"
```

**nota:**
- en la hora de recibir una el token mediante el header al servidor la palabra que tiene que seguir siguiente formato
  ```
  bearer [Token]
  ```
  
# **EncryptionMethod**
este servira para establecer el metodo de encriptacion que tenga el token 

## **ejmplo:**
```
EncryptionMethod: "HS512"
```
**nota:**
- este propiedad es opcional

## **tabla de metodos aceptados**
|METODOS|
-----
|HS256|
|HS384|
|HS512|
|RS256|
|RS384|
|RS512|
|ES256|
|ES384|
|ES512|
|PS256|
|PS384|
|PS512|

## Ejemplo
```javascript
1 const express= require('express');
2 const auth = require('authmiddlewarenodejs')
3 require("dotenv").config()
4
5 const app = express();
6
7 const AUTHOptions = {
8                UrlStart:"api/session",
9                Ignore: [
10                  "api/public"
11                ],
12                ActiveTime:"15m",
13                KEY_TOKEN:process.env.KEY_TOKEN,
14                NameToken: "access-token",
15                EncryptionMethod: "HS256"
16            }
17 app.use(auth(AUTHOptions))
18 app.get('/api/sesion',(req,res)=>{
19    res.send(req.GenerateToken({id:30}))
20 })
21 app.get('/api/public',(req,res)=>{
22    res.send("este endpoint no es afectado por el token")
23 })
24 app.listen(3000, () => {console.log(`http://localhost:3000`)})
```

**vease:** que en la linea 19 se usa un funcion llamada **GenerateToken** es la funcion que genera el token para utilizar en el sistema en el cual se tiene que colocar parametros en un objeto para utilizar esos objetos para convertir esos datos en token 

# GRUPOS EN DE TOKENIZACION MEDIANTE ENDPOINT

se puede aplicar a un grupo de endopoint una tipo de token en especial para que tenga difertes acceso y con eso con la propiedad **Group**

## **nota**:

-  la propiedad Gruop aplica los mismos parametros que si solo una se usara

### **ejmplo**

```
{
  Group:[
    {
      UrlGruop:"",
      UrlStart:"",
      Ignore: [],
      ActiveTime:"",
      KEY_TOKEN:"",
      NameToken: "",
      EncryptionMethod: ""
    },
     {
      UrlGruop:"",
      UrlStart:"",
      Ignore: [],
      ActiveTime:"",
      KEY_TOKEN:"",
      NameToken: "",
      EncryptionMethod: ""
    }
  ]
}
```

# **Nota**
- vease que ahi se coloco una  propied conocida como **UrlGruop** ese servira para separa los grupos de las apis 

- puede colocar tantos grupos quiera 

```
{
  Group:[
    {
      UrlGruop:"/contabilidad",
      UrlStart:"/contabilidad/login",
      Ignore: [
        "contabilidad/public"
      ],
      ActiveTime:"15m",
      KEY_TOKEN:process.env.TOKEN_CONTA,
      NameToken: "x-token-access-conta",
      EncryptionMethod: "HS256"
    },
     {
      UrlGruop:"/finanzas",
      UrlStart:"/fianzaz/login",
      ActiveTime:60*60*60*24,
      KEY_TOKEN:process.env.TOKEN_FINA,
      NameToken: "x-token-access-fina",
    }
  ]
}
```
veases en la propiedad **UrlGruop** que todas las rutas que empiezen con esos nombre se aplicara las las propiedades de cada elemento del grupo


## **ejemplo**


## License


[MIT](LICENSE)