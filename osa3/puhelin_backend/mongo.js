const mongoose = require('mongoose')

console.log(process.argv)

if (process.argv.length < 3) {
	console.log('give password as argument')
	process.exit(1)
}



const password = process.argv[2]
const url = `mongodb+srv://juhkarhu:${password}@cluster0.95rah.mongodb.net/phonebook?retryWrites=true&w=majority`

// const arl = `mongodb+srv://juhkarhu:${password}@cluster0.95rah.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const personSchema = new mongoose.Schema({
	name: String,
	number: String
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
	Person.find({}).then(result => {
		console.log(result)
		mongoose.connection.close()
	})
} else if (process.argv.length === 5) {

	const person = new Person({
		name: process.argv[3],
		number: process.argv[4]
	})


	//person.save().then(response => {
	person.save().then(() => {
		console.log(`Added person ${person.name} with a number of ${person.number} to phonebook`)
		mongoose.connection.close()
	})

} else {
	mongoose.connection.close()
}
