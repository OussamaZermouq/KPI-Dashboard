import psycopg2
from psycopg2 import sql
import logging
from fastapi import HTTPException

# Database connection details
DB_HOST = "jdbc:postgresql://localhost:5432/kpiInwiAuth"
DB_NAME = "postgresql"
DB_USER = "postgres"
DB_PASSWORD = "ML9:%sj8P"

# Create a connection to the PostgreSQL database
def get_db_connection():
    try:
        conn = psycopg2.connect(
            dbname=DB_NAME,
            user=DB_USER,
            password=DB_PASSWORD,
            host=DB_HOST
        )
        return conn
    except Exception as e:
        logging.error(f"Error connecting to the database: {str(e)}")
        raise HTTPException(status_code=500, detail="Database connection error")

# Example query function
def get_data_from_db(query):
    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        cursor.execute(query)
        result = cursor.fetchall()
        return result
    except Exception as e:
        logging.error(f"Error executing query: {str(e)}")
        raise HTTPException(status_code=500, detail="Error executing database query")
    finally:
        cursor.close()
        conn.close()