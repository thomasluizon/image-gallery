const galleryImages = document.querySelectorAll('.gallery-img');
let getLatestOpenedImg;
const windowWidth = window.innerWidth;

if (galleryImages) {
   galleryImages.forEach((img, index) => {
      img.addEventListener('click', () => {
         // get image name

         let getImgCss = window.getComputedStyle(img);
         let getFullImgUrl = getImgCss.getPropertyValue('background-image');
         let getImgUrl = getFullImgUrl.split('/img/thumbs/');
         let setNewImgUrl = getImgUrl[1].replace('")', '');

         getLatestOpenedImg = index + 1;

         // create container img

         let container = document.body;
         let newImgWindow = document.createElement('div');
         container.appendChild(newImgWindow);
         newImgWindow.setAttribute('class', 'img-window');
         newImgWindow.setAttribute('onclick', 'closeImg()');

         let newImg = document.createElement('img');
         newImgWindow.appendChild(newImg);
         newImg.setAttribute('src', 'img/' + setNewImgUrl);
         newImg.setAttribute('id', 'current-img');

         let prevBtn = document.createElement('a');
         let prevBtnText = document.createTextNode('Prev');
         prevBtn.appendChild(prevBtnText);
         container.appendChild(prevBtn);
         prevBtn.setAttribute('class', 'img-btn-prev');
         prevBtn.setAttribute('onclick', 'changeImg(0)');

         let nextBtn = document.createElement('a');
         let nextBtnText = document.createTextNode('Next');
         nextBtn.appendChild(nextBtnText);
         nextBtn.innerText = 'Next';
         container.appendChild(nextBtn);
         nextBtn.setAttribute('class', 'img-btn-next');
         nextBtn.setAttribute('onclick', 'changeImg(1)');
      });
   });
}

function closeImg() {
   document.querySelector('.img-window').remove();
   document.querySelector('.img-btn-prev').remove();
   document.querySelector('.img-btn-next').remove();
}

function changeImg(changeDir) {
   document.querySelector('#current-img').remove();
   let getImgWindow = document.querySelector('.img-window');

   let newImg = document.createElement('img');
   getImgWindow.appendChild(newImg);
   let calcNewImg;

   if (changeDir === 1) {
      calcNewImg = getLatestOpenedImg + 1;
      if (calcNewImg > galleryImages.length) {
         calcNewImg = 1;
      }
   } else if (changeDir === 0) {
      calcNewImg = getLatestOpenedImg - 1;
      if (calcNewImg < 1) {
         calcNewImg = galleryImages.length;
      }
   }

   newImg.setAttribute('src', 'img/img' + calcNewImg + '.jpg');
   newImg.setAttribute('id', 'current-img');

   getLatestOpenedImg = calcNewImg;
}
