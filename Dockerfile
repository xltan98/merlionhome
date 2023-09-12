
FROM node:18 AS angbuilder
WORKDIR /app
COPY miniprojectfronttry/ .   # Copy everything from the frontend directory
RUN npm i -g @angular/cli
RUN npm i

RUN ng build

FROM maven:3-eclipse-temurin-20 AS mvnbuilder
WORKDIR /app
COPY miniprojectfronttry/src src
COPY miniprojectfronttry/angular.json .
COPY miniprojectfronttry/package.json .
COPY miniprojectfronttry/package-lock.json .
COPY miniprojectfronttry/tsconfig.app.json .
COPY miniprojectfronttry/tsconfig.json .
COPY miniprojectfronttry/tsconfig.spec.json .

COPY --from=angbuilder /app/dist/client /app/src/main/resources/static
RUN mvn clean package -Dmaven.test.skip=true


From openjdk:20-slim
WORKDIR /app
COPY --from=mvnbuilder /app/target/server-0.0.1-SNAPSHOT.jar app.jar

ENV S3_KEY_ACCESS=${S3_KEY_ACCESS}
ENV S3_KEY_SECRET=${S3_KEY_SECRET}
ENV SENDGRID_API_KEY=${SENDGRID_API_KEY}
ENV SENDGRID_TEMPLATE_ID=${SENDGRID_TEMPLATE_ID}
ENV SENDER_EMAIL=${SENDER_EMAIL}
ENV SPRING_SECURITY_JWT_SECRET=${SPRING_SECURITY_JWT_SECRET}
ENV SPRING_DATA_MONGODB_URI=${SPRING_DATA_MONGODB_URI}
ENV SPRING_DATASOURCE_URL=${SPRING_DATASOURCE_URL}
ENV SPRING_DATASOURCE_USERNAME=${SPRING_DATASOURCE_USERNAME}
ENV SPRING_DATASOURCE_PASSWORD=${SPRING_DATASOURCE_PASSWORD}

# Entrypoint
ENTRYPOINT ["java", "-jar", "app.jar"]
