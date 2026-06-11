#!/usr/bin/env bash
# generate-stubs.sh
# Generates controller and service stubs from every *ApiDelegate.java found in the generated API.
# Skips files that already exist and are non-empty (safe to run on every build).
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

# Remove empty org/openapitools directories left by the generator
find src/main/java/org -type d -empty -delete 2>/dev/null && rmdir -p src/main/java/org 2>/dev/null || true
find src/test/java/org -type d -empty -delete 2>/dev/null && rmdir -p src/test/java/org 2>/dev/null || true

DELEGATES=$(find "$GENERATED_API_DIR" -maxdepth 1 -name "*ApiDelegate.java" ! -name "ApiUtil*" 2>/dev/null)

if [ -z "$DELEGATES" ]; then
  echo "[WARN] No *ApiDelegate.java found. Nothing to generate."
  exit 0
fi

mkdir -p "$PACKAGE_PATH/controller"
mkdir -p "$PACKAGE_PATH/service"

# Remove .gitkeep placeholders now that real files will be created
rm -f "$PACKAGE_PATH/controller/.gitkeep" "$PACKAGE_PATH/service/.gitkeep"

# Extract method signatures from a delegate interface.
# Handles multi-line parameter lists and outputs one signature per line.
extract_methods() {
  awk '
    /^[[:space:]]*default ResponseEntity/ { collecting=1; sig="" }
    collecting { sig = (sig == "" ? $0 : sig " " $0) }
    collecting && /\)[[:space:]]*\{/ {
      sub(/^[[:space:]]*default /, "", sig)
      sub(/[[:space:]]*\{[[:space:]]*$/, "", sig)
      gsub(/[[:space:]]+/, " ", sig)
      print sig
      collecting = 0
    }
  ' "$1"
}

for DELEGATE_FILE in $DELEGATES; do
  DELEGATE_CLASS=$(basename "$DELEGATE_FILE" .java)
  TAG=$(echo "$DELEGATE_CLASS" | sed 's/ApiDelegate$//')
  CONTROLLER_CLASS="${TAG}Controller"
  SERVICE_CLASS="${TAG}Service"
  CONTROLLER_FILE="$PACKAGE_PATH/controller/${CONTROLLER_CLASS}.java"
  SERVICE_FILE="$PACKAGE_PATH/service/${SERVICE_CLASS}.java"
  SERVICE_FIELD=$(echo "$SERVICE_CLASS" | tr '[:upper:]' '[:lower:]' | cut -c1)$(echo "$SERVICE_CLASS" | cut -c2-)

  # --- Service stub ---
  if [ -f "$SERVICE_FILE" ] && [ -s "$SERVICE_FILE" ]; then
    echo "    [SKIP] $SERVICE_CLASS already exists"
  else
    {
      cat <<JAVA
package ${PACKAGE}.service;

import ${PACKAGE}.api.model.*;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ${SERVICE_CLASS} {

JAVA
      while IFS= read -r method_sig; do
        METHOD_NAME=$(echo "$method_sig" | grep -oE '\w+\(' | head -1 | tr -d '(')
        PARAMS=$(echo "$method_sig" | sed 's/[^(]*(//;s/)$//')
        INNER_TYPE=$(echo "$method_sig" | grep -oE 'ResponseEntity<[A-Za-z]+>' | sed 's/ResponseEntity<//;s/>//')
        SVC_RETURN="${INNER_TYPE}"
        [ "$INNER_TYPE" = "Void" ] && SVC_RETURN="void"
        cat <<JAVA
    public ${SVC_RETURN} ${METHOD_NAME}(${PARAMS}) {
        throw new UnsupportedOperationException("Not implemented yet");
    }

JAVA
      done < <(extract_methods "$DELEGATE_FILE")
      echo "}"
    } > "$SERVICE_FILE"
    echo "    [OK]   Generated $SERVICE_FILE"
  fi

  # --- Controller stub ---
  if [ -f "$CONTROLLER_FILE" ] && [ -s "$CONTROLLER_FILE" ]; then
    echo "    [SKIP] $CONTROLLER_CLASS already exists"
  else
    {
      cat <<JAVA
package ${PACKAGE}.controller;

import ${PACKAGE}.api.${DELEGATE_CLASS};
import ${PACKAGE}.api.model.*;
import ${PACKAGE}.service.${SERVICE_CLASS};
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

/**
 * Implements {@link ${DELEGATE_CLASS}}.
 * Route mappings are handled by the generated ${TAG}ApiController.
 */
@Component
@RequiredArgsConstructor
public class ${CONTROLLER_CLASS} implements ${DELEGATE_CLASS} {

    private final ${SERVICE_CLASS} ${SERVICE_FIELD};

JAVA
      while IFS= read -r method_sig; do
        cat <<JAVA
    @Override
    public ${method_sig} {
        throw new UnsupportedOperationException("Not implemented yet");
    }

JAVA
      done < <(extract_methods "$DELEGATE_FILE")
      echo "}"
    } > "$CONTROLLER_FILE"
    echo "    [OK]   Generated $CONTROLLER_FILE"
  fi
done

echo ""
echo "==> Done. Stubs created in $PACKAGE_PATH/{controller,service}/"
echo "    Next: implement your business logic, then run 'mvn spring-boot:run'"
