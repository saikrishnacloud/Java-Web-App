package com.demo;

import java.io.IOException;
import java.time.Instant;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebServlet("/api/health")
public class HealthServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.setHeader("Cache-Control", "no-store");
        response.getWriter().printf(
            "{\"status\":\"UP\",\"application\":\"DevOps Showcase\",\"runtime\":\"Java %s\",\"timestamp\":\"%s\"}",
            System.getProperty("java.version"), Instant.now().toString()
        );
    }
}
