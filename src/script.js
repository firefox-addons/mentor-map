import L from 'leaflet';

class mentorsMap {
	constructor(props) {
		this.mapElement = {};
		this.map = {};
		this.mapId = 'mentorsMap';
		this.mapCenter = [51.505, -0.09];
		this.mapZoom = 2;
		this.mapTitleLayer = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
		this.holder = 'tableHolder';
		this.searchTerm = '';
		this.createMapElement();
		this.drawMap();
		this.placeMarkers();
		this.createTableElement();
		this.populateTable();
	}

	createMapElement() {
		this.mapElement = document.createElement('div');
		this.mapElement.setAttribute('id', this.mapId);
		document.body.appendChild(this.mapElement);
	}

	drawMap() {
		this.map = L.map(this.mapId, {
			center: this.mapCenter,
			zoom: this.mapZoom
		});
		L.tileLayer(this.mapTitleLayer).addTo(this.map);
	}

	placeMarkers() {
		mentors.forEach(mentor => {
			const popupContent = `
			<div class='avatar'></div>
			<div>
				<span><b>${mentor.name}</b><span>
				<span>${mentor.place}<span>
				<span><a href='mailto:${mentor.emailId}'>${mentor.emailId}</a></span>
				<span><a href='${mentor.mozillians_url}' target='_blank'>${mentor.mozillians_url}</a></span>
				
			</div>`;
			const marker = L.marker(mentor.position).addTo(this.map);

			marker.bindPopup(popupContent);
		});
	}

	setAttributes(ele, attrs) {
	  for(let key in attrs) {
	    ele.setAttribute(key, attrs[key]);
	  }
	}

	createTableElement() {
		const inputBox = document.createElement('input');
		this.setAttributes(inputBox, {
			type: 'text',
			id: 'searchQuery',
			placeholder: 'Search a mentor'
		});
		
		document.body.appendChild(inputBox);
		
		const tableDiv = document.createElement('div');
		this.setAttributes(tableDiv, {
			id: this.holder,
		});

		const table = document.createElement('table');
		table.setAttribute('id', this.tableId);
		tableDiv.appendChild(table);
		document.body.appendChild(tableDiv);

		inputBox.addEventListener('keyup', e => {
			this.searchTerm = e.target.value;
			this.populateTable();
		});
	}

	populateTable(){
		const table = document.getElementById(this.holder).children[0];
		table.innerHTML = `
			<tr class='header'>
				<th>Name</th>
				<th>Place</th>
				<th>Email Id</th>
			</tr>
		`;
		mentors.forEach(mentor => {

			if(
				this.searchTerm === '' ||
				mentor.name.toLowerCase().indexOf(this.searchTerm) > -1 ||
				mentor.place.toLowerCase().indexOf(this.searchTerm) > -1 ||
				mentor.emailId.toLowerCase().indexOf(this.searchTerm) > -1
			){
				let row =`
					<tr>
						<td>${mentor.name}</td>
						<td>${mentor.place}</td>
						<td>${mentor.emailId}</td>
					</tr>`;
				table.innerHTML += row;
			}

		});
	}
}

const mapIt = new mentorsMap();
