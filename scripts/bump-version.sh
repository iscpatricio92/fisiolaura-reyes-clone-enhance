#!/bin/bash

# Script para incrementar la versión del package.json
# 
# Uso:
#   ./scripts/bump-version.sh [patch|minor|major]
# 
# Si no se especifica el tipo, usa 'patch' por defecto

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
PACKAGE_JSON="$PROJECT_ROOT/package.json"

# Obtener el tipo de bump del argumento o usar 'patch' por defecto
BUMP_TYPE="${1:-patch}"

# Validar el tipo
if [[ ! "$BUMP_TYPE" =~ ^(patch|minor|major)$ ]]; then
  echo "❌ Tipo de bump inválido: $BUMP_TYPE"
  echo "Uso: ./scripts/bump-version.sh [patch|minor|major]"
  exit 1
fi

# Leer versión actual
CURRENT_VERSION=$(node -p "require('$PACKAGE_JSON').version")
echo "📦 Versión actual: $CURRENT_VERSION"

# Incrementar versión usando npm
cd "$PROJECT_ROOT"
NEW_VERSION=$(npm version "$BUMP_TYPE" --no-git-tag-version)
NEW_VERSION=${NEW_VERSION#v}  # Remover el prefijo 'v'

echo "✅ Versión actualizada: $CURRENT_VERSION → $NEW_VERSION ($BUMP_TYPE)"
echo "📝 Archivo actualizado: $PACKAGE_JSON"
echo ""
echo "💡 Próximos pasos:"
echo "   git add package.json"
echo "   git commit -m \"chore: bump version to $NEW_VERSION\""
