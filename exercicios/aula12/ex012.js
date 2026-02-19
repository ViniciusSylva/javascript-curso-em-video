var agora = new Date()
var hora = agora.getHours()
console.log(`Agora são exatemente ${hora} horas.`)
if (hora < 12 || hora > 6) {
    console.log('Bom dia!')
} else if (hora > 12 || hora < 20) {
    console.log('Boa tarde!')
} else {
    console.log('Boa noite!')
}