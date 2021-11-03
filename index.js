//const fs = require("fs");
const fsP = require("fs").promises;
const marked = require("marked");
const  axios  =  require ( 'axios' ).default;

// lee el continido del archivo
const leerArchivoP = (ruta) => {
    return fsP.readFile(ruta, {encoding: "utf-8"})
   
    
}
//validate = false
//tomamos el contenido del archivo que lo pasamos (array)
//para Valiate = false
const extraerLinks = (contenido)=>{
    let links = [];
  
  const renderer = new marked.Renderer();

  renderer.link = (href, title, text) => {
    links.push({
      href: href,
      text: text,
      //file: file,
    });
  }
  marked(contenido, {
    renderer: renderer 
  });
  if (links.length === 0){
    console.log("no se encontro ningun link  " + file)
  }
  return links;

}
// Obtener el status del link
//para Validate = true
//el modulo hace la peticion HTTP y averigua si el link funciona o no
const status = (link, file) => {
  
  return new Promise((resolve, reject) => {
    axios.get(link.href)
      .then((response) => {
        resolve({
          href: link.href, //url encontrada
          text: link.text, //texto dentro del link
          file: file, //ruta donde se encontro el archivo
          statusCode: response.status, // código de respuesta HTTP
          status: "OK", // mensaje de fallo u ok
        });
      })
      .catch((error) => {
        resolve({
          href: link.href,
          text: link.text,
          file: file,
          statusCode: error.err,
          status: "FAIL",
        });
      });
  });
};
// Nos da las estadisticas de los links.
//Cuantos links hay y si son unicos
//si validate=false y stats= true
const stats = (linkS) => {
  const statsArray = {};

  statsArray.Total = linkS.length;
  statsArray.Unique = 0;
  let uniqueLinks = new Set()

  linkS.forEach(link => {
    uniqueLinks.add(link.href);
  });
  statsArray.Unique = uniqueLinks.size
  return `Total: ${statsArray.Total} Unique: ${statsArray.Unique}`;
}

leerArchivoP(process.argv[2])
  .then((data) => {
        const validate = false;
        const links = extraerLinks(data);
    //console.log(links);
   if(validate){
       const linksValidados = links.map((link) => {
        status(link, process.argv[2]).then(response => {
               console.log(response);
               //ressolve(response);
           })
       })
         console.log(linksValidados);
         //si validate es true nos muestralos links validados con la funcion status
       }else{
        console.log(links);
        //si validate es false nos muestra los links de la funcion extraerLinks
         //ressolve(response);
       }
         })



//con validate=false y stats=true nos devuelve total y unique 
leerArchivoP(process.argv[2]).then((data) => {
  //console.log(data);
  const validate = false;
  const links = extraerLinks(data);
  if (validate = false) {
    console.log(stats(links));
  }
});

