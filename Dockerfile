# Use a specific version of nginx for better reproducibility
FROM nginx:1.25.3-alpine

# Add a non-root user for security
RUN adduser -D -H -u 1001 nginxuser && \
    chown -R nginxuser:nginxuser /usr/share/nginx/html && \
    chown -R nginxuser:nginxuser /var/cache/nginx && \
    touch /var/run/nginx.pid && \
    chown -R nginxuser:nginxuser /var/run/nginx.pid

# Copy files with specific ownership
COPY --chown=nginxuser:nginxuser build /usr/share/nginx/html
COPY --chown=nginxuser:nginxuser nginx.conf /etc/nginx/conf.d/default.conf

# Set working directory
WORKDIR /usr/share/nginx/html

# Switch to non-root user
USER nginxuser

# Expose port
EXPOSE 80

# Use exec form of CMD for better signal handling
CMD ["nginx", "-g", "daemon off;"]

# Add healthcheck
HEALTHCHECK --interval=30s --timeout=3s \
    CMD wget --quiet --tries=1 --spider http://localhost:80/ || exit 1
