

	var formAffiche = true  // Affichage du formulaire
	var isFullScreen = false // L'image stéréo est en plein écran, sinon est dans le corps de page
	var isZoom100 = true // L'image stéréo est en mode zoom 100% (un pixel image par pixel écran), sinon en mode vue générale
	
	// Initialisation de l'interface, liens/boutons de changement de mode
	window.onload = function(){
		document.getElementById('toggleZoom').onclick = function() {
			isZoom100=!isZoom100
			
			zoomFit = document.getElementById('lunettes');
			zoom100 = document.getElementById('z_yeux');
			moveMode = document.getElementById('toggleDA').parentNode;
			
			if (isFullScreen) document.getElementById('toggleFullscreen').click()
				
			obj = document.getElementById('toggleZoom')
			if(isZoom100) {
				zoomFit.style.display = 'none' ;
				zoom100.style.display = 'flex' ;
				moveMode.style.display = 'inline' ;
				obj.textContent='Z 100%'
			}
			else {
				zoomFit.style.display = 'block' ;
				zoom100.style.display = 'none' ;
				moveMode.style.display = 'none' ;
				obj.textContent='Z Fit'
			}
			
			return false
		}
		document.getElementById('toggleLP').onclick = function() {
			mesYeux = document.getElementById('yeux');
			mesYeux.insertBefore(mesYeux.firstChild, null); // met le premier en dernier
			
			mesYeux = document.getElementById('z_yeux');
			mesYeux.insertBefore(mesYeux.firstChild, null); // met le premier en dernier
			
			obj = document.getElementById('toggleLP')
			if(obj.textContent=='Vision parallèle') {
				obj.textContent='Vision croisée'
			}
			else {
				obj.textContent='Vision parallèle'
			}
			return false
		}
		document.getElementById('toggleFullscreen').onclick = function() {
			var elem = document.getElementById((isZoom100)?'z_yeux':'lunettes');
			if (isFullScreen) {
// 				document.exitFullscreeddn();
// 				elem.exitFullscreen();
				if (document.exitFullscreen) {
					document.exitFullscreen();
				} 
				else if (document.msExitFullscreen) {
					document.msExitFullscreen();
				} 
				else if (document.mozCancelFullScreen) {
					document.mozCancelFullScreen();
				} 
				else if (document.webkitExitFullscreen) {
					document.webkitExitFullscreen();
				} 
				else {alert(document.exitFullscreen ||		//W3C
					document.exitFullScreen ||		//W3C
					document.webkitExitFullscreen ||	//Chrome etc.
					document.webkitExitFullScreen ||	//Chrome etc.
					document.webkitCancelFullscreen ||	//Chrome etc.
					document.webkitCancelFullScreen ||	//Chrome etc.
					document.mozCancelFullscreen ||		//FireFox
					document.mozCancelFullScreen ||		//FireFox
					document.mozExitFullscreen ||		//FireFox
					document.mozExitFullScreen ||		//FireFox
					document.msExitFullscreen ||		//IE11
					document.msExitFullScreen)}
			}
			else {
				if (elem.requestFullscreen) {
					elem.requestFullscreen();
				} 
				else if (elem.msRequestFullscreen) {
					elem.msRequestFullscreen();
				} 
				else if (elem.mozRequestFullScreen) {
					elem.mozRequestFullScreen();
				} 
				else if (elem.webkitRequestFullscreen) {
					elem.webkitRequestFullscreen();
				} 
				else {alert('mop')}
			}
			return false
		}
		document.onwebkitfullscreenchange = document.onmozfullscreenchange = document.onfullscreenchange = function( event ) {
			isFullScreen=!isFullScreen
			handleFullscreen()
		};
		
		document.getElementById('toggleZoom').click()
		charge_image_derivative();
		charge_image();
		
	}
	
	
	// Zoom100% : Image originale (résolution maximale) chargement en mémoire et affichage
	var monImage=new Image();
	monImage.onload = function() {
		draw(this);
		handleFullscreen()
	};
	function draw(img) {
		var cv1 = document.getElementById('vue_droite');
		var cv2 = document.getElementById('vue_gauche');
		// canvas à la taille de l'image (pour chaque vue)
		cv1.width=cv2.width=img.width/2;
		cv1.height=cv2.height=img.height;
// 		console.log(cv1.width, cv1.height);
		var ctx1 = cv1.getContext('2d');
		var ctx2 = cv2.getContext('2d');
		ctx1.drawImage(img, 0, 0, img.width/2, img.height, 0, 0, img.width/2, img.height);
		ctx2.drawImage(img, img.width/2, 0, img.width/2, img.height, 0, 0, img.width/2, img.height);
	}
	function charge_image_derivative()
	{
		uri = encodeURI(document.getElementById('imgrelpath').value) ;
		monImage.src=uri;
	}
	
		
	
	// Gestion du plein écran
	function handleFullscreen() {
		if (!isZoom100) {
			if (isFullScreen) {
				if (monImage.width/monImage.height > window.innerWidth/window.innerHeight) {
					document.getElementById('lunettes').style.overflowY='visible';
					
					document.getElementById('yeux').style.marginTop='50vh';
					document.getElementById('yeux').style.transform='translateY(-50%)';
				}
				else {
					document.getElementById('lunettes').style.overflowY='scroll';
					
					document.getElementById('yeux').style.marginTop='auto';
					document.getElementById('yeux').style.transform='none';
				}
			}
			else {
				document.getElementById('lunettes').style.overflowY='visible';
				
				document.getElementById('yeux').style.marginTop='auto';
				document.getElementById('yeux').style.transform='none';
			}
		}
	}
	
	
	//  Zoom100% : Gestion du déplacement 
		
		var imageTest;
		var SI1, SI2;
		var x, y ;
		var etat = 1 ;
		var formAffiche = true ;
		
		var dblctimer = 0;
		var dblcdelay = 300;
		var dblcprevent = false;
		var dblctouchscreen = false;
		var dblcccpt = 0;
		
		var Xd, Yd, Xm, Ym; // mouse down, move position
		var x1, y1, x2, y2; // img dynamic
		var X1, Y1, X2, Y2; // img static
		
		X1 = X2 = -0 ;
		Y1 = Y2 = -0 ; 
		x1 = X1 ;
		y1 = Y1 ;    
		x2 = X2 ;
		y2 = Y2 ;      
				
		
		function initialise_image()
		{
			document.getElementById('z_yeux').onmousedown = document.getElementById('z_yeux').ontouchstart = function(evt){
				Xm = Xd = evt.clientX || evt.touches[0].pageX
				Ym = Yd = evt.clientY || evt.touches[0].pageY
				clearInterval(SI1);
				SI1=setInterval(function () {
					moveimage(Xm-Xd, Ym-Yd)
					switch (etat) {
						case 0 : {document.getElementById('z_vue_droite').style.cursor = document.getElementById('z_vue_gauche').style.cursor = '' ; break;}
						case 1 : {document.getElementById('z_vue_droite').style.cursor = document.getElementById('z_vue_gauche').style.cursor = 'grabbing' ; break;}
						case 2 : {document.getElementById('z_vue_droite').style.cursor = 'wait'; document.getElementById('z_vue_gauche').style.cursor = 'grabbing' ; break;}
					}
				}, 50);
			}
			document.getElementById('z_yeux').onmousemove = document.getElementById('z_yeux').ontouchmove = function(evt){
				Xm = evt.clientX || evt.touches[0].pageX
				Ym = evt.clientY || evt.touches[0].pageY
//  				document.getElementById('info').textContent = etat+' '+x1+'px '+y1+'px | '+x2+'px '+y2+'px | '+X1+'px '+Y1+'px | '+X2+'px '+Y2+'px | '+Xm+'px '+Ym+'px | '+Xd+'px '+Yd+'px' ;
			}
			document.getElementById('z_yeux').onmouseout = document.getElementById('z_yeux').onmouseup = document.getElementById('z_yeux').ontouchend = document.getElementById('z_yeux').ontouchcancel = function(evt){
				clearInterval(SI1);
				X1 = x1
				Y1 = y1
				X2 = x2
				Y2 = y2
				document.getElementById('z_vue_droite').style.cursor = document.getElementById('z_vue_gauche').style.cursor = 'grab' ; 
			}
			document.onkeydown = function (e){
//                 alert("Key Pressed: " + String.fromCharCode(e.key) + "\n"+ "key: " + e.key + "\n"+ "CTRL key pressed: " + e.ctrlKey + "\n");
				if(e.ctrlKey || (e.key=='Control')) change_synchro('a');
				if(e.key=='z') document.getElementById('toggleZoom').click(); 
				if(e.key=='f') document.getElementById('toggleFullscreen').click(); 
				if(e.key=='x') document.getElementById('toggleLP').click(); 
// 				if(e.key=='c') formAffiche=!formAffiche; 
// 				document.getElementById('form').style.opacity = formAffiche?1:0 ; 
			}
			document.onkeyup = function (e){
//                 alert(e.key);
				if(e.key=='Control') change_synchro('d');
			}
			document.getElementById('toggleDA').onclick = function() {
				obj = document.getElementById('toggleDA')
				if(obj.textContent=='Ajustement') {
					change_synchro('d');
				}
				else {
					change_synchro('a');
				}
				return false
			}
			
			
			var imageSrc = document.getElementById('z_vue_droite').style.backgroundImage.replace(/url\((['"])?(.*?)\1\)/gi, '$2').split(',')[0];
			var imageTest = new Image();
			imageTest.src = imageSrc;
			imageTest.onload = function () {
				X1 = -this.width/4;
				Y1 = -this.height/2;    

				X2 = -this.width*3/4;
				Y2 = Y1; 
// 				X1=X2=Y1=Y2=0
// 				console.log(X1, Y1, X2, Y2);
				moveimage(window.innerWidth/4, window.innerHeight/2);
				change_synchro('d');
			};

		}
		function moveimage(dx,dy) 
		{

			x1 = X1 ;
			y1 = Y1 ;    
			x2 = X2 ;
			y2 = Y2 ;      
			switch(etat)
			{
				case 1 :
				{
					x1 += dx ;
					y1 += dy ;    
					x2 += dx ;
					y2 += dy ;                    
					break;
				}
				case 2 :
				{ 
					x1 += 0 ;
					y1 += 0 ;    
					x2 += dx ;
					y2 += dy ;                    
					break;
				}
			}         
			document.getElementById('z_vue_droite').style.backgroundPosition = x1+'px '+y1+'px' ;
			document.getElementById('z_vue_gauche').style.backgroundPosition = x2+'px '+y2+'px' ;  
		}
		function change_synchro(val)
		{
			X1 = x1;
			Y1 = y1;    
			X2 = x2;
			Y2 = y2;     
			Xd = Xm;
			Yd = Ym;     
			obj = document.getElementById('toggleDA')
			switch(val) {
				case 'd' : {
					etat=1 ; 
					obj.textContent='Déplacement'
				break;
				}
				case 'a' : {
					etat=2 ; 
					obj.textContent='Ajustement'
				break;
				}
			}
		}
		function charge_image()
		{
			uri = encodeURI(document.getElementById('imgpath').value) ;
// 			alert('!!'+uri);
			document.getElementById('z_vue_droite').style.backgroundImage = 'url('+uri+')' ;
			document.getElementById('z_vue_gauche').style.backgroundImage = 'url('+uri+')' ;
			initialise_image() ;
		}
		
