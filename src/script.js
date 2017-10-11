import L from 'leaflet';

class mentorsMap {
	constructor(props) {
		this.mapElement = {};
		this.map = {};
		this.mapId = 'mentorsMap';
		this.mapCenter = [51.505, -0.09];
		this.mapZoom = 2;
		this.mapTitleLayer = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
		this.tableId = 'mentorsTable';
		this.tableDivId = 'mentorsTableContainer';
		this.tableElement = {};
		this.tableDivElement = {};
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
	searchKeyUp(){
		alert("It works");
	}
	createTableElement() {
		this.inputContainer = document.createElement('input');
		this.inputContainer.setAttribute('type', 'text');
		this.inputContainer.setAttribute('id','searchQuery');
		this.inputContainer.setAttribute('placeholder','Search a Mentor');
		
		document.body.appendChild(this.inputContainer);
		
		this.tableDivElement = document.createElement('div');
		this.tableDivElement.setAttribute('id', this.tableDivId);
		this.tableElement = document.createElement('table');
		this.tableElement.setAttribute('id', this.tableId);
		this.tableDivElement.appendChild(this.tableElement);
		document.body.appendChild(this.tableDivElement);
		
		let that = this;
		this.inputContainer.addEventListener('keyup',function(){
			var input, filter, table, tr, td1, td2, td3, i;
		    input = that.inputContainer;
		    filter = input.value.toUpperCase();
		    table = that.tableElement;
		    tr = table.getElementsByTagName("tr");

		    for (i = 1; i < tr.length; i++) {
			    td1 = tr[i].getElementsByTagName("td")[0];
			    td2 = tr[i].getElementsByTagName("td")[1];
			    td3 = tr[i].getElementsByTagName("td")[2];
	  	        if (td1.innerHTML.toUpperCase().indexOf(filter) > -1 || td2.innerHTML.toUpperCase().indexOf(filter) > -1 || td3.innerHTML.toUpperCase().indexOf(filter) > -1) {
			        tr[i].style.display = "";
			    } else {
			        tr[i].style.display = "none";
			    }
			  }
		});
	}
	insertMentorTable(){
		let tableRows = "<tr class='header'><th>Name</th><th>Place</th><th>Email Id</th></tr>";
		mentors.forEach(mentor => {
			let row ="<tr><td>"+mentor.name+"</td><td>"+mentor.place+"</td><td>"+mentor.emailId+"</td></tr>";
			tableRows = tableRows + row; 
		});
		document.getElementById("mentorsTable").innerHTML =tableRows;
	}
}

const mapIt = new mentorsMap();
mapIt.createMapElement();
mapIt.drawMap();
mapIt.placeMarkers();
mapIt.createTableElement();
mapIt.insertMentorTable();