const imageElements = document.querySelectorAll('.img');

imageElements.forEach(img => {
  img.addEventListener('click', () => {
     // add fullsize class if the user clicked an image
     img.classList.toggle("fullsize");

    // Remove the 'fullsize' class from all images
    imageElements.forEach(otherImg => {
      if (otherImg !== img) {
        otherImg.classList.remove("fullsize");
      }
    });
  });
});
