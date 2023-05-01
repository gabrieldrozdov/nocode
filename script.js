// Intro animation
let nav = document.querySelector(".home-nav");
let links = document.querySelectorAll(".home-grid-link");
nav.style.transform = "translateY(-150%)";
for (let link of links) {
	link.style.transform = `scale(0)`;
	link.style.transition = `transform ${Math.random()*.5+.5}s`;
}
setTimeout(() => {
	nav.style.transform = "translateY(0%)";
	for (let link of links) {
		link.style.transform = `scale(1) rotate(${Math.random()*6-3}deg)`;
	}
}, 50)
setTimeout(() => {
	for (let link of links) {
		link.style.transition = `transform .3s`;
	}
}, 1000)

// Tagline animation
let subtitle = document.querySelector(".home-nav-subtitle");
let taglines = document.querySelectorAll(".home-nav-tagline");
let currentTagline = 0;
subtitle.style.transform = "scaleX(1)";
taglines[currentTagline].style.opacity = 1;
taglines[currentTagline].style.display = "block";
setInterval(() => {
	taglines[currentTagline].style.opacity = 0;
	subtitle.style.transform = "scaleX(0)";
	setTimeout(() => {
		taglines[currentTagline].style.display = "none";
		currentTagline++;
		if (currentTagline >= taglines.length) {
			currentTagline = 0;
		}
		taglines[currentTagline].style.display = "block";
		setTimeout(() => {
			taglines[currentTagline].style.opacity = 1;
			subtitle.style.transform = "scaleX(1)";
		}, 50)
	}, 500)
}, 5000)

// Open nav menus
let activeMenu = "";
function toggleNav(menu) {
	if (activeMenu != "" && activeMenu != menu) {
		document.querySelector(`#${activeMenu}`).dataset.active = 0;
	}
	let targetMenu = document.querySelector(`#${menu}`);
	if (activeMenu != menu) {
		targetMenu.dataset.active = 1;
		activeMenu = menu;
	} else {
		targetMenu.dataset.active = 0;
		activeMenu = "";
	}
}

// Set sorting order
let sortOrder = "random";
function setSorting(order, e) {
	if (sortOrder != order) {
		// Deactive previous sort order
		let activeSort = document.querySelector("#sorting [data-active='1']");
		activeSort.dataset.active = 0;

		// Activate new sort order
		sortOrder = order;
		e.dataset.active = 1;
		if (sortOrder == "least") {
			for (let link of links) {
				link.style.order = parseInt(link.dataset.lines);
			}
		} else if (sortOrder == "most") {
			for (let link of links) {
				link.style.order = -parseInt(link.dataset.lines);
			}
		} else if (sortOrder == "az") {
			for (let link of links) {
				let orderValue = link.dataset.name.codePointAt(0);
				link.style.order = parseInt(orderValue);
			}
		} else if (sortOrder == "za") {
			for (let link of links) {
				let orderValue = link.dataset.name.codePointAt(0);
				link.style.order = -parseInt(orderValue);
			}
		} else if (sortOrder == "random") {
			for (let link of links) {
				link.style.order = Math.floor(Math.random()*1000);
			}
		}
	} else if (sortOrder == "random") {
		for (let link of links) {
			link.style.order = Math.floor(Math.random()*1000);
		}
	}
}
setSorting("random", document.querySelector("#sorting [data-active='1']"));

// Set filters
let filters = [];
let clear = document.querySelector(".home-nav-controls-clear");
let filterListItems = document.querySelectorAll("#filters .home-nav-controls-item");
function setFilters(filter, e) {
	if (filters.includes(filter)) {
		filters = filters.filter(e => e !== filter);
		e.dataset.active = 0;
	} else {
		filters.push(filter);
		e.dataset.active = 1;
	}
	if (filters.length == 0) {
		clear.dataset.active = 0;
		for (let link of links) {
			link.dataset.active = 1;
		}
	} else {
		clear.dataset.active = 1;
		for (let link of links) {
			let linkTags = link.dataset.tags.split(',');
			for (let i of filters) {
				if (linkTags.includes(i)) {
					link.dataset.active = 1;
					break
				} else {
					link.dataset.active = 0;
				}
			}
		}
	}
}
function clearFilters() {
	clear.dataset.active = 0;
	filters = [];
	for (let link of links) {
		link.dataset.active = 1;
	}
	for (let filterListItem of filterListItems) {
		filterListItem.dataset.active = 0;
	}
}