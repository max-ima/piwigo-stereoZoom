// TODO : unifier lunettes et z_yeux pour toggleZoom en fullscreen

var formAffiche = true  // Affichage du formulaire

// roughly detect all mobile devices (I want device without keyboard, without escape key)
var hasTouchscreen = 'ontouchstart' in window; 
hasTouchscreen = false

var isFullScreen = false // L'image stéréo est en plein écran, sinon est dans le corps de page
var isZoom100
var isZoom100_default = false // L'image stéréo est en mode zoom 100% (un pixel image par pixel écran), sinon en mode vue générale
var isCrossView = true // Le stéréogramme est présenté en vison croisée
var isForCrossView = true // Le stéréogramme est monté en vison croisée, écrasé par la suite par $stereoZoom.isForCrossView
var isFullWindow = false // Le stéréogramme est en pleine fenêtre
var isFullWindow_default = false // Le stéréogramme est en pleine fenêtre

var cookieMaxAge = 60*60*24*7 // 7 jours


var stateObj = { foo: 1 }


var szHidden ;
var szDisplay ;
var szFitBox;
var szFitEyes ;
var sz100Box ;

// variables qui seront définies dans le corps du template associé
// var imgDerivPath='{$current.selected_derivative->get_url()}'; 
// var imgOrigPath='{$STEREOZOOM_IMG_PATH}';

