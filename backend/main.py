from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import engine, Base
from routers import products
from seed import seed_database

app = FastAPI(
    title="Tienda de Presas de Escalada",
    description="API para tienda online de presas de escalada",
    version="1.0.0",
)

# CORS — permitir que el frontend React se conecte
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Registrar routers
app.include_router(products.router)


@app.on_event("startup")
def on_startup():
    Base.metadata.create_all(bind=engine)
    seed_database()


@app.get("/")
def root():
    return {
        "message": "Bienvenido a la API de Presas de Escalada 🧗",
        "docs": "/docs",
    }
