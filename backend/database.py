import os
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv

# Load environmental variables from .env file
load_dotenv()

# Extract database connection string from environment
# Defaults to a local SQLite database for zero-config out-of-the-box execution
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./foodapp.db")

# Setup connection arguments
connect_args = {}
# SQLite requires specific threading arguments that are not used by MySQL
if DATABASE_URL.startswith("sqlite"):
    connect_args = {"check_same_thread": False}

# Create engine pool
engine = create_engine(
    DATABASE_URL, connect_args=connect_args
)

# Set up local session maker scope
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Declare declarative model base class
Base = declarative_base()

# Dependency helper to acquire database session scope per request
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
