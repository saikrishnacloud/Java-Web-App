# DevOps Showcase — Java Web Application

A polished sample web app for practicing Java WAR builds and Apache Tomcat deployments. It includes a responsive dashboard and a Java servlet health endpoint (`/api/health`).

## Requirements
- JDK 17 or later
- Maven 3.8+
- Apache Tomcat 10.1+ (Jakarta Servlet 6 compatible)

> This project uses `jakarta.servlet`, so do not deploy it on Tomcat 9. Use Tomcat 10.1+.

## Build the WAR
From the project root, run:

```bash
mvn clean package
```

The deployable file will be:

```text
target/devops-showcase.war
```

## Deploy to Tomcat on Ubuntu

1. Install Java and Maven if needed:

```bash
sudo apt update
sudo apt install -y openjdk-17-jdk maven
java -version
mvn -version
```

2. Build the project on your laptop or EC2 instance. If building locally, copy `target/devops-showcase.war` to your Ubuntu server.

3. Copy the WAR into Tomcat's `webapps` folder. Adjust the path if your Tomcat is installed elsewhere:

```bash
sudo cp target/devops-showcase.war /opt/tomcat/webapps/
```

4. Ensure Tomcat is running. The service name and installation path vary by installation method:

```bash
sudo systemctl status tomcat
```

If you installed Tomcat manually, start it using its `bin/startup.sh` script instead.

5. In the EC2 Security Group, allow inbound TCP port **8080** from your own IP for testing. Avoid exposing the Tomcat Manager or other admin endpoints publicly.

6. Open:

```text
http://YOUR_SERVER_PUBLIC_IP:8080/devops-showcase/
```

Health endpoint:

```text
http://YOUR_SERVER_PUBLIC_IP:8080/devops-showcase/api/health
```

Expected JSON includes `"status":"UP"` and the Java runtime version.

## Troubleshooting
- **404:** confirm the WAR is named `devops-showcase.war`, deployment completed, and the URL includes `/devops-showcase/`.
- **Health check fails:** inspect Tomcat logs, commonly `logs/catalina.out`, and verify Tomcat 10.1+.
- **Connection refused / timeout:** check Tomcat status, server firewall, EC2 Security Group inbound rule, and that Tomcat listens on port 8080.
- **Maven not found:** install Maven or build on a machine where Maven is available.

## Project layout

```text
DevOpsShowcase/
├── pom.xml
├── README.md
└── src/main/
    ├── java/com/demo/HealthServlet.java
    └── webapp/
        ├── index.html
        └── assets/
            ├── styles.css
            └── app.js
```
