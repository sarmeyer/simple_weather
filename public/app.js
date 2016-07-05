$(document).ready(function() {
    var display = document.createElement('h2');

    var r = confirm("May we use your current location?");
    if (r == true) {
        navigator.geolocation.getCurrentPosition(function(position) {
            getWeather(position.coords);
        })
    } else {
        alert('No weather available for this location');
    }
    function getWeather(position) {
        $.get(`http://api.openweathermap.org/data/2.5/weather?lat=${position.latitude}&lon=${position.longitude}&APPID=2e71dbe148f8c46bd87c68cc07bfeff3`,
            function(data, status) {
                showWeather(data);
            })
    }
    function showWeather(data) {
        $('.city').html(data.name);
        var temp = data.main.temp;
        var faren = temp * (9 / 5) - 459.67;
        var celcius = temp - 273.15;
        $(display).html(faren.toFixed(0));
        $('.temp').append(display);
        updateImage(faren);
        changeUnits(celcius,faren);
    }
    function changeUnits(celcius,faren) {
        $('input').click(function() {
          $('input').toggle();
            if ($(".farenheit").is(":hidden")) {
                $(display).html('');
                $(display).html(celcius.toFixed(0));
                $('.temp').append(display);
            } else {
                $(display).html('');
                $(display).html(faren.toFixed(0));
                $('.temp').append(display);
            }
        });
    }
    function updateImage(faren) {
        if (faren < 35) {
            $('body').css({
                "background-image": "url(http://lh5.ggpht.com/-Mxvf56CQxVA/TxG6UhYjBKI/AAAAAAAAJcw/2A7rN2IvbuE/s9000/snow%2Btree_6.png)"
            })
        } else if (faren > 50) {
            $('body').css({
                "background-image": "url(http://asmarterplanet.com/mobile-enterprise/files/sunny-day.png)"
            })
        }
    }
})
