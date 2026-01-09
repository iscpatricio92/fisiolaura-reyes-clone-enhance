#!/usr/bin/env node

/**
 * Script para incrementar la versión del package.json
 * 
 * Uso:
 *   node scripts/bump-version.js [patch|minor|major]
 * 
 * Si no se especifica el tipo, usa 'patch' por defecto
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const packageJsonPath = path.join(__dirname, '..', 'package.json');

// Leer package.json
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
const currentVersion = packageJson.version;

// Obtener el tipo de bump del argumento o usar 'patch' por defecto
const bumpType = process.argv[2] || 'patch';

// Validar el tipo
if (!['patch', 'minor', 'major'].includes(bumpType)) {
  console.error(`❌ Tipo de bump inválido: ${bumpType}`);
  console.error('Uso: node scripts/bump-version.js [patch|minor|major]');
  process.exit(1);
}

// Incrementar versión
const versionParts = currentVersion.split('.').map(Number);
let newVersion;

switch (bumpType) {
  case 'major':
    newVersion = `${versionParts[0] + 1}.0.0`;
    break;
  case 'minor':
    newVersion = `${versionParts[0]}.${versionParts[1] + 1}.0`;
    break;
  case 'patch':
    newVersion = `${versionParts[0]}.${versionParts[1]}.${versionParts[2] + 1}`;
    break;
}

// Actualizar package.json
packageJson.version = newVersion;
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');

console.log(`✅ Versión actualizada: ${currentVersion} → ${newVersion} (${bumpType})`);
console.log(`📝 Archivo actualizado: ${packageJsonPath}`);

// Opcional: Hacer commit automático (descomentar si lo prefieres)
// const commitMessage = `chore: bump version to ${newVersion}`;
// try {
//   execSync(`git add package.json`, { stdio: 'inherit' });
//   execSync(`git commit -m "${commitMessage}"`, { stdio: 'inherit' });
//   console.log(`✅ Commit creado: ${commitMessage}`);
// } catch (error) {
//   console.log('⚠️  No se pudo hacer commit automático. Hazlo manualmente:');
//   console.log(`   git add package.json`);
//   console.log(`   git commit -m "chore: bump version to ${newVersion}"`);
// }
