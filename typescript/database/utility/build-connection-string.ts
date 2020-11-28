import { Credentials } from '../credentials'

export const BuildConnectionString = ({ username, password, server, database }: Credentials) =>
	`postgres://${username}:${password}@${server}/${database}`