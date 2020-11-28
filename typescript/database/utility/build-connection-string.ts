import { Credentials } from '../credentials'

export const BuildConnectionString = ({ username, password, host, database }: Credentials) =>
	`postgres://${username}:${password}@${host}/${database}`