import { log } from 'node:console'
import { randomBytes } from 'node:crypto'
import { copyFileSync, existsSync, readFileSync, writeFileSync } from 'node:fs'
import { env } from 'node:process'

// Values computed from the npm environment.
// Only add here what cannot be expressed as a static value in .env.example
const POSTGRES_USER = env.npm_package_config_postgres_user || 'postgres'
const POSTGRES_PASSWORD = env.npm_package_config_postgres_password || 'postgres'
const POSTGRES_DB = env.npm_package_config_postgres_db || 'postgres'

const computed: Record<string, string> = {
	APP_NAME: env.npm_package_name || 'app',
	DATABASE_URL: `postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@localhost:5432/${POSTGRES_DB}`,
}

// Backup the existing .env file
if (existsSync('.env')) {
	const timestamp = new Date().toISOString().replace(/[-:T]/g, '').slice(0, 14)
	copyFileSync('.env', `.env.bak.${timestamp}`)
	log(`\x1b[32m✓ Backup created: .env.bak.${timestamp}`)
}

// Process .env.example line by line
// - Lines with "openssl rand -base64 32" in the comment -> auto-generated value
// - Lines with a key in computed -> value computed from npm config
// - Remaining lines -> value as defined in .env.example
const lines = readFileSync('.env.example', 'utf8').split('\n')

const output = lines
	.filter((line) => !/^\s*#/.test(line))
	.map((line) => {
		const key = line.match(/^([A-Z_]+)=/)?.[1]
		if (!key) return null

		if (/openssl rand -base64 32/.test(line)) {
			return `${key}="${randomBytes(32).toString('base64')}"`
		}

		if (key in computed) {
			return `${key}="${computed[key]}"`
		}

		// Use the default value from .env.example (without the comment)
		const value = line.replace(/#.*$/, '').split('=')[1]?.trim() ?? ''
		return `${key}="${value}"`
	})
	.filter((line) => line !== null)

writeFileSync('.env', output.join('\n'))
log('\x1b[32m✓ .env file created successfully')
