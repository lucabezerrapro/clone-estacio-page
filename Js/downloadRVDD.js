function triggerDownload(content, filename, mimeType) {
  const blob = new Blob([content], { type: mimeType });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function downloadRVDD() {
  const rvdd = `<?xml version="1.0" encoding="UTF-8"?>
<RVDD xmlns="http://portal.mec.gov.br/diplomadigital/arquivos-em-xsd">
  <infRVDD Id="RVDD_06293496140_20250827">
    <dadosDiplomado>
      <nome>HELLEN GEANNE REZENDE SILVA</nome>
      <cpf>06293496140</cpf>
      <dataNascimento>2001-06-10</dataNascimento>
      <naturalidade>GOIANIA</naturalidade>
      <RG>
        <numero>6342894</numero>
        <orgaoExpedidor>SSP</orgaoExpedidor>
        <UF>GO</UF>
      </RG>
      <sexo>F</sexo>
    </dadosDiplomado>
    <dadosCurso>
      <nomeCurso>NUTRICAO</nomeCurso>
      <codigoCursoINEP>1222223</codigoCursoINEP>
      <tituloConferido>BACHAREL A EM NUTRICAO</tituloConferido>
      <grauConferido>Bacharelado</grauConferido>
      <dataColacaoGrau>2025-03-03</dataColacaoGrau>
    </dadosCurso>
    <dadosIES>
      <nome>CENTRO UNIVERSITARIO ESTACIO DE GOIAS</nome>
      <codigoMEC>2501</codigoMEC>
      <CNPJ>34572290000194</CNPJ>
    </dadosIES>
    <dadosRegistro>
      <numeroFolhaDiploma>588</numeroFolhaDiploma>
      <numeroSequenciaDiploma>1512203</numeroSequenciaDiploma>
      <processoDiploma>66785227</processoDiploma>
      <dataExpedicaoTitulo>2025-08-15</dataExpedicaoTitulo>
      <dataExpedicaoDiploma>2025-08-27</dataExpedicaoDiploma>
      <dataRegistroDiploma>2025-08-27</dataRegistroDiploma>
    </dadosRegistro>
  </infRVDD>
</RVDD>`;
  triggerDownload(rvdd, 'RVDD_HELLEN_GEANNE.xml', 'application/xml');
}
