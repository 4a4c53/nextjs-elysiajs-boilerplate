import { log } from 'node:console'
import { randomBytes } from 'node:crypto'
import { copyFileSync, existsSync, readFileSync, writeFileSync } from 'node:fs'
import { env } from 'node:process'

const POSTGRES_USER = env.npm_package_config_postgres_user || 'postgres'
const POSTGRES_PASSWORD = env.npm_package_config_postgres_password || 'postgres'
const POSTGRES_DB = env.npm_package_config_postgres_db || 'postgres'

// Backup existing .env
if (existsSync('.env')) {
	const TIMESTAMP = new Date().toISOString().replace(/[-:T]/g, '').slice(0, 14)
	copyFileSync('.env', `.env.bak.${TIMESTAMP}`)
	log(`\x1b[32m✓ Backup created: .env.bak.${TIMESTAMP}`)
}

// Read .env.example
let content = readFileSync('.env.example', 'utf8')

// Remove comments and empty lines
content = content
	.split('\n')
	.filter((line) => !/^\s*#/.test(line) && line.trim())
	.map((line) => line.replace(/#.*$/, '').trim())
	.join('\n')

// Generate secret using Node.js crypto (cross-platform)
const SECRET = randomBytes(32).toString('base64')

// Replace values
content = content.replace(/^AUTH_SECRET=.*/m, `AUTH_SECRET="${SECRET}"`)
content = content.replace(/^AUTH_URL=.*/m, `AUTH_URL="http://localhost:3000"`)

content = content.replace(
	/^DATABASE_URL=.*/m,
	`DATABASE_URL="postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@localhost:5432/${POSTGRES_DB}"`,
)

writeFileSync('.env', content)
log('\x1b[32m✓ .env file created successfully')
