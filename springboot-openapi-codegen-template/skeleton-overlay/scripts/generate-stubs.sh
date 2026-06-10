#!/usr/bin/env bash
# generate-stubs.sh
# Generates delegate implementations for every API tag found in the OpenAPI spec.
#
# Usage:
#   ./scripts/generate-stubs.sh              # standalone: runs mvn generate-sources first
#   ./scripts/generate-stubs.sh --from-maven # called by Maven process-sources: sources already generated

set -euo pipefail

FROM_MAVEN=false
if [[ "${1:-}" == "--from-maven" ]]; then
  FROM_MAVEN=true
fi

PACKAGE="${{ values.packageName }}"
PACKAGE_PATH="src/main/java/${{ values.packagePath }}"
GENERATED_DIR="target/generated-sources/openapi/src/main/java/${{ values.packagePath }}/api"

if [ "$FROM_MAVEN" = false ]; then
  echo "==> Running mvn generate-sources..."
  mvn generate-sources -q
fi

if [ ! -d "$GENERATED_DIR" ]; then
  echo "[ERROR] Generated sources not found at $GENERATED_DIR"
  echo "        Check that src/main/resources/api/openapi.yaml is a valid OpenAPI spec."
  exit 1
fi

# Collect delegate interfaces: <Tag>ApiDelegate.java
DELEGATES=$(find "$GENERATED_DIR" -maxdepth 1 -name "*ApiDelegate.java" ! -name "ApiUtil*" 2>/dev/null)

if [ -z "$DELEGATES" ]; then
  echo "[WARN] No *ApiDelegate.java found. Nothing to generate."
  exit 0
fi

mkdir -p "$PACKAGE_PATH/controller"

for DELEGATE_FILE in $DELEGATES; do
  DELEGATE_CLASS=$(basename "$DELEGATE_FILE" .java)            # e.g. BookingsApiDelegate
  TAG=$(echo "$DELEGATE_CLASS" | sed 's/ApiDelegate$//')       # e.g. Bookings
  CONTROLLER_CLASS="${TAG}Controller"
  CONTROLLER_FILE="$PACKAGE_PATH/controller/${CONTROLLER_CLASS}.java"

  if [ -f "$CONTROLLER_FILE" ]; then
    echo "    [SKIP] $CONTROLLER_CLASS already exists"
    continue
  fi

  # Extract method signatures from the delegate interface
  METHODS=$(grep -E "^\s+default ResponseEntity" "$DELEGATE_FILE" \
    | sed 's/default //' \
    | sed 's/ {$/;/' \
    || true)

  # Build controller stub
  cat > "$CONTROLLER_FILE" <<JAVA
package ${PACKAGE}.controller;

import ${PACKAGE}.api.${DELEGATE_CLASS};
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

/**
 * Implements {@link ${DELEGATE_CLASS}}.
 * The @RestController and route mappings are handled by the generated ${TAG}ApiController.
 * Edit this class to add your business logic.
 */
@Component
@RequiredArgsConstructor
public class ${CONTROLLER_CLASS} implements ${DELEGATE_CLASS} {

    // TODO: inject your services here

}
JAVA

  echo "    [OK] Generated $CONTROLLER_FILE"
done

echo ""
echo "==> Done. Stub(s) created in $PACKAGE_PATH/controller/"
echo "    Next: implement the delegate methods, then run 'mvn spring-boot:run'"
