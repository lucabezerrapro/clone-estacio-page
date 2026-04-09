from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Text, Enum
from sqlalchemy.orm import relationship, declarative_base
from datetime import datetime
import enum

Base = declarative_base()

class DiplomaStatus(str, enum.Enum):
    ATIVO = "Ativo"
    INATIVO = "Inativo"
    REVOGADO = "Revogado"

class IES(Base):
    __tablename__ = "ies"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    mec_code = Column(String(50), nullable=False, unique=True)
    cnpj = Column(String(20), nullable=False, unique=True)
    
    courses = relationship("Course", back_populates="ies")

class Student(Base):
    __tablename__ = "students"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    cpf = Column(String(14), nullable=False, unique=True)
    birth_date = Column(String(10), nullable=False) # Store as string for simplicity in simulation
    naturalness = Column(String(100), nullable=False)
    rg = Column(String(20), nullable=False)
    sex = Column(String(10), nullable=False)
    
    diplomas = relationship("Diploma", back_populates="student")

class Course(Base):
    __tablename__ = "courses"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    degree = Column(String(100), nullable=False) # e.g., "Bacharelado"
    ies_id = Column(Integer, ForeignKey("ies.id"))
    
    ies = relationship("IES", back_populates="courses")
    diplomas = relationship("Diploma", back_populates="course")

class Diploma(Base):
    __tablename__ = "diplomas"
    id = Column(Integer, primary_key=True, index=True)
    query_key = Column(String(100), unique=True, index=True, nullable=False)
    validation_code = Column(String(100), unique=True, nullable=False)
    issue_date = Column(DateTime, default=datetime.utcnow)
    status = Column(String(20), default=DiplomaStatus.ATIVO)
    
    student_id = Column(Integer, ForeignKey("students.id"))
    course_id = Column(Integer, ForeignKey("courses.id"))
    
    xml_content = Column(Text, nullable=True)
    rvdd_content = Column(Text, nullable=True)
    
    student = relationship("Student", back_populates="diplomas")
    course = relationship("Course", back_populates="diplomas")
    logs = relationship("ComplianceLog", back_populates="diploma")

class ComplianceLog(Base):
    __tablename__ = "compliance_logs"
    id = Column(Integer, primary_key=True, index=True)
    diploma_id = Column(Integer, ForeignKey("diplomas.id"))
    action = Column(String(50)) # e.g., "SEARCHED", "XML_DOWNLOAD", "RVDD_DOWNLOAD"
    timestamp = Column(DateTime, default=datetime.utcnow)
    metadata_json = Column(Text, nullable=True) # Browser, IP, etc.
    
    diploma = relationship("Diploma", back_populates="logs")
