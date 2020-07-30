function QRGenerator(url, size, format) {
  this.url = url;
  this.size = size;
  this.format = format;

  this.generatorUriTemplate = function generatorUriTemplate() {
    return `https://qrtag.net/api/qr_${this.size}.${this.format}?url=${this.url}`;
  };

  this.generate = function generate() {
    return this.generatorUriTemplate();
  };
}
