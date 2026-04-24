function downloadRVDD() {
  // caminho do arquivo dentro da pasta Arquivos
  const caminho = "../arquivos/documento.pdf"; // troque pelo nome real

  const link = document.createElement("a");
  link.href = caminho;
  link.download = "documento.pdf"; // nome do arquivo para download

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}