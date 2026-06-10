#!/usr/bin/env bash
# generate-stubs.sh
# Generates controller and service stubs for every API tag found in the OpenAPI spec.
# Skips files that already exist — safe to run on every build.
#
# Usage:
#   ./scripts/generate-stubs.sh              # standalone: runs mvn generate-sources first
#   ./scripts/generate-stubs.sh --from-maven # called by Maven: sources already generated

set -euo pipefail

FROM_MAVEN=false
if [[ "${1:-}" == "--from-maven" ]]; then
  FROM_MAVEN=true
fi

PACKAGE="${{ values.packageName }}"
PACKAGE_PATH="src/main/java/$(echo "$PACKAGE" | tr '.' '/')"
GENERATED_API_DIR="${PACKAGE_PATH}/api"

if [ "$FROM_MAVEN" = false ]; then
  echo "==> Running mvn generate-sources..."
  mvn generate-sources -q
fi

if [ ! -d "$GENERATED_API_DIR" ]; then
  echo "[ERROR] Generated API sources not found at $GENERATED_API_DIR"
  echo "        Run 'mvn generate-sources' first."
  exit 1
fi

DELEGATES=$(find "$GENERATED_API_DIR" -maxdepth 1 -name "*ApiDelegate.java" ! -name "ApiUtil*" 2>/dev/null)

if [ -z "$DELEGATES" ]; then
  echo "[WARN] No *ApiDelegate.java found. Nothing to generate."
  exit 0
fi

mkdir -p "$PACKAGE_PATH/controller"
mkdir -p "$PACKAGE_PATH/service"

for DELEGATE_FILE in $DELEGATES; do
  DELEGATE_CLASS=$(basename "$DELEGATE_FILE" .java)
  TAG=$(echo "$DELEGATE_CLASS" | sed 's/ApiDelegate$//')
  CONTROLLER_CLASS="${TAG}Controller"
  SERVICE_CLASS="${TAG}Service"
  CONTROLLER_FILE="$PACKAGE_PATH/controller/${CONTROLLER_CLASS}.java"
  SERVICE_FILE="$PACKAGE_PATH/service/${SERVICE_CLASS}.java"

  # --- Service stub ---
  if [ -f "$SERVICE_FILE" ] && [ -s "$SERVICE_FILE" ]; then
    echo "    [SKIP] $SERVICE_CLASS already exists"
  else
    cat > "$SERVICE_FILE" <<JAVA
package ${PACKAGE}.service;

import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ${SERVICE_CLASS} {

    // TODO: implement business logic

}
JAVA
    echo "    [OK]   Generated $SERVICE_FILE"
  fi

  # --- Controller stub ---
  if [ -f "$CONTROLLER_FILE" ] && [ -s "$CONTROLLER_FILE" ]; then
    echo "    [SKIP] $CONTROLLER_CLASS already exists"
  else
    SERVICE_FIELD=$(echo "$SERVICE_CLASS" | tr '[:upper:]' '[:lower:]' | cut -c1)$(echo "$SERVICE_CLASS" | cut -c2-)
    cat > "$CONTROLLER_FILE" <<JAVA
package ${PACKAGE}.controller;

import ${PACKAGE}.api.${DELEGATE_CLASS};
import ${PACKAGE}.service.${SERVICE_CLASS};
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

/**
 * Implements {@link ${DELEGATE_CLASS}}.
 * Route mappings are handled by the generated ${TAG}ApiController.
 */
@Component
@RequiredArgsConstructor
public class ${CONTROLLER_CLASS} implements ${DELEGATE_CLASS} {

    private final ${SERVICE_CLASS} ${SERVICE_FIELD};

}
JAVA
    echo "    [OK]   Generated $CONTROLLER_FILE"
  fi
done

echo ""
echo "==> Done. Stubs created in $PACKAGE_PATH/{controller,service}/"
echo "    Next: implement your business logic, then run 'mvn spring-boot:run'"
