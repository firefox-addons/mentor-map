let map, mentors;
window.onload=function(){
  drawMap();
  getMarkerData();
};
function drawMap(){
	map = L.map('map', {
    center: [51.505, -0.09],
    zoom: 2
	});
	L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}', {foo: 'bar'}).addTo(map);
};

function getMarkerData(){
	$.get("markerData.json")
	.done(function(data){
		// console.log("Success");
		// console.log(data);
		mentors= data.mentors;
		placeMarkers();
	})
	.fail(function(err){
		console.log("Fail");
	})
}
function placeMarkers(){
	for(var i=0;i<mentors.length;i++){
		let mentor = mentors[i];
		let popupContent="<b>"+mentor.name+"</b><br/><a href='mailto:"+mentor.emailId+"'>"+mentor.emailId+"</a>"
		let marker = L.marker(mentors[i].position).addTo(map);
		marker.bindPopup(popupContent);
		// .openPopup();
	}

}
