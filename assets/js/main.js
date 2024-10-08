

(function($) {

	var	$window = $(window),
		$body = $('body'),
		$main = $('#main');

	// Breakpoints.
		breakpoints({
			xlarge:   [ '1281px',  '1680px' ],
			large:    [ '981px',   '1280px' ],
			medium:   [ '737px',   '980px'  ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ '361px',   '480px'  ],
			xxsmall:  [ null,      '360px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Nav.
		var $nav = $('#nav');

		if ($nav.length > 0) {

			// Shrink effect.
				$main
					.scrollex({
						mode: 'top',
						enter: function() {
							$nav.addClass('alt');
						},
						leave: function() {
							$nav.removeClass('alt');
						},
					});

			// Links.
				var $nav_a = $nav.find('a');

				$nav_a
					.scrolly({
						speed: 1000,
						offset: function() { return $nav.height(); }
					})
					.on('click', function() {

						var $this = $(this);

						// External link? Bail.
							if ($this.attr('href').charAt(0) != '#')
								return;

						// Deactivate all links.
							$nav_a
								.removeClass('active')
								.removeClass('active-locked');

						// Activate link *and* lock it (so Scrollex doesn't try to activate other links as we're scrolling to this one's section).
							$this
								.addClass('active')
								.addClass('active-locked');

					})
					.each(function() {

						var	$this = $(this),
							id = $this.attr('href'),
							$section = $(id);

						// No section for this link? Bail.
							if ($section.length < 1)
								return;

						// Scrollex.
							$section.scrollex({
								mode: 'middle',
								initialize: function() {

									// Deactivate section.
										if (browser.canUse('transition'))
											$section.addClass('inactive');

								},
								enter: function() {

									// Activate section.
										$section.removeClass('inactive');

									// No locked links? Deactivate all links and activate this section's one.
										if ($nav_a.filter('.active-locked').length == 0) {

											$nav_a.removeClass('active');
											$this.addClass('active');

										}

									// Otherwise, if this section's link is the one that's locked, unlock it.
										else if ($this.hasClass('active-locked'))
											$this.removeClass('active-locked');

								}
							});

					});

		}

	// Scrolly.
		$('.scrolly').scrolly({
			speed: 1000
		});

})(jQuery);


document.addEventListener('DOMContentLoaded', function () {
	
    var menuToggle = document.getElementById('menu-toggle');
    var nav = document.getElementById('nav');

    menuToggle.addEventListener('click', function () {
        menuToggle.classList.toggle('active');
        nav.classList.toggle('active');
    });
});


const hamburger = document.querySelector('.hamburger-menu');
const mobileNav = document.querySelector('#mobile-nav');

hamburger.addEventListener('click', function() {
    hamburger.classList.toggle('hamburger-active');
    mobileNav.classList.toggle('active');
});

 // Seleciona o modal e elementos necessários
 var modal = document.getElementById("imageModal");
 var modalImg = document.getElementById("modalImage");
 var closeBtn = document.getElementsByClassName("close")[0];

 // Seleciona todas as imagens na galeria
 var galleryImages = document.querySelectorAll(".gallery .image img");

 // Adiciona o evento de clique a cada imagem da galeria
 galleryImages.forEach(function(img) {
	 img.onclick = function() {
		 modal.style.display = "block";
		 modalImg.src = this.src;
	 }
 });

 // Fecha o modal ao clicar no "X"
 closeBtn.onclick = function() {
	 modal.style.display = "none";
 }

 // Fecha o modal ao clicar fora da imagem
 modal.onclick = function(event) {
	 if (event.target == modal) {
		 modal.style.display = "none";
	 }
 }