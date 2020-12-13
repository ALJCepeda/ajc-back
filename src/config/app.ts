export const AppConfig = {
	environment: process.env.NODE_ENV || 'development',
	host: process.env.SERVER_HOST || '0.0.0.0',
	port: Number(process.env.SERVER_PORT) || 8000,

	client: {
		host: process.env.CLIENT_HOST || 'localhost',
		port: Number(process.env.CLIENT_PORT) || 8080
	},

	postgres: {
		host: process.env.POSTGRES_HOST || 'localhost',
		port: Number(process.env.POSTGRES_PORT) || 5432,
		username: process.env.POSTGRES_USER || 'ajc-web',
		password: process.env.POSTGRES_PASSWORD || 'password',
		database: process.env.POSTGRESS_DB || process.env.POSTGRES_USER || 'ajc-web'
	}
};
