import { Credentials } from '../credentials';

export const BuildConnectionString = ( { username, password, host, database }: Credentials ): string =>
	`postgres://${username}:${password}@${host}/${database}`;