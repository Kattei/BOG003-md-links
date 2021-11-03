Pruebas
https://www.linkedin.com/in/katherin-rodriguez-barbosa/

/*const status = (Link) => {
  return new Promise((resolve, reject) => {
    axios
      .get(Link.href)
      .then((response) => {
        resolve({
          href: Link.href,
          text: Link.text,
          file: Link.file,
          status: response.status,
          ok: response.statusText,
        });
      })
      .catch((error) => {
        resolve({
          href: Link.href,
          text: Link.text,
          file: Link.file,
          status: error.errno,
          statusText: "FAIL",
        });
      });
  });
};*/
/*
//Función mdLinks // 
const mdLinks = (path, options) => {
  const validate = {
    validate: true,
    validate: false
  };
  const absolutePath = resolve(path);
  return new Promise((resolve, reject) => {
    fileOrDirectory(absolutePath)
      .then((res)=> {
        if(res === true) {
          return readDirectory(absolutePath).then((files) => {
            files.forEach(file =>{
              fileExt(file).then((res) => {

              });
            });
          });
        } else {
          fileExt(absolutePath).then((res) => {
            return res.map((file) => {
              status(file).then((response) => {
                if(options.validate === true) {
                  resolve(response);
                  //console.log(response);
                } else {
                  resolve(res);
                }
              });
            });
          })
        }
      })
      .catch((err) => {
        reject(err);
      });
    });
  };*/


 