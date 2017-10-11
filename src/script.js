import L from 'leaflet';

class mentorsMap {
	constructor(props) {
		this.mapElement = {};
		this.map = {};
		this.mapId = 'mentorsMap';
		this.mapCenter = [51.505, -0.09];
		this.mapZoom = 2;
		this.mapTitleLayer = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
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
}

const mapIt = new mentorsMap();
mapIt.createMapElement();
mapIt.drawMap();
mapIt.placeMarkers();
