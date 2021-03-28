$(document).ready(function () {
  const mymap = L.map("mapDisplay",{ zoomControl: false }).setView([0, 0], 1);
  L.tileLayer(
    "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
    {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: "mapbox/streets-v11",
      tileSize: 512,
      zoomOffset: -1,
      accessToken:
        "pk.eyJ1IjoiemVhbGhoamtqaiIsImEiOiJja21wbWlodTQwcmJkMnhydnlqMW42YWUxIn0.GMaylZz5LU5qwW9FRrpvww",
    }
  ).addTo(mymap);
  L.control
    .zoom({
      position: "bottomleft",
    })
    .addTo(mymap);
  $("form").submit(function (e) {
    e.preventDefault();
    if ($("input").val() == "") {
      $("input").css("border", "1px solid red");
      alert("input empty");
    } else {
      $("input").css("border", "2px solid green");
      e.preventDefault();
      let ip = $("#textinput").val();
      $.ajax({
        url: "https://geo.ipify.org/api/v1",
        data: { apiKey: "at_X5wArQPkZL07YwTmlccyudvsbCvE6", ipAddress: ip },
        success: function (data) {
          $(".ipInfo-address").text(data.ip);
          $(".location").text(
            data.location.region + " " + data.location.country
          );
          $(".timeZone").text(data.location.timezone);
          $("#city").text(data.location.city);
          $(".isp").text(data.isp);
          mymap.setView([data.location.lat, data.location.lng], 13);
          L.marker([data.location.lat, data.location.lng]).addTo(mymap);
          $("input").val("");
        },
      });
    }
  });
  $("input").focus(function () {
    $("input").css("border", "0");
  });

  $("input").keypress(function () {
    $("input").css("border", "0");
  });
});
