class Clientes {
   constructor(nombre, apellido, edad){
    this.nombre = nombre;
    this.apellido = apellido;
    this.edad = edad;
   }

   saludoCliente(){
      return `Hola Bienvenido ${this.nombre} ${this.apellido} es un gusto tenerte`;
   }

   edadCliente(){
    return `La edad de ${this.nombre} ${this.apellido} es ${this.edad} años`;
   } 

   listNumber(){
      let numberRandom = 0;
      for(let i=1; i <= 10; i++){
         numberRandom = Math.floor(Math.random() * 1000)
         console.log(`${i}: ${numberRandom}`);
      }
   }

}

const dataClientes = new Clientes('Felipe', 'Reyes', '38');
console.log(dataClientes.saludoCliente());
console.log(dataClientes.edadCliente());
dataClientes.listNumber();

