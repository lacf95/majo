var urlInput = document.getElementById('url');
var pixelSizeSelect = document.getElementById('pixel-size');
var imageFormatButtons = document.querySelectorAll('input[name="image-format"]');
var generateQrButton = document.getElementById('generate-qr');
var downloadQrButton = document.getElementById('download-qr');
var generatedImage = document.getElementById('generated-image');

[].slice.call(imageFormatButtons).forEach(function(element) {
  element.addEventListener('click', function (event) {
    var target = event.target;
    [].slice.call(imageFormatButtons).forEach(function(element) {
      if (element.value === target.value) {
        element.setAttribute('checked', true);
      } else {
        element.removeAttribute('checked');
      }
    });
  });
});

generateQrButton.addEventListener('click', function() {
  var url = urlInput.value;
  var pixelSize = pixelSizeSelect.options[pixelSizeSelect.selectedIndex].value;
  var formatInput = document.querySelector('input[name="image-format"][checked]');
  var imageFormat = formatInput.value;
  var qrImageUrl = new QRGenerator(url, pixelSize, imageFormat).generate();
  generatedImage.src = qrImageUrl;
});

downloadQrButton.addEventListener('click', function() {
  var clickeableImage = document.createElement('a');
  clickeableImage.setAttribute('download', true);
  clickeableImage.setAttribute('hidden', true);
  clickeableImage.setAttribute('target', '_blank');
  clickeableImage.href = generatedImage.src;
  document.querySelector('body').appendChild(clickeableImage);
  clickeableImage.click();
  document.querySelector('body').removeChild(clickeableImage);
});
