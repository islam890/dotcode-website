from getpass import getpass

from app.core.security import hash_password
from app.database import SessionLocal
from app.models import Admin

def create_admin():
    db = SessionLocal()
    
    try:
        name = input("Admin Name : ").strip()
        email = input("Admin Email : ").strip()
        password = getpass("Admin Password : ")
        confirm_password = getpass("Confirm Password : ")
        
        if password != confirm_password:
            print("Passwords do not match. Please try again.")
            return
        
        existing_admin = db.query(Admin).filter(Admin.email == email).first()
        if existing_admin:
            print("An admin with this email already exists.")
            return
        
        admin = Admin(
            name=name,
            email=email,
            password_hash=hash_password(password),
            is_active=True
        )
        
        db.add(admin)
        db.commit()
        print(f"Admin '{name}' created successfully.")
        
    except Exception as e:
        db.rollback()
        print(f"Error creating admin: {e}")
    
    finally:
        db.close()

if __name__ == "__main__":
    create_admin()