let amigo = {nome:"josé",
sexo:"M", 
peso:90.00, 
engordar(p=0){
    console.log("Engordou")
    this.peso += p
}}
console.log(amigo.nome)