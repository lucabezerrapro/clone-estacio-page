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

function downloadXML() {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<diploma>
  <dadosDiplomado>
    <nome>HELLEN GEANNE REZENDE SILVA</nome>
    <cpf>062.934.961-40</cpf>
    <dataNascimento>10/06/2001</dataNascimento>
    <naturalidade>GOIANIA</naturalidade>
    <rg>6342894</rg>
    <sexo>Feminino</sexo>
  </dadosDiplomado>
  <dadosCurso>
    <nome>NUTRICAO</nome>
    <codigoINEP>1222223</codigoINEP>
    <tituloConferido>BACHAREL A EM NUTRICAO</tituloConferido>
    <grau>Bacharelado</grau>
  </dadosCurso>
  <dadosIES>
    <nome>CENTRO UNIVERSITARIO ESTACIO DE GOIAS</nome>
    <codigoMEC>2501</codigoMEC>
    <cnpj>34572290000194</cnpj>
  </dadosIES>
  <dadosRegistro>
    <livroRegistro></livroRegistro>
    <numeroFolha>588</numeroFolha>
    <numeroSequencia>1512203</numeroSequencia>
    <processoDiploma>66785227</processoDiploma>
    <dataExpedicaoTitulo>15/08/2025</dataExpedicaoTitulo>
    <dataExpedicaoDiploma>27/08/2025</dataExpedicaoDiploma>
    <dataRegistroDiploma>27/08/2025</dataRegistroDiploma>
  </dadosRegistro>
  <status>Ativo</status>
</diploma>`;
  triggerDownload(xml, 'diploma_HELLEN_GEANNE.xml', 'application/xml');
}
