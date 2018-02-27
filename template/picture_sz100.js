// TODO : unifier lunettes et z_yeux pour toggleZoom en fullscreen

	var formAffiche = true  // Affichage du formulaire
	var hasTouchscreen = 'ontouchstart' in window; // roughly detect all mobile devices (I want device without keyboard, without escape key)
	var isFullScreen = false // L'image stéréo est en plein écran, sinon est dans le corps de page
	var isZoom100_default = false // L'image stéréo est en mode zoom 100% (un pixel image par pixel écran), sinon en mode vue générale
	var isForCrossView = true // Le stéréogramme est monté en vison croisée, écrasé par la suite par $stereoZoom.isForCrossView
	var isFullWindow_default = false // Le stéréogramme est en pleine fenêtre
	
	
// variables qui seront définies dans le corps du template associé
// var imgDerivPath='{$current.selected_derivative->get_url()}'; 
// var imgOrigPath='{$STEREOZOOM_IMG_PATH}';
	
	// Initialisation de l'interface, liens/boutons de changement de mode
	window.onload = function(){
// 		console.log(document.cookie)
		
		if(hasTouchscreen) document.getElementById('toggleFullwindow').parentNode.style.display = 'none'

		
		document.getElementById('toggleZoom').onclick = function() {
			isZoom100=!isZoom100
			document.cookie = 'stereoZoom_isZoom100='+isZoom100+'; max-age='+60*60*24*7;
// 			console.log(document.cookie)
			
			zoomFit = document.getElementById('lunettes');
			zoom100 = document.getElementById('z_yeux');
			moveMode = document.getElementById('toggleDA').parentNode;
			
// 			if (isFullScreen) document.getElementById('toggleFullscreen').click()
				
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
		document.getElementById('toggleView').onclick = function() {
			isCrossView = !isCrossView
			document.cookie = 'stereoZoom_isCrossView='+isCrossView+'; max-age='+60*60*24*7;
// 			console.log(document.cookie)
			
			obj = document.getElementById('toggleView')
// 			isCrossView = !(obj.textContent=='Vision parallèle')
			if(isCrossView) {
				obj.textContent='Vision croisée'
				mesYeux = document.getElementById('yeux');
	// 			mesYeux.insertBefore(mesYeux.firstChild, null); // met le premier en dernier
				mesYeux.insertBefore(document.getElementById('vue_gauche'), null); // met la vue gauche en dernier
				
				mesYeux = document.getElementById('z_yeux');
	// 			mesYeux.insertBefore(mesYeux.firstChild, null); // met le premier en dernier
				mesYeux.insertBefore(document.getElementById('z_vue_gauche'), null); // met la vue gauche en dernier
			}
			else {
				obj.textContent='Vision parallèle'
				mesYeux = document.getElementById('yeux');
	// 			mesYeux.insertBefore(mesYeux.firstChild, null); // met le premier en dernier
				mesYeux.insertBefore(document.getElementById('vue_droite'), null); // met la vue gauche en dernier
				
				mesYeux = document.getElementById('z_yeux');
	// 			mesYeux.insertBefore(mesYeux.firstChild, null); // met le premier en dernier
				mesYeux.insertBefore(document.getElementById('z_vue_droite'), null); // met la vue gauche en dernier
			}
			return false
		}
		document.getElementById('toggleFullwindow').onclick = function() {
			if (!hasTouchscreen) {
			isFullWindow=!isFullWindow
			document.cookie = 'stereoZoom_isFullWindow='+isFullWindow+'; max-age='+60*60*24*7;
// 			console.log(document.cookie)
			
			zoomFit = document.getElementById('lunettes');
			zoom100 = document.getElementById('z_yeux');
			
				
			obj = document.getElementById('toggleFullwindow')
			if(isFullWindow) {
				// les deux modes sont rendus exclusifs l'un de l'autre
				if (isFullScreen) document.getElementById('toggleFullscreen').click();
					
				zoomFit.style.width = '100%' ;
				zoomFit.style.height = '100vh' ;
				zoomFit.style.position = 'fixed' ;
				zoomFit.style.left = '0px' ;
				zoomFit.style.top = '0px' ;
				zoomFit.style.margin = '0px' ;
				zoomFit.style.zIndex = '101' ;
				
				zoom100.style.width = '100%' ;
				zoom100.style.height = '100vh' ;
				zoom100.style.position = 'fixed' ;
				zoom100.style.left = '0px' ;
				zoom100.style.top = '0px' ;
				zoom100.style.margin = '0px' ;
				zoom100.style.zIndex = '101' ;
				
				obj.textContent='W full'
			}
			else {
				zoomFit.style.width = '' ;
				zoomFit.style.height = '' ;
				zoomFit.style.position = '' ;
				zoomFit.style.left = '' ;
				zoomFit.style.top = '' ;
				zoomFit.style.margin = '' ;
				zoomFit.style.zIndex = '' ;
				
				zoom100.style.width = '' ;
				zoom100.style.height = '' ;
				zoom100.style.position = '' ;
				zoom100.style.left = '' ;
				zoom100.style.top = '' ;
				zoom100.style.margin = '' ;
				zoom100.style.zIndex = '' ;
				
				obj.textContent='W'
			}
			}
			return false
		}
		document.getElementById('toggleFullscreen').onclick = function() {
			var elem = document.getElementById((isZoom100)?'z_yeux':'lunettes');
// 			console.log(elem)
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
// 			document.cookie = 'stereoZoom_isFullScreen='+isFullScreen+'; max-age='+0;
//  			console.log(document.cookie)

			if (isFullScreen) {
				// les deux modes sont rendus exclusifs l'un de l'autre
				if(isFullWindow) document.getElementById('toggleFullwindow').click();
			}
			handleFullscreen()
		};
		
		document.getElementById('vue_droite').ondblclick = 
		document.getElementById('z_vue_droite').ondblclick = function() {
			document.getElementById('linkPrev').click()
			return false
		}
		document.getElementById('vue_gauche').ondblclick = 
		document.getElementById('z_vue_gauche').ondblclick = function() {
			document.getElementById('linkNext').click()
			return false
		}
		
		isZoom100=eval(document.cookie.replace(/(?:(?:^|.*;\s*)stereoZoom_isZoom100\s*\=\s*([^;]*).*$)|^.*$/, '$1'))
		if(typeof isZoom100 === 'undefined') isZoom100 = isZoom100_default
		isZoom100=!isZoom100
		document.getElementById('toggleZoom').click()
		
		isCrossView=eval(document.cookie.replace(/(?:(?:^|.*;\s*)stereoZoom_isCrossView\s*\=\s*([^;]*).*$)|^.*$/, '$1'))
		if(typeof isCrossView === 'undefined') isCrossView = isForCrossView
		isCrossView=!isCrossView
		document.getElementById('toggleView').click()
				
		isFullWindow=eval(document.cookie.replace(/(?:(?:^|.*;\s*)stereoZoom_isFullWindow\s*\=\s*([^;]*).*$)|^.*$/, '$1'))
		if(typeof isFullWindow === 'undefined' || hasTouchscreen) isFullWindow = isFullWindow_default
		isFullWindow=!isFullWindow
		document.getElementById('toggleFullwindow').click()
		
		
		charge_image_derivative();
		charge_image();
		
	}
	
	Image.prototype.load = function(url){
        var thisImg = this;
		var SIimg = setInterval(function() {
			console.log(thisImg.completedPercentage+' %')
			document.getElementById('z_vue_droite').textContent=thisImg.completedPercentage+' % '
			document.getElementById('z_vue_gauche').textContent=' '+thisImg.completedPercentage+' %'
		}, 100);
        var xmlHTTP = new XMLHttpRequest();
        xmlHTTP.open('GET', url,true);
        xmlHTTP.responseType = 'arraybuffer';
        xmlHTTP.onload = function(e) {
            var blob = new Blob([this.response]);
            thisImg.src = window.URL.createObjectURL(blob);
            clearInterval(SIimg);
			document.getElementById('z_vue_droite').textContent=''
			document.getElementById('z_vue_gauche').textContent=''
        };
        xmlHTTP.onprogress = function(e) {
            thisImg.completedPercentage = parseInt((e.loaded / e.total) * 100);
        };
        xmlHTTP.onloadstart = function() {
            thisImg.completedPercentage = 0;
        };
        xmlHTTP.send();
    };

    Image.prototype.completedPercentage = 0;
	
	
	// ZoomFit : Image representative (résolution basse) chargement en mémoire et affichage
	var szFitImage=new Image();
	szFitImage.onload = function() {
		draw(this);
		handleFullscreen()
	};
	function draw(img) {
		var cv1 = document.getElementById((isForCrossView)?'vue_droite':'vue_gauche');
		var cv2 = document.getElementById((isForCrossView)?'vue_gauche':'vue_droite');
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
		uri = encodeURI(imgDerivPath) ;
		szFitImage.src=uri;
	}
	
		
	
	// Gestion du plein écran
	function handleFullscreen() {
		if (!isZoom100) {
			if (isFullScreen) {
				if (szFitImage.width/szFitImage.height > window.innerWidth/window.innerHeight) {
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
		
		var sz100Image;
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
				if(e.key=='w') document.getElementById('toggleFullwindow').click(); 
				if(e.key=='x') document.getElementById('toggleView').click(); 
				// In order to behave like FullScreen
				if(e.key=='Escape' && isFullWindow) document.getElementById('toggleFullwindow').click(); 
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
			
			
			var imgOrigUrl = document.getElementById('z_vue_droite').style.backgroundImage.replace(/url\((['"])?(.*?)\1\)/gi, '$2').split(',')[0];
			var sz100Image = new Image();
// 			sz100Image.src = imgOrigUrl;
			sz100Image.load(imgOrigUrl);
			
			sz100Image.onload = function () {
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
			document.getElementById((isForCrossView)?'z_vue_droite':'z_vue_gauche').style.backgroundPosition = x1+'px '+y1+'px' ;
			document.getElementById((isForCrossView)?'z_vue_gauche':'z_vue_droite').style.backgroundPosition = x2+'px '+y2+'px' ;  
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
			uri = encodeURI(imgOrigPath) ;
// 			alert('!!'+uri);
			document.getElementById('z_vue_droite').style.backgroundImage = 'url('+uri+')' ;
			document.getElementById('z_vue_gauche').style.backgroundImage = 'url('+uri+')' ;
			initialise_image() ;
		}
		
