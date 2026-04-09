from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.endpoints import diplomas
from app.core.config import settings

app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json"
)

# Set all CORS enabled origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(diplomas.router, prefix=f"{settings.API_V1_STR}/diplomas", tags=["diplomas"])

@app.get("/")
def root():
    return {"message": "Bem-vindo à API de Consulta de Diplomas da Estácio (Clone)"}
