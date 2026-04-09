from pydantic import BaseModel, ConfigDict
from datetime import datetime
from typing import Optional, List

class IESBase(BaseModel):
    name: str
    mec_code: str
    cnpj: str

class IESResponse(IESBase):
    id: int
    model_config = ConfigDict(from_attributes=True)

class CourseBase(BaseModel):
    name: str
    degree: str

class CourseResponse(CourseBase):
    id: int
    ies: IESResponse
    model_config = ConfigDict(from_attributes=True)

class StudentBase(BaseModel):
    name: str
    cpf: str
    birth_date: str
    naturalness: str
    rg: str
    sex: str

class StudentResponse(StudentBase):
    id: int
    model_config = ConfigDict(from_attributes=True)

class DiplomaResponse(BaseModel):
    id: int
    query_key: str
    validation_code: str
    issue_date: datetime
    status: str
    student: StudentResponse
    course: CourseResponse
    model_config = ConfigDict(from_attributes=True)

class ComplianceLogResponse(BaseModel):
    id: int
    action: str
    timestamp: datetime
    model_config = ConfigDict(from_attributes=True)
