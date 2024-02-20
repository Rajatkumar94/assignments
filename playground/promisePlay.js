function as() {
  let p = new Promise(function (resolve, reject) {
    // setTimeout(function () {
      resolve("hi there");
    // }, 3000);
  });

  return p
}


async function main(){
    let pp =await as();
    console.log(pp);
}

main()