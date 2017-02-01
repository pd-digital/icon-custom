(function($) {

  var PdGalleria = function() {
    var COLUMNS = 2
    var TRANSITION_SPEED = 300

    this.prevButton = $('.pd-product-galleria .owl-prev')
    this.nextButton = $('.pd-product-galleria .owl-next')
    this.imagesWrapper = $('.pd-product-galleria-images')
    this.images = $('.pd-product-galleria .main-product-image')
    this.firstImage = $('.main-product-image.hidden-phone').first()
    this.currentImageIndex = 0

    this.getImageWidth = function() {
      return this.firstImage.width() +
          parseInt( this.firstImage.css('marginLeft'), 10 ) +
          parseInt( this.firstImage.css('marginRight'), 10 )
    }

    this.setPdGalleriaSize = function() {
      var width = this.getImageWidth() * this.images.size()
      this.imagesWrapper.css('width', width)
    }

    this.showAllImages = function() {
      this.images.show()
    }

    this.maxOffset = function() {
      return (this.getImageCount() - COLUMNS) * this.getImageWidth() * -1
    }

    this.addBindings = function() {
      this.prevButton.on('click', this.onPrevClick.bind(this))
      this.nextButton.on('click', this.onNextClick.bind(this))
    }

    this.getImageOffset = function($image) {
      return parseInt( $image.css('transform').split(',')[4], 10 ) || 0
    }

    this.onNextClick = function() {
      if (this.atLastImage()) return false

      this.currentImageIndex += 1
      this.moveTheImagesIdiot()
      this.setButtonState()
    }

    this.onPrevClick = function() {
      if (this.atFirstImage()) return false

      this.currentImageIndex -= 1
      this.moveTheImagesIdiot()
      this.setButtonState()
    }

    this.moveTheImagesIdiot = function() {
      var translation = -1 * this.currentImageIndex * this.getImageWidth()
      this.images.each(function() {
        $(this).css({ transform: 'translateX(' + translation + 'px)' })
      })
    }

    this.atFirstImage = function() {
      return this.currentImageIndex === 0
    }

    this.atLastImage = function() {
      return this.currentImageIndex === this.images.size() - COLUMNS
    }

    this.setButtonState = function() {
      this.prevButton.attr('data-disabled', this.atFirstImage())
      this.nextButton.attr('data-disabled', this.atLastImage())
    }

    this.init = function() {
      console.log('pd-galleria', 'init')

      this.setPdGalleriaSize()
      this.showAllImages()
      this.addBindings()
      this.setButtonState()
    }
  }

  var pdGalleria = new PdGalleria()
  pdGalleria.init()
})(jQuery)
