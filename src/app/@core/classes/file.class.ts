export class FileActions {
    protected download(fileAsBase64, fileName) {
    const downloadLink = document.createElement('a');
    downloadLink.href = fileAsBase64;
    downloadLink.download = fileName;
    downloadLink.click();
  }
  protected preview(fileAsBase64) {
    // Find the index of ':' and ';' in the base64 string
    const startIndex = fileAsBase64.indexOf(':') + 1;
    const endIndex = fileAsBase64.indexOf(';', startIndex);

    // Extract the data between ':' and ';'
    const contentType = fileAsBase64.substring(startIndex, endIndex);

    const byteCharacters = atob(
      fileAsBase64.substring(`data:${contentType};base64,`.length)
    );
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += 1024) {
      const slice = byteCharacters.slice(offset, offset + 1024);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }
    const blob = new Blob(byteArrays, { type: contentType });
    const blobUrl = URL.createObjectURL(blob);

    window.open(blobUrl, '_blank');
  }
}
