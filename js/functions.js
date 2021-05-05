import Mask from './phonemask.js';
//--------------MENU--------------------
//Toggle mobile menu / click outside = close / Avoid double click

function initSideMenuMobile() {
	let menudown = false; //down = true; up = false
	let speed = 300;
	let clicked = true;
	let delay = speed * 1.1; //re-click allowed after: speed + 10%
	let menuMobile = document.querySelector('.menu-mobile');

	document.querySelector('.icon-menu-mob i').addEventListener('click', event => {
		while (clicked === true) {
			if (menudown === false) {
				show(menuMobile);
				sideIn(menuMobile, '0', '70vw', speed);
				menudown = true;
			} else {
				sideOut(menuMobile, '70vw', '0', speed);
				setTimeout(() => { hide(menuMobile) }, delay);
				menudown = false;
			}
			clicked = false;
			setTimeout(() => { clicked = true }, delay);
		}
		event.stopPropagation();
	});

	document.querySelector('body,html').addEventListener('click', event => {
		while (clicked === true) {
			if (menudown === true) {
				sideOut(menuMobile, '70vw', '0', speed);
				setTimeout(() => { hide(menuMobile) }, speed);
				menudown = false;
			}
			clicked = false;
			setTimeout(() => { clicked = true }, delay);
		}
		event.stopPropagation();
	})
}//End initMenuMobile

initSideMenuMobile();

//--------------END Menu Mobile----------------


//----------Scroll to anchor--------
document.querySelectorAll('.menu-desktop a, .menu-mobile a').forEach(function (link) {
	link.addEventListener('click', function (event) {
		event.preventDefault();
		let idAnchor = link.attributes.href.value.slice(1);
		let anchorPosition = document.getElementById(idAnchor).getBoundingClientRect();
		let offset = {
			top: anchorPosition.top + window.pageYOffset,
			//left: anchorPosition.left + window.pageXOffset, 
		};
		document.querySelector('html, body').scrollTo({ top: offset.top - 80, behavior: "smooth", });
	})
})
//--------------------------------------------


//-----------Hover effect on touch screen-----------
const touchScrClickEffects = () => {
	let servicos = document.querySelectorAll('.servicos-single');
	let portfolioSingle = document.querySelectorAll('.port-single');
	let overlays = document.querySelectorAll('.overlay');

	const clearStyle = (obj, classToRemove, elemToHide) => {
		obj.forEach(single => {
			single.classList.remove(classToRemove);
			single.querySelector(elemToHide).style.display = 'none';
		})
	}

	servicos.forEach(item => {
		item.addEventListener('click', event => {
			clearStyle(servicos, 'touch-scr-style', 'p');
			item.classList.add('touch-scr-style');
			item.querySelector('p').style.display = 'block';
			event.preventDefault();
		})
	})

	portfolioSingle.forEach(item => {
		item.addEventListener('click', event => {
			clearStyle(overlays, 'overlay-bg-touch', 'a');
			item.querySelector('.overlay').classList.add('overlay-bg-touch');
			item.querySelector('a').style.display = 'inline-block';
			event.preventDefault();
		})
	})
}//touchScreenClick

if (navigator.maxTouchPoints != 0) touchScrClickEffects();

//--------------------------------------------------


//-----------FORM--------------

const formValidation = () => {
	//Form mask - phone
	const inputPhone = document.querySelector('#fone');

	const loadMask = () => {
		//Novo objeto Mask - parâmetro: o campo p/ tel do formulário;
		const phoneMask = new Mask(inputPhone);
		phoneMask.mask();
	}
	loadMask();

	inputPhone.addEventListener('focusin', e => e.target.placeholder = '(__)____-____');
	inputPhone.addEventListener('focusout', e => e.target.placeholder = 'Telefone p/ contato...');

	inputPhone.addEventListener('paste', event => event.preventDefault());

	//Disable Enter key on form inputs
	document.querySelectorAll('input:not(textarea)').forEach(function (input) {
		input.addEventListener('keydown', event => {
			if (event.key == "Enter") { event.preventDefault() };
		})
	})

	//Form submitted - alert
	/*document.getElementById('form').addEventListener('submit', e => {
		let alertSend = document.getElementById('msg-sended');
		show(alertSend);
		//e.preventDefault();
	});*/
}
formValidation();

//--------------END FORM----------------


//Close Whatsapp
document.querySelector('.atend-ws span').addEventListener('click', () => {
	hide(document.querySelector('.atend-ws'));
})