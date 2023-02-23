const mongoose = require('mongoose')

const argsLength = process.argv.length

if (argsLength < 3) {
  console.log('Give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const url = `mongodb+srv://kasperiTuni:${password}@cluster0.vghkfff.mongodb.net/phonebookApp?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (argsLength === 3) {
  console.log('phonebook:')
  Person
    .find({})
    .then(people => {
      people.forEach(person => {
        console.log(`${person.name} ${person.number}`)
      })
      mongoose.connection.close()
  })
}
else if (argsLength === 5) {
  const name = process.argv[3]
  const number = process.argv[4]

  const person = new Person({
    name: name,
    number: number,
  })

  person.save().then(result => {
    console.log(`added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
  })
}