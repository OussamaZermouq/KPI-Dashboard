from fastapi import FastAPI, File, UploadFile, HTTPException, Depends
from fastapi.security import OAuth2PasswordBearer
import pandas as pd
import io
import logging
from sqlalchemy import create_engine, Column, Integer, String, MetaData
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from auth import verify_jwt_token  # Import the JWT verification function

# Database connection setup
DATABASE_URL = "postgresql+asyncpg://postgres:ML9:%sj8P@localhost/postgresql"  # Update with your database credentials
Base = declarative_base()
metadata = MetaData()

# SQLAlchemy Session
engine = create_engine(DATABASE_URL, echo=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Configure logging
logging.basicConfig(level=logging.INFO)

# FastAPI app
app = FastAPI()

# Dependency to get the current user from the token
def get_current_user(token: str = Depends(OAuth2PasswordBearer(tokenUrl="token"))):
    payload = verify_jwt_token(token)  # Validate JWT
    return payload["sub"]  # Assuming 'sub' is the username or user ID

# Database models
class UploadedFileRecord(Base):
    __tablename__ = 'uploaded_files'
    id = Column(Integer, primary_key=True, index=True)
    file_name = Column(String, index=True)
    uploaded_by = Column(String, index=True)
    sheet_name = Column(String)
    data_preview = Column(String)

# Dependency to get database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/upload")
async def upload_file(
    file: UploadFile = File(...),
    sheet_name: str = "Hourly Ville",
    user: str = Depends(get_current_user),  # Ensure the user is authenticated
    db: SessionLocal = Depends(get_db)  # Dependency to interact with the database # type: ignore
):
    # Checking if the file is an Excel sheet
    if not file.filename.endswith(".xlsx"):
        raise HTTPException(status_code=400, detail="File must be an Excel sheet")
    
    try:
        content = await file.read()
        xl = pd.ExcelFile(io.BytesIO(content), engine="openpyxl")
        logging.info(f"Sheet Names: {xl.sheet_names}")

        # Validate sheet name
        if sheet_name not in xl.sheet_names:
            raise HTTPException(
                status_code=400, 
                detail=f"Sheet '{sheet_name}' not found. Available sheets: {xl.sheet_names}"
            )
        
        # Read the specific sheet with header row (assumed to be row 1)
        data = pd.read_excel(io.BytesIO(content), engine="openpyxl", sheet_name=sheet_name, header=1)
        logging.info(f"Data Preview:\n{data.head()}")

        # Rename columns: If column name is NaN or starts with "Unnamed"
        data.columns = [f"Column_{i}" if pd.isna(col) or str(col).startswith("Unnamed") else col for i, col in enumerate(data.columns)]
        
        # Fill NaN and replace infinite values
        data = data.fillna("").replace([float("inf"), float("-inf")], 0)
        
        # Save the upload information into the database
        db_record = UploadedFileRecord(
            file_name=file.filename,
            uploaded_by=user,
            sheet_name=sheet_name,
            data_preview=str(data.head())  # Preview of the data, you can store more if needed
        )
        db.add(db_record)
        db.commit()
        db.refresh(db_record)

        return {"message": f"File uploaded successfully by {user}", "data": data.to_dict(orient="records")}
    
    except Exception as e:
        logging.error(f"Error processing file: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")

'''
@app.get("/converter")
async def converter_api(user: dict = Depends(verify_jwt_token)):
    return {"message": f"Welcome {user['sub']}! You have access to the Converter API."}

'''