async function downloadXML() {
  const response = await fetch('../arquivos/documento.xml');
  const blob = await response.blob();

  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = 'documento.xml';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  URL.revokeObjectURL(url);
}