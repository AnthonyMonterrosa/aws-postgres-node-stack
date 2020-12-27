import postgres from 'postgres';
import express  from 'express';
import { Database } from './database';

const sql: postgres.Sql<null> = postgres(
	Database.Utility.BuildConnectionString(
		{
			host: 'localhost',
			database: 'docker-example',
			username: 'postgres',
			password: 'docker'
		}
	),
	{
		connect_timeout: 30,
		connection:
		{
			application_name: 'node-express.js'
		},
		port: 5430
	}
);

( async () => {

	const response = await sql`
		select * from "docker table"
	`;

	response.forEach( row => console.log( row ) );

	const app = express();

	app.get( '/', ( request, response ) =>
	{
		response.send( 'Hello World' );
	} );

	app.listen( 3000 );

	process.exit( 0 );
} )()
	.catch( reason =>
	{
		console.log( 'Error: main errored with the following exception:' );
		console.log( reason );
		process.exit( 1 );
	} )
	.finally( () => {
		sql.end( { timeout: 0 } );
	} );