FROM eu.gcr.io/cma-cgm/openjdk:openjdk-${{ values.javaVersion }}-alpine3.21-amd64
MAINTAINER cma

COPY jar/*.jar /app.jar

ENV JAVA_OPTS="-XX:+UseContainerSupport -XX:MaxRAMPercentage=75.0"

ENV SERVER_PORT 8080

EXPOSE ${SERVER_PORT}

ENTRYPOINT [ "sh", "-c", "java $JAVA_OPTS -jar /app.jar" ]