// Initialisation de l'interface, liens/boutons de changement de mode
window.onload = function(){
		szHidden = document.getElementById('szHidden');
		szDisplay = document.getElementById('szDisplay');
		szFitBox = document.getElementById('lunettes');
		szFitEyes = document.getElementById('yeux');
		sz100Box = document.getElementById('z_yeux');

	
	if(hasTouchscreen) document.getElementById('toggleFullwindow').parentNode.style.display = 'none'

	
	document.getElementById('toggleZoom').onclick = function() {
		isZoom100=!isZoom100
		document.cookie = 'sz_isZoom100='+isZoom100+'; max-age='+cookieMaxAge+'; SameSite=Strict' ;

		
		moveMode = document.getElementById('toggleDA').parentNode;
			
		obj = document.getElementById('toggleZoom')
		if (isZoom100) {
			szHidden.appendChild(szDisplay.replaceChild(sz100Box, szFitBox));
			moveMode.style.visibility = 
			document.getElementById('buttonZoomIn').style.visibility =
			document.getElementById('buttonZoomOut').style.visibility = document.getElementById('reset').style.visibility = 'visible'
			obj.textContent=langZoom100.replace('100', Math.round(zFactor*100))
			
		}
		else {
			szHidden.appendChild(szDisplay.replaceChild(szFitBox, sz100Box));
			moveMode.style.visibility = 
			document.getElementById('buttonZoomIn').style.visibility =
			document.getElementById('buttonZoomOut').style.visibility =
			document.getElementById('reset').style.visibility = 'hidden'
			obj.textContent=langZoomFit
		}
		handleFullDisplay();
		return false
	}
	document.getElementById('toggleView').onclick = function() {
		isCrossView = !isCrossView
		document.cookie = 'sz_isCrossView='+isCrossView+'; max-age='+cookieMaxAge+'; SameSite=Strict';

		
		obj = document.getElementById('toggleView')
		if(isCrossView) {
			obj.textContent=langCrossView
			szFitEyes.insertBefore(document.getElementById('vue_gauche'), null); // met la vue gauche en dernier
			sz100Box.insertBefore(document.getElementById('z_vue_gauche'), null); // met la vue gauche en dernier
		}
		else {
			obj.textContent=langParallelView
			szFitEyes.insertBefore(document.getElementById('vue_droite'), null); // met la vue gauche en dernier				
			sz100Box.insertBefore(document.getElementById('z_vue_droite'), null); // met la vue gauche en dernier
		}
		return false
	}
	document.getElementById('reset').onclick = function() {
		change_synchro('d');
		COORDS=''
		sz100Image.onload()
		return false
	}
	document.getElementById('buttonZoomIn').onclick = function(e) {
		width=document.getElementById('z_vue_gauche').offsetWidth;
		height=document.getElementById('z_vue_gauche').offsetHeight;
		zoomimage(width/2, height/2, 3);
		moveimage_end();
		return false
	}
	document.getElementById('buttonZoomOut').onclick = function() {
		width=document.getElementById('z_vue_gauche').offsetWidth;
		height=document.getElementById('z_vue_gauche').offsetHeight;
		zoomimage(width/2, height/2, -3);
		moveimage_end();
		return false
	}
	document.getElementById('toggleHelp').onclick = function() {
		helpShown = !helpShown
		if(helpShown) {
			var oReq = new XMLHttpRequest();
			oReq.onload = showHelp;
			oReq.open('get', '?/sz/help', true);
			oReq.send(); 
		}
		else {
			closeHelp()
		}
		return false
	}
	document.getElementById('toggleFullwindow').onclick = function() {
		if (!hasTouchscreen) {
			isFullWindow=!isFullWindow
			document.cookie = 'sz_isFullWindow='+isFullWindow+'; max-age='+cookieMaxAge+'; SameSite=Strict';

			
			if(isFullWindow) {
				// les deux modes sont rendus exclusifs l'un de l'autre
				if (isFullScreen) document.getElementById('toggleFullscreen').click();
			
				szEyeChangeBefore()
				
				document.querySelector('html').style.overflowY='hidden';
				szDisplay.style.width = '100vw' ;
				szDisplay.style.height = '100vh' ;
				szDisplay.style.position = 'fixed' ;
				szDisplay.style.left = '0px' ;
				szDisplay.style.top = '0px' ;
				szDisplay.style.margin = '0px' ;
				szDisplay.style.zIndex = '1021' ;
				
				
				if( window.history && window.history.pushState ){

					if (history.state == null) {
						history.pushState( stateObj, null, "" );
						window.onpopstate = function(event){

							if (isFullWindow) {
								document.getElementById('toggleFullwindow').click(); 
							}
						}
					}
					else {
						stateObj.foo += 1
						history.replaceState( stateObj, null, "" );
					}
				}
			}
			else {
				szEyeChangeBefore()
				
				document.querySelector('html').style.overflowY='';
				
				szDisplay.style.width = '' ;
				szDisplay.style.height = '' ;
				szDisplay.style.position = '' ;
				szDisplay.style.left = '' ;
				szDisplay.style.top = '' ;
				szDisplay.style.margin = '' ;
				szDisplay.style.zIndex = '' ;
			}
			szEyeChangeAfter()
			handleFullDisplay()
		}
		return false
	}
	document.getElementById('toggleFullscreen').onclick = function() {
		elem = szDisplay
		szEyeChangeBefore()
		if (isFullScreen) {
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
			else {
				alert(document.exitFullscreen ||		//W3C
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
					document.msExitFullScreen)
			}
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
		szEyeChangeAfter()
		
		isFullScreen=!isFullScreen
		if (isFullScreen) {
			// les deux modes sont rendus exclusifs l'un de l'autre
			if(isFullWindow) document.getElementById('toggleFullwindow').click();
		}
		handleFullDisplay()
	};
	
// 	document.getElementById('vue_droite').ontouchstart = 
// 	document.getElementById('z_vue_droite').ontouchstart =
// 	document.getElementById('vue_gauche').ontouchstart = 
// 	document.getElementById('z_vue_gauche').ontouchstart = function() {
// 		if (onDblTouch_started) {
// 			clearTimeout(STdblTouch)
// 			onDblTouch_started=false
// // 			alert((Date.now() - onDblTouch_start_time) + 'ms')
// 			this.ondblclick();
// 		}
// 		else {
// 			onDblTouch_started=true
// // 			onDblTouch_start_time = Date.now() ;
// 			STdblTouch=setTimeout(function(){onDblTouch_started=false},300);
// 		}
// 	}
	
	document.getElementById('vue_droite').ondblclick = 
	document.getElementById('z_vue_droite').ondblclick = function() { browseCategory('Prev'); return false }
	document.getElementById('vue_gauche').ondblclick = 
	document.getElementById('z_vue_gauche').ondblclick = function() { browseCategory('Next'); return false }
	
	isZoom100=eval(document.cookie.replace(/(?:(?:^|.*;\s*)sz_isZoom100\s*\=\s*([^;]*).*$)|^.*$/, '$1'))
	if(typeof isZoom100 === 'undefined') isZoom100 = isZoom100_default
	isZoom100=!isZoom100
	szDisplay.appendChild(isZoom100?sz100Box:szFitBox)
	document.getElementById('toggleZoom').click()
	
	isCrossView=eval(document.cookie.replace(/(?:(?:^|.*;\s*)sz_isCrossView\s*\=\s*([^;]*).*$)|^.*$/, '$1'))
	if(typeof isCrossView === 'undefined') isCrossView = isForCrossView
	isCrossView=!isCrossView
	document.getElementById('toggleView').click()
			
	isFullWindow=eval(document.cookie.replace(/(?:(?:^|.*;\s*)sz_isFullWindow\s*\=\s*([^;]*).*$)|^.*$/, '$1'))
	if(typeof isFullWindow === 'undefined' || hasTouchscreen) isFullWindow = isFullWindow_default
	isFullWindow=!isFullWindow
	document.getElementById('toggleFullwindow').click()
	
	szEye = document.getElementById('z_vue_gauche')
	szEyeW = szEye.offsetWidth;
	szEyeH = szEye.offsetHeight;
	
	szFitImage_load();
	sz100Image_load();
	
	if (!isZoom100) {
	// Pour corriger l'affichage une fois l'image chargée (centrage ou barre de défilement)
		SIFit = setInterval(function(){
			if(szFitImage.src!='' && szFitImage.complete) {
				handleFullDisplay()
				clearInterval(SIFit)
			}
		}, 40)
	}
}
function browseCategory(Direction) {
    direction = Direction.toLowerCase()
    switch (Direction) {
        case 'Next':
        case 'Prev': 
        case 'First': 
        case 'Last': 
        case 'Up': 
            if (elem=document.head.querySelector('link[rel="'+direction+'"]') || document.getElementById('link'+Direction) || document.querySelector('div.ui-controlgroup-controls a[rel="'+direction+'"]')) {
                window.location = elem.href ;
//                 elem.click() ;
            }
    }
}
Image.prototype.load = function(url){
	var thisImg = this;
	var strBar='          ' // 10 caractères
	var SIimg = setInterval(function() {
		var spaceUp=strBar.slice(20-Math.round(thisImg.completedPercentage/5)).replace(' ', '&#x202F;'); // de 0 à 0, puis à 10
		var spaceDown=strBar.slice(Math.round(thisImg.completedPercentage/5)).replace(' ', '&#x202F;'); // de 10 à 0, puis à 0
		document.getElementById('z_vue_droite').innerHTML=langWait+'<br />'+spaceDown+thisImg.completedPercentage+' %'+spaceUp
		document.getElementById('z_vue_gauche').innerHTML=langWait+'<br />'+spaceUp+thisImg.completedPercentage+' %'+spaceDown
	}, 40);
	var xmlHTTP = new XMLHttpRequest();
	xmlHTTP.open('GET', url,true);
	xmlHTTP.responseType = 'arraybuffer';
	xmlHTTP.onload = function(e) {
		var blob = new Blob([this.response]);
		thisImg.src = window.URL.createObjectURL(blob);
		clearInterval(SIimg);
		document.getElementById('z_vue_droite').innerHTML='Please wait'+'<br />'+'Downloaded'
		document.getElementById('z_vue_gauche').innerHTML='Please wait'+'<br />'+'D&#x202F;o&#x202F;w&#x202F;n&#x202F;l&#x202F;o&#x202F;a&#x202F;d&#x202F;e&#x202F;d'
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
	handleFullDisplay()
};
function draw(img) {
	var cv1 = document.getElementById((isForCrossView)?'vue_droite':'vue_gauche');
	var cv2 = document.getElementById((isForCrossView)?'vue_gauche':'vue_droite');
	// canvas à la taille de l'image (pour chaque vue)
	cv1.width=cv2.width=img.width/2;
	cv1.height=cv2.height=img.height;

	var ctx1 = cv1.getContext('2d');
	var ctx2 = cv2.getContext('2d');
	ctx1.drawImage(img, 0, 0, img.width/2, img.height, 0, 0, img.width/2, img.height);
	ctx2.drawImage(img, img.width/2, 0, img.width/2, img.height, 0, 0, img.width/2, img.height);
}
function szFitImage_load()
{
	uri = encodeURI(imgDerivPath) ;
	szFitImage.src=uri;
}

	

// Gestion du plein écran, et pleine fenêtre
// (pour szFitBox) - centrage ou barre de défilement
function handleFullDisplay() {
	if (!isZoom100) {
		if (isFullScreen || isFullWindow) {
			if (szFitImage.src!='' && szFitImage.complete && (szFitImage.width/szFitImage.height > window.innerWidth/window.innerHeight)) {
				szDisplay.style.overflowY='visible';
				
				szFitBox.style.marginTop='50vh';
				szFitBox.style.transform='translateY(-50%)';
			}
			else {
				szDisplay.style.overflowY='hidden';
				
				szFitBox.style.marginTop='auto';
				szFitBox.style.transform='none';
			}
			szDisplay.style.height='100vh';
		}
		else {
			szDisplay.style.overflowY='visible';
			
			szFitBox.style.marginTop='auto';
			szFitBox.style.transform='none';
            szDisplay.style.height='auto';
		}
	}
	else {
		szEyeChangeBefore()
		if (isFullScreen || isFullWindow) {
			szDisplay.style.height='100vh';
		}
		else {
            szDisplay.style.height='80vh';
        }
		szEyeChangeAfter()
	}
}


//  Zoom100% : Gestion du déplacement 
	
var sz100Image;
var sz100ImageW;
var szEyeW
var szEyeH;
var SI1, SI2;
var x, y ;
var etat = 1 ;
var formAffiche = true ;

var onDblTouch_started = false;
var onDblTouch_start_time ;
var onDblTouch_end_time ;
var STdblTouch

var Xd, Yd, Xm, Ym; // mouse down, move position
var x1, y1, x2, y2; // bgimg dynamic css position
var X1, Y1, X2, Y2; // bgimg static css position
var c1x,c1y,c2x,c2y; // bgimg static center coordinate

X1 = X2 = -0 ;
Y1 = Y2 = -0 ; 
x1 = X1 ;
y1 = Y1 ;    
x2 = X2 ;
y2 = Y2 ;      
		

var zVal=0;
var zCte=1.03;
var zCteWheel=10; // Mouse wheel reduction
var zStep=1;
var zFactor=1;
var zFactorPrev;
	
function sz100Image_init()
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
		
		evt.preventDefault();
// 		evt.stopPropagation();

	}
	document.getElementById('z_yeux').onmouseout = document.getElementById('z_yeux').onmouseup = document.getElementById('z_yeux').ontouchend = document.getElementById('z_yeux').ontouchcancel = function(evt){
		clearInterval(SI1);
		moveimage_end()
		document.getElementById('z_vue_droite').style.cursor = document.getElementById('z_vue_gauche').style.cursor = 'grab' ; 
	}
	
	document.getElementById('z_vue_droite').onwheel = document.getElementById('z_vue_gauche').onwheel = function(evt) {
		evt.preventDefault();
				
		var elInfo = this.getBoundingClientRect();
		evtX = (evt.clientX || evt.touches[0].pageX) - elInfo.left
		evtY = (evt.clientY || evt.touches[0].pageY) - elInfo.top
		
		zoomimage(evtX, evtY, -evt.deltaY/zCteWheel)
	};
	document.onkeydown = function (e){
		const keyName = e.key;

		if (keyName === 'Control') {
			// do when only Control key is pressed.
// 			alert('Only Control key pressed');
			change_synchro('a');
			return;
        }
        
        // 
        var arrowMove=10;
        switch (keyName) {
            case '+': document.getElementById('buttonZoomIn').click(); break;
            case '-': document.getElementById('buttonZoomOut').click(); break;
//             case 'ArrowDown':	moveimage(0, -arrowMove); moveimage_end(); break;
//             case 'ArrowUp':	moveimage(0, arrowMove); moveimage_end(); break;
//             case 'ArrowLeft':	moveimage(arrowMove, 0); moveimage_end(); break;
//             case 'ArrowRight':	moveimage(-arrowMove, 0); moveimage_end(); break;
            case 'k':	case '2':	moveimage(0, -arrowMove); moveimage_end(); break;
            case 'j':	case '8':	moveimage(0, arrowMove); moveimage_end(); break;
            case 'h':	case '4':	moveimage(arrowMove, 0); moveimage_end(); break;
            case 'l':	case '6':	moveimage(-arrowMove, 0); moveimage_end(); break;
            case '1':	moveimage(arrowMove, -arrowMove); moveimage_end(); break;
            case '9':	moveimage(-arrowMove, arrowMove); moveimage_end(); break;
            case '3':	moveimage(-arrowMove, -arrowMove); moveimage_end(); break;
            case '7':	moveimage(arrowMove, arrowMove); moveimage_end(); break;
            case 'ArrowLeft':	browseCategory('Prev'); break;
            case 'ArrowRight':	browseCategory('Next'); break;
        }
        switch (keyName) {
            case '+': 
            case '-': 
            case 'k':	case '2':
            case 'j':	case '8':
            case 'h':	case '4':
            case 'l':	case '6':
            case '1':
            case '9':
            case '3':
            case '7':
            case 'ArrowLeft':
            case 'ArrowRight':
                e.preventDefault();
//         e.stopPropagation();
        }
            
	}
	document.onkeyup = function (e){
		const keyName = e.key;

		if (keyName === 'Control') {
			// do when only Control key is released.
// 			alert('Only Control key released');
			change_synchro('d');
			return;
		}

// 		console.log(e);
		//  'ctrlKey', 'shiftKey', 'altKey', 'altGraphKey', 'metaKey'
		if (e.ctrlKey) {
			// Even though e.key is not 'Control' (i.e. 'a' is released),
			// e.ctrlKey may be true if Ctrl key is released at the time.
// 			alert(`Combination of ctrlKey + ${keyName}`);
            switch (keyName) {
                                case 'Home':	browseCategory('First'); break;
                                case 'End':	browseCategory('Last'); break;
// 				case 'Home':
// 				case 'End':
// 				case 'PageUp':
// 				case 'PageDown':
// 					browseCategory('Up'); 
// 					break;
            }
            switch (keyName) {
                case 'Home':
                case 'End':
                    e.preventDefault();
                    //         e.stopPropagation();
            }
		}
        else {
// 			console.log(`Key released ${keyName}`);
		
			switch (keyName) {
				case 'z': case 'Z': document.getElementById('toggleZoom').click(); break;
				case 'f': case 'F': document.getElementById('toggleFullscreen').click();  break;
				case 'w': case 'W': document.getElementById('toggleFullwindow').click();  break;
				case 'x': case 'X': document.getElementById('toggleView').click();  break;
				case 'r': case 'R': document.getElementById('reset').click(); break;
// 				case 'h': case 'H': 
                case '?': case 'F1': document.getElementById('toggleHelp').click(); break;
	// 			case 'c': case 'C': formAffiche=!formAffiche; document.getElementById('form').style.opacity = formAffiche?1:0 ; break;
//                 case 'Home':	browseCategory('First'); break;
//                 case 'End':	browseCategory('Last'); break;
//                 case 'PageUp':	browseCategory('Prev'); break;
//                 case 'PageDown':	browseCategory('Next'); break;
	//			case 'Enter':      break;
				case 'Escape': 
					if(isFullWindow) { 
						document.getElementById('toggleFullwindow').click();
					}
					else {
                        browseCategory('Up'); 
					}
					break;
	// 			case 'Control': change_synchro('d'); break;
				default: 
// 	 				alert(e.key)
					return;
			}
		}
	}
	document.getElementById('toggleDA').onclick = function() {
		obj = document.getElementById('toggleDA')
		if(obj.textContent==langMoveAdjust) {
			change_synchro('d');
		}
		else {
			change_synchro('a');
		}
		return false
	}
		
	var imgOrigUrl = document.getElementById('z_vue_droite').style.backgroundImage.replace(/url\((['"])?(.*?)\1\)/gi, '$2').split(',')[0];
	sz100Image = new Image();
// 			sz100Image.src = imgOrigUrl;
	sz100Image.load(imgOrigUrl);
	
	sz100Image.onload = function () {
		document.getElementById('z_vue_droite').innerHTML=''
		document.getElementById('z_vue_gauche').innerHTML=''
		if( COORDS == '') {
			X1 = -this.width/4;
			Y1 = -this.height/2;    

			X2 = -this.width*3/4;
			Y2 = Y1; 
			zVal = 0;
			
// 			moveimage(window.innerWidth/4, window.innerHeight/2); moveimage_end();
			moveimage(szEyeW/2, szEyeH/2); moveimage_end();
		}
		else {
		}
		
		sz100ImageW=this.width
		
		
		zoomimage(0, 0, 0);
		change_synchro('d');
	};
}
function moveimage_end() {
	X1 = x1;
	Y1 = y1;    
	X2 = x2;
	Y2 = y2;
		
	c1x = szEyeW/2 - X1
	c1y = szEyeH/2 - Y1
	c2x = szEyeW/2 - X2
	c2y = szEyeH/2 - Y2 
	
	document.cookie = 'sz_'+pictureId+'='+JSON.stringify(new Array(Math.round(c1x), Math.round(c1y), Math.round(c2x), Math.round(c2y), Math.round(zVal)))+'; max-age='+cookieMaxAge+'; SameSite=Strict';
}
function moveimage(dx,dy) {
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
function zoomimage(zx, zy, delta) 
{
	zValPrev = zVal
	
	zVal += delta
	zStep = Math.pow(zCte, delta)
	
	zFactorPrev = Math.pow(zCte, zValPrev)
	zFactor = Math.pow(zCte, zVal)
	
	if (isZoom100) {
		document.getElementById('toggleZoom').textContent='Z '+Math.round(zFactor*100)+'%'
// 		document.getElementById('reset').style.visibility = 'hidden'
	}
		
// 	console.log(sz100ImageW, zVal, zFactor, zFactorPrev)
	s1Prev = (sz100ImageW*zFactorPrev)
	s1 = (sz100ImageW*zFactor)

	X1 = (zStep*(X1-zx) + zx) ;
	Y1 = (zStep*(Y1-zy) + zy) ; 
	X2 = (zStep*(X2-zx + s1Prev/2) + zx) - s1/2;
	Y2 = (zStep*(Y2-zy) + zy) ; 
	x1 = X1 ;
	y1 = Y1 ;    
	x2 = X2 ;
	y2 = Y2 ;     
	document.getElementById((isForCrossView)?'z_vue_droite':'z_vue_gauche').style.backgroundPosition = X1+'px '+Y1+'px' ;	document.getElementById((isForCrossView)?'z_vue_gauche':'z_vue_droite').style.backgroundPosition = X2+'px '+Y2+'px' ;
	
	document.getElementById('z_vue_droite').style.backgroundSize = 	document.getElementById('z_vue_gauche').style.backgroundSize = s1+'px' ;
	

}
function change_synchro(val)
{
	moveimage_end()    
	Xd = Xm;
	Yd = Ym;     
	obj = document.getElementById('toggleDA')
	switch(val) {
		case 'd' : {
			etat=1 ; 
			obj.textContent=langMoveBoth
		break;
		}
		case 'a' : {
			etat=2 ; 
			obj.textContent=langMoveAdjust
		break;
		}
	}
}
function sz100Image_load()
{
	uri = encodeURI(imgOrigPath) ;
	document.getElementById('z_vue_droite').style.backgroundImage = 'url('+uri+')' ;
	document.getElementById('z_vue_gauche').style.backgroundImage = 'url('+uri+')' ;
	
	COORDS=document.cookie.replace(new RegExp('(?:(?:^|.*;\\s*)sz_'+pictureId+'\\s*\\=\\s*([^;]*).*$)|^.*$', 'g'), '$1')
	if( COORDS == '') {
	}
	else {
		COORDS=JSON.parse(COORDS)
		if (COORDS[0] === null) {
			COORDS=''
			
			c1x=0
			c1y=0
			c2x=0
			c2y=0
			zVal=0
		}
		else {
			c1x=COORDS[0]
			c1y=COORDS[1]
			c2x=COORDS[2]
			c2y=COORDS[3]
			zVal=(COORDS[4])?COORDS[4]:0
		}
		X1 = szEyeW/2 - c1x 
		Y1 = szEyeH/2 - c1y
		X2 = szEyeW/2 - c2x
		Y2 = szEyeH/2 - c2y
		
		moveimage(0, 0); moveimage_end();
	}
	
	sz100Image_init() ;
}
function szEyeChangeBefore() {
	if(sz100ImageW) {
		szEye = document.getElementById('z_vue_gauche')
		szEyeW = szEye.offsetWidth;
		szEyeH = szEye.offsetHeight;
//         Attention la présence de la console ancrée dans la fenêtre de navigation crée un décalage. 
//         Bug pour le développeur seul. Pas de problème avec la console dans une fenêtre séparée.
// 		console.log('szECB', isFullScreen, isFullWindow, szEyeW, szEyeH)
	}
}
function szEyeChangeAfter() {
	if(sz100ImageW) {
		szEye = document.getElementById('z_vue_gauche')
		widthDelta = szEye.offsetWidth - szEyeW;
		heightDelta = szEye.offsetHeight - szEyeH;
// 		console.log('szECA', isFullScreen, isFullWindow, widthDelta, heightDelta)
		moveimage(widthDelta/2, heightDelta/2); moveimage_end();
	}
}
function roundPrecision(number, precision) {
  var factor = Math.pow(10, precision);
  return Math.round(number * factor) / factor;
}

// var szHelpNode
var helpShown = false
function showHelp () {
// 	if ( !szHelpNode ) {
		var szHelpNode = document.createElement('div'); 
		var a = document.createAttribute('id');
		a.value = 'szHelpDiv';
		szHelpNode.setAttributeNode(a);
		szHelpNode.innerHTML = this.responseText;
// 	}
	var currentDiv = document.getElementById('szDisplay'); 
	currentDiv.parentNode.insertBefore(szHelpNode, currentDiv); 
	
// 	szHidden.appendChild(szDisplay.replaceChild(szHelpNode, szDisplay.firstChild));
}
function closeHelp () {
	var szHelpNode = document.getElementById('szHelpDiv'); 
	szHelpNode.parentNode.removeChild(szHelpNode)
}
