import L from 'leaflet';
import md5 from 'md5';

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
    this.sortKey = 'name';
    this.sortOrder = 'ASC';
    this.createMapElement();
    this.drawMap();
    this.placeMarkers();
    this.createTableElement();
    this.populateTable();
  }

  setSortOrder() {
    this.sortOrder = this.sortOrder == 'ASC' ? 'DESC' : 'ASC'
  }

  createMapElement() {
    this.mapElement = document.createElement('div');
    this.mapElement.setAttribute('id', this.mapId);
    document.body.appendChild(this.mapElement);
  }

  drawMap() {
    this.map = L.map(this.mapId).fitBounds(this.getMentorsPositions());
    L.tileLayer(this.mapTitleLayer).addTo(this.map);
  }

  getMentorsPositions() {
    return mentors.map(mentor => mentor.position);
  }

  placeMarkers() {
    mentors.forEach(mentor => {
      const gravatarHash = md5(mentor.emailId.trim().toLowerCase());
      const popupContent = `
      <div class='avatar'>
        <img src='https://www.gravatar.com/avatar/${gravatarHash}?s=64&d=blank'>
      </div>
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
    for (let key in attrs) {
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
      id: this.holder
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

  sortedMentors() {
    if (!this.sortKey) return mentors;
    const sorter =
      this.sortOrder === 'DESC'
        ? (a, b) => a[this.sortKey].toLowerCase().localeCompare(b[this.sortKey].toLowerCase())
        : (a, b) => b[this.sortKey].toLowerCase().localeCompare(a[this.sortKey].toLowerCase());
    return mentors.sort(sorter);
  }

  handleHeaderClick(headerId) {
    this.sortKey = headerId;
    this.setSortOrder();
    this.populateTable();
  }

  assignClickHandlers() {
    ['name', 'place', 'emailId'].forEach(
      id => (document.getElementById(id).onclick = this.handleHeaderClick.bind(this, id))
    );
  }

  populateTable() {
    const table = document.getElementById(this.holder).children[0];
    table.innerHTML = `
      <tr class='header'>
        <th id="name">Name</th>
        <th id="place">Place</th>
        <th id="emailId">Email Id</th>
      </tr>
    `;
    this.sortedMentors().forEach(mentor => {
      if (
        this.searchTerm === '' ||
        mentor.name.toLowerCase().indexOf(this.searchTerm) > -1 ||
        mentor.place.toLowerCase().indexOf(this.searchTerm) > -1 ||
        mentor.emailId.toLowerCase().indexOf(this.searchTerm) > -1
      ) {
        let row = `
          <tr>
            <td>${mentor.name}</td>
            <td>${mentor.place}</td>
            <td>${mentor.emailId}</td>
          </tr>`;
        table.innerHTML += row;
      }
    });
    this.assignClickHandlers();
  }
}

const mapIt = new mentorsMap();
