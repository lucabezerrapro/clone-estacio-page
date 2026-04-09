from sqlalchemy.orm import Session
from app.db.session import SessionLocal, engine
from app.models.models import Base, IES, Student, Course, Diploma, DiplomaStatus
from datetime import datetime

def seed_data():
    # Create tables if they don't exist
    Base.metadata.create_all(bind=engine)
    
    db = SessionLocal()
    
    # Check if we already have data
    if db.query(Diploma).first():
        print("Data already exists. Skipping seed.")
        db.close()
        return

    print("Seeding database...")
    
    # Create IES
    estacio = IES(
        name="Centro Universitário Estácio de Goiás",
        mec_code="12345",
        cnpj="01.234.567/0001-89"
    )
    db.add(estacio)
    db.commit()
    
    # Create Course
    curso = Course(
        name="ADMINISTRAÇÃO",
        degree="Bacharelado",
        ies_id=estacio.id
    )
    db.add(curso)
    db.commit()
    
    # Create Student
    student = Student(
        name="HELLEN GEANNE REZENDE SILVA",
        cpf="062.934.961-40",
        birth_date="10/06/2001",
        naturalness="GOIÂNIA",
        rg="6342894",
        sex="Feminino"
    )
    db.add(student)
    db.commit()
    
    # Create Diploma
    diploma = Diploma(
        query_key="ESTACIO2024-AD-HGRS-7788",
        validation_code="ABC-123-XYZ-999000",
        issue_date=datetime.utcnow(),
        status=DiplomaStatus.ATIVO,
        student_id=student.id,
        course_id=curso.id,
        xml_content="<xml><diploma>Certificado Digital de Hellen Geanne</diploma></xml>",
        rvdd_content="RVDD Binary Simulation Content for Hellen Geanne"
    )
    db.add(diploma)
    db.commit()
    
    print("Seed completed successfully!")
    db.close()

if __name__ == "__main__":
    seed_data()
