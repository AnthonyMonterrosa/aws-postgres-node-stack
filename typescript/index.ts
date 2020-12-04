import PostgreSQL from 'postgres'
import { Credentials } from './database'
import { BuildConnectionString } from './database/utility'
import express from 'express'

const options: PostgreSQL.Options<null> = {
	connect_timeout: 30,
	connection: {
		application_name: "node-express.js"
	}
}

const credentials: Credentials = {
	host: 'localhost',
	database: 'docker-example',
	username: 'postgres',
	password: 'docker',
}

const sql: PostgreSQL.Sql<null> = PostgreSQL(BuildConnectionString(credentials), {...options, port: 5430})

const Main = async () => {
	return await sql`
		select * from "docker table"
	`
}

Main()
  .then( result => { 
		console.log("done!")
		result.forEach( row => console.log(row, typeof row.id) ) })
  .catch( error => { 
		console.log("Main errored:")
		console.log(error) })

await sql.end({ timeout: 3 })

const app = express()
 
app.get('/', (request, response) => {
  response.send('Hello World')
})
 
app.listen(3000)