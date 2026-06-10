{% if values.javaVersion == '17' -%}
FROM eclipse-temurin:17-jre-alpine
{%- endif %}
{% if values.javaVersion == '21' -%}
FROM eclipse-temurin:21-jre-alpine
{%- endif %}
LABEL maintainer="cma"

COPY jar/*.jar /app.jar

ENV JAVA_OPTS="-XX:+UseContainerSupport -XX:MaxRAMPercentage=75.0"

ENV SERVER_PORT 8080

EXPOSE ${SERVER_PORT}

ENTRYPOINT [ "sh", "-c", "java $JAVA_OPTS -jar /app.jar" ]
