import jwt
from fastapi import HTTPException, Security
from fastapi.security import OAuth2PasswordBearer
from typing import Optional

SECRET_KEY = "ab0879f4c50b190aeb7d4a751b222891766c17c59db313c5f6283db39958b1de"  # Should match the one in Spring Boot
ALGORITHM = "HS256"  # Should match the algorithm used in Spring Boot

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# Function to verify JWT token
def verify_jwt_token(token: str) -> dict:
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token has expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")