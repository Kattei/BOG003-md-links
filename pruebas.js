/*module.exports = () => {
  // ...
};*/
const fs = require("fs");
const path = require("path");
const FileHound = require("FileHound");
const marked = require("marked");
const axios = require("axios").default;

//const jsdom = require("jsdom");
//const { resolve } = require("path");
//const { reject } = require("assert");
//const { options } = require("marked");
//const { title } = require("process");

const mdLinks = (path, options) => { 
  return new Promise((resolve, reject) =>{
    fileOrDirectory(path).then((files) => {
      console.log(files)
      files.forEach( (file)=>{
        routeFile(file).then((links) =>{
          console.log(links)
        })
      })
      //retornar un arreglo con todos los links
      const arrLinks = [];
      arrLinks.push(links)
    })
    .then((links)=>{
      if(options.validate === true){
        validateLinks(links)
      
      }

    })
    /*if (options.validate === false && options.stats === false) {
      fileOrDirectory(path)
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
    }else if (options.validate === true && options.stats === false) {
      fileOrDirectory(path)
      .then(links => {
        validateLinks(links)
        .then(res => {
          resolve(res);
        })
      })
      .catch(err => {
        reject(err)
      });
    }else if (options.validate === false && options.stats === true){
      fileOrDirectory(path)
      .the(res => {
        resolve(statsLinks(res));
      })
      .catch(err => {
        reject(err)
      })
    }*/
  });
};
// funcion para que verifica si es un archivo o un directorio
const fileOrDirectory = (path) => {
  return new Promise((resolve, reject) => {
    fs.lstat(path, (err, stats) => {
      if(err) {
       // console.log("El archivo o la ruta no es valido");
        reject("El archivo o la ruta no es valido");
      } else if (stats.isDirectory()){
        resolve(readDirectory(path));
      }else{
        //resolve(routeFile(path));
        resolve([path])
      }
    })
  })
}
// funcion que busca archivos .md
const routeFile = ((file) =>{
  return new Promise ((resolve, reject) => {
    let exten = path.extname(file);
    if (exten === ".md"){
      resolve(fileExt(file));
    } else {
      reject("El arcivo no tiene una extencion .md")
    }
  })
})

// funcion que lee archivos .md

const fileExt = ((file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, 'utf-8', (err, data) => {
      if (err) {
        reject(err)
      }
      //resolve ("hola. esta es la funcion fileExt")
     resolve(readLinks(data, file))
    })
  })
})

const readDirectory = (route) => {
  return new Promise((resolve, reject) => {
      FileHound.create()
          .paths(route)
          .ext(".md")
          .find()
          .then((res) => {
            resolve(res);
            //console.log(res)
          })
          .catch((err) => {
            reject(err, "El directorio no existe");
          })
  
});
}

// funcion para extraer links
const readLinks = (data, file) => {
  let links = [];
  
  const renderer = new marked.Renderer();

  renderer.link = (href, title, text) => {
    links.push({
      href: href,
      text: text,
      file: file,
    });
  }
  marked(data, {
    renderer: renderer 
  });
  if (links.length === 0){
    console.log("no se encontro ningun link  " + file)
  }
  return links;
}
// funcion para validar links
const validateLinks = (links) => {
 // return new Promise((resolve, reject) => {
    axios.get(link.href)
      .then((response) => {
        //resolve({
          link.status = response.status;
          link.ok = response.statusText;
          return links;
        //});
      })
      .catch((error) => {
       // resolve({
          links.status = error.response.status;
          links.ok = "FAIL";
          return links;
        //});
      });
  //});
};
/* axios.get("https://www.youtube.com/watch?v=TaMpkIcw4jM").then((response) => {
  console.log("leido");
 }).catch((err) => {
   console.log("Hola")
 })*/


mdLinks(process.argv[2], options= {validate:true, stats:false}).then(res => console.log("res",res)).catch(err => console.log("error de la promesa", err))


/*fs.readdir('../BOG003-md-links', (err, files) => {
 if (err) {
   fileExt("readme.md")
   console.error(err)
 }
 console.log(files)

});*/

/*const verifyRoute = (routepath) => {
  return new Promise((resolve, reject) => {
      if (existsSync(routepath)) {
          if (path.isAbsolute(routepath)) {
              console.log('the route exist!!\nthe absolute route is:\n');
              resolve(routepath)
          } else {
              console.log('the route exist!!\nthe path was converted to an absolute route:\n');
              const absRoutepath = path.resolve(routepath);
              resolve(absRoutepath);
          }
      } else {
          reject('the path doesn´t exist');
      }
  })
}


const verifyDirOrFile = (routepath) => {
  // const resultDir = ;
  // const resultFile=;
  // console.log(resultDir);
  // console.log(resultFile);
  return new Promise((resolve, reject) => {

      if (fs.lstatSync(routepath).isDirectory()) {
          let filesArray=[]; 
          
           fs.readdir(routepath, (err, files) => {
              files.forEach(file => {
                filesArray=files

                

                const verifyDirOrFile = (routepath) => {  
    return new Promise((resolve, reject) => {
        if (fs.lstatSync(routepath).isDirectory()) {
            let filesArray=[];             
             fs.readdir(routepath, (err, files) => {                
                  filesArray=files
                  resolve(filesArray);                
              });   
                        
        } else if (fs.lstatSync(routepath).isFile()) {
            let fileArray=[];
            let a=path.basename(routepath);
                fileArray.push(a);
                resolve(fileArray);          
        } else {
            reject('this type of route does not belong to a dir or a file ')
        }
    });    
}


                const identifyMdFiles = ((files) => {
    return new Promise((resolve, reject) => {   
        const result = files.filter(file =>path.extname(file)=== ".md");
        if(result.length==0){
            reject('no se encontró ningun archivo md')
        }
        resolve(result);       
    });
});

*/