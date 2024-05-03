#!/bin/bash

# Start SQL Server
/opt/mssql/bin/sqlservr &

# Start SQL Server
sleep 10s

# Run the setup script to create the DB and the schema in /docker-entrypoint-initdb.d/
/opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P yourPasswordStrong@2024 -q "
    IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = 'SimpleDatabaseForNestApp')
    BEGIN
        CREATE DATABASE SimpleDatabaseForNestApp;
    END
"

echo "Database created"