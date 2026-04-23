/**
 * SOLID principles:
 * - Single Responsibility Principle (SRP): Each class has one job.
 * - Open/Closed Principle: Service can be extended without modifying core logic.
 * - Dependency Inversion: UI doesn't care WHERE the data comes from.
 */

class DiplomaService {
    constructor() {
        this.mockData = {
            id: 1,
            queryKey: "ESTACIO2024-AD-HGRS-7788",
            validationCode: "2501.2501.bbf3daf3",
            issueDate: "2024-03-15T10:00:00Z",
            status: "Ativo",
            student: {
                name: "JOSÉ DA SILVA SAURO",
                cpf: "123.456.789-00",
                birth_date: "01/01/1990",
                naturalness: "Rio de Janeiro - RJ",
                rg: "12.345.678-9",
                sex: "Masculino"
            },
            course: {
                name: "ADMINISTRAÇÃO",
                degree: "Bacharelado"
            },
            ies: {
                name: "CENTRO UNIVERSITÁRIO ESTÁCIO DE RIBEIRÃO PRETO",
                mec_code: "2501",
                cnpj: "08.123.456/0001-99"
            },
            registration: {
                status: "Registrado",
                issue_date: "2024-03-15T10:00:00Z",
                query_key: "ESTACIO2024-AD-HGRS-7788",
                validation_code: "2501.2501.bbf3daf3"
            }
        };
    }

    async getDiploma(key) {
        // Simulating async fetch
        return new Promise((resolve) => {
            setTimeout(() => resolve(this.mockData), 500);
        });
    }

    getXmlUrl(key) {
        return "#"; // Mock URL
    }

    getRvddUrl(key) {
        return "#"; // Mock URL
    }
}

class UIManager {
    static updateStudentInfo(student, status) {
        document.getElementById('student-name').textContent = student.name;
        document.getElementById('student-cpf').textContent = student.cpf;
        document.getElementById('student-birth').textContent = student.birth_date;
        document.getElementById('student-naturalness').textContent = student.naturalness;
        document.getElementById('student-rg').textContent = student.rg;
        document.getElementById('student-sex').textContent = student.sex;
        document.getElementById('diploma-status').textContent = status;
    }

    static showAlert(title, details) {
        const message = Object.entries(details)
            .map(([key, value]) => `${key}: ${value}`)
            .join('\n');
        alert(`${title}\n\n${message}`);
    }
}

class App {
    constructor(service) {
        this.service = service;
    }

    async init() {
        const urlParams = new URLSearchParams(window.location.search);
        const queryKey = urlParams.get('key') || "ESTACIO2024-AD-HGRS-7788";

        try {
            const data = await this.service.getDiploma(queryKey);
            UIManager.updateStudentInfo(data.student, data.status);
            this.setupEvents(data);
        } catch (error) {
            console.error("Failed to load diploma:", error);
        }
    }

    setupEvents(data) {
        const queryKey = data.queryKey;

        document.getElementById('btn-xml').onclick = () => {
            alert("Baixando XML (Simulação)");
            window.location.href = this.service.getXmlUrl(queryKey);
        };

        document.getElementById('btn-rvdd').onclick = () => {
            alert("Baixando RVDD (Simulação)");
            window.location.href = this.service.getRvddUrl(queryKey);
        };

        document.getElementById('btn-conformidade').onclick = () => {
            window.open("https://verificadordiplomadigital.mec.gov.br/diploma", "_blank");
        };

        document.getElementById('btn-ies').onclick = () => {
            UIManager.showAlert("Dados da IES Emissora", {
                "Nome": data.ies.name,
                "Código MEC": data.ies.mec_code,
                "CNPJ": data.ies.cnpj
            });
        };

        document.getElementById('btn-curso').onclick = () => {
            UIManager.showAlert("Dados do Curso", {
                "Curso": data.course.name,
                "Nível": data.course.degree
            });
        };

        document.getElementById('btn-registro').onclick = () => {
            UIManager.showAlert("Dados do Registro", {
                "Status": data.registration.status,
                "Data Emissão": new Date(data.registration.issue_date).toLocaleDateString(),
                "Chave": data.registration.query_key,
                "Código Validação": data.registration.validation_code
            });
        };
    }
}

// Start Application
const app = new App(new DiplomaService());
window.addEventListener('DOMContentLoaded', () => app.init());
