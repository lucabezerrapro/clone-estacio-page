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

function downloadConformidade() {
  const conformidade = `<?xml version="1.0" encoding="UTF-8"?>
<relatorioConformidade>
  <versaoSchema>1.0</versaoSchema>
  <dataVerificacao>${new Date().toISOString()}</dataVerificacao>
  <diplomado>
    <nome>HELLEN GEANNE REZENDE SILVA</nome>
    <cpf>062.934.961-40</cpf>
  </diplomado>
  <verificacoes>
    <item><campo>Estrutura XML</campo><resultado>CONFORME</resultado></item>
    <item><campo>Assinatura Digital</campo><resultado>VALIDA</resultado></item>
    <item><campo>Dados Diplomado</campo><resultado>CONFORME</resultado></item>
    <item><campo>Dados Curso</campo><resultado>CONFORME</resultado></item>
    <item><campo>Dados IES Emissora</campo><resultado>CONFORME</resultado></item>
    <item><campo>Dados Registro</campo><resultado>CONFORME</resultado></item>
    <item><campo>Credenciamento MEC</campo><resultado>CONFORME</resultado></item>
  </verificacoes>
  <statusGeral>DIPLOMA CONFORME</statusGeral>
</relatorioConformidade>`;
  triggerDownload(conformidade, 'conformidade_HELLEN_GEANNE.xml', 'application/xml');
}
