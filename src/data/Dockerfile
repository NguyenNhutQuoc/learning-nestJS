# Use the official SQL Server 2019 image from Microsoft
FROM mcr.microsoft.com/mssql/server:2022-latest

# Set environment variables
ENV ACCEPT_EULA=Y
ENV SA_PASSWORD=yourPasswordStrong@2024

# Create a directory for scripts
WORKDIR /scripts

# Copy scripts into the container
COPY ./scripts /scripts

EXPOSE 1433

