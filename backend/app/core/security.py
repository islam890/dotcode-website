from datetime import datetime, timedelta, timezone

from argon2 import PasswordHasher
from argon2.exceptions import VerificationError
from jose import jwt

password_hasher = PasswordHasher()

def hash_password(password: str) -> str:
    return password_hasher.hash(password)


def verify_password(password: str, password_hash: str) -> bool:
    try:
        password_hasher.verify(password_hash, password)
        return True
    except VerificationError:
        return False


def create_access_token(
    data: dict,
    secret_key: str,
    algorithm: str,
    expires_minutes: int
) -> str:
    to_encode = data.copy()
    
    expire = datetime.now(timezone.utc) + timedelta(minutes=expires_minutes)
    
    to_encode.update({"exp": expire})
    
    return jwt.encode(to_encode, secret_key, algorithm=algorithm)


def decode_access_token(
    token: str,
    secret_key: str,
    algorithm: str
) -> dict:
    return jwt.decode(token, secret_key, algorithms=[algorithm])