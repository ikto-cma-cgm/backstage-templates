{% if values.javaVersion == '17' -%}
FROM 333230080375.dkr.ecr.eu-west-1.amazonaws.com/image_factory/openjdk:17-alpine3.18
{%- endif %}
{% if values.javaVersion == '21' -%}
FROM 333230080375.dkr.ecr.eu-west-1.amazonaws.com/image_factory/openjdk:openjdk-21-alpine3.21-amd64
{%- endif %}
MAINTAINER cma

COPY jar/*.jar /app.jar

ENV JAVA_OPTS="-XX:+UseContainerSupport -XX:MaxRAMPercentage=75.0"

ENV SERVER_PORT 8080

EXPOSE ${SERVER_PORT}

ENTRYPOINT [ "sh", "-c", "java $JAVA_OPTS -jar /app.jar" ]
