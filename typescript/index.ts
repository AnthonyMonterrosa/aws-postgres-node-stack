import PostgreSQL from 'postgres'
import { Credentials } from './database'
import { BuildConnectionString } from './database/utility'

const options: PostgreSQL.Options<null> = {
	connect_timeout: 30,
	connection: {
		application_name: "node-express.js"
	}
}

const credentials: Credentials = {
	server: 'localhost',
	database: 'testdatabase',
	username: 'postgres',
	password: ' '
}

const sql: PostgreSQL.Sql<null> = PostgreSQL(BuildConnectionString(credentials), {...options})

const Main = async () => {
	return await sql`
		select * from testtable
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

process.exit(0)