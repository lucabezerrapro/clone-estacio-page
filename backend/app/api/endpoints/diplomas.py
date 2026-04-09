from fastapi import APIRouter, Depends, HTTPException, Response, Request
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.models.models import Diploma, ComplianceLog, Student, Course, IES
from app.schemas.schemas import DiplomaResponse, IESResponse, CourseResponse
from typing import List
import json

router = APIRouter()

def log_action(db: Session, diploma_id: int, action: str, request: Request):
    log = ComplianceLog(
        diploma_id=diploma_id,
        action=action,
        metadata_json=json.dumps({
            "ip": request.client.host,
            "user_agent": request.headers.get("user-agent")
        })
    )
    db.add(log)
    db.commit()

@router.get("/{query_key}", response_model=DiplomaResponse)
def get_diploma_by_key(query_key: str, request: Request, db: Session = Depends(get_db)):
    diploma = db.query(Diploma).filter(Diploma.query_key == query_key).first()
    if not diploma:
        raise HTTPException(status_code=404, detail="Diploma não encontrado")
    
    log_action(db, diploma.id, "SEARCHED", request)
    return diploma

@router.get("/{query_key}/xml")
def download_xml(query_key: str, request: Request, db: Session = Depends(get_db)):
    diploma = db.query(Diploma).filter(Diploma.query_key == query_key).first()
    if not diploma or not diploma.xml_content:
        raise HTTPException(status_code=404, detail="XML não disponível")
    
    log_action(db, diploma.id, "XML_DOWNLOAD", request)
    
    return Response(
        content=diploma.xml_content,
        media_type="application/xml",
        headers={"Content-Disposition": f"attachment; filename=diploma_{query_key}.xml"}
    )

@router.get("/{query_key}/rvdd")
def download_rvdd(query_key: str, request: Request, db: Session = Depends(get_db)):
    diploma = db.query(Diploma).filter(Diploma.query_key == query_key).first()
    if not diploma or not diploma.rvdd_content:
        raise HTTPException(status_code=404, detail="RVDD não disponível")
    
    log_action(db, diploma.id, "RVDD_DOWNLOAD", request)
    
    return Response(
        content=diploma.rvdd_content,
        media_type="application/octet-stream",
        headers={"Content-Disposition": f"attachment; filename=diploma_{query_key}.rvdd"}
    )

@router.get("/{query_key}/ies", response_model=IESResponse)
def get_ies_data(query_key: str, db: Session = Depends(get_db)):
    diploma = db.query(Diploma).filter(Diploma.query_key == query_key).first()
    if not diploma:
        raise HTTPException(status_code=404, detail="IES não encontrada para esta chave")
    return diploma.course.ies

@router.get("/{query_key}/course", response_model=CourseResponse)
def get_course_data(query_key: str, db: Session = Depends(get_db)):
    diploma = db.query(Diploma).filter(Diploma.query_key == query_key).first()
    if not diploma:
        raise HTTPException(status_code=404, detail="Curso não encontrado para esta chave")
    return diploma.course

@router.get("/{query_key}/registration")
def get_registration_data(query_key: str, db: Session = Depends(get_db)):
    diploma = db.query(Diploma).filter(Diploma.query_key == query_key).first()
    if not diploma:
        raise HTTPException(status_code=404, detail="Registro não encontrado para esta chave")
    
    return {
        "status": diploma.status,
        "issue_date": diploma.issue_date,
        "validation_code": diploma.validation_code,
        "query_key": diploma.query_key
    }
