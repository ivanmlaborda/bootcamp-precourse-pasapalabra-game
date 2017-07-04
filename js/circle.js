var circle = document.getElementById('lettersCircle'),
        letters = document.getElementsByClassName('letter'),
        total = letters.length,
        coords = {},
        diam, radius1, radius2, imgW;

    // get circle diameter
    // getBoundingClientRect outputs the actual px AFTER transform
    //      using getComputedStyle does the job as we want
    diam = parseInt( window.getComputedStyle(circle).getPropertyValue('width') ),
    radius = diam/2,
    imgW = letters[0].getBoundingClientRect().width,
    // get the dimensions of the inner circle we want the images to align to
    radius2 = radius - imgW

    var i,
        alpha = Math.PI / 2,
        len = letters.length,
        corner = 2 * Math.PI / total;

    for ( i = 0 ; i < total; i++ ){

      letters[i].style.left = parseInt( ( radius - imgW / 2 ) + ( radius2 * Math.cos( alpha ) ) ) + 'px'
      letters[i].style.top =  parseInt( ( radius - imgW / 2 ) - ( radius2 * Math.sin( alpha ) ) ) + 'px'

      alpha = alpha - corner;
    }
