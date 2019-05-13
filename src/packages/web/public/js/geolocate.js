document.addEventListener('DOMContentLoaded', function () {
    if ("geolocation" in navigator) {
        const $latitude = document.querySelector('#latitude')
        const $longitude = document.querySelector('#longitude')
        navigator.geolocation.getCurrentPosition(function(position) {
            latitude.value = position.coords.latitude
            longitude.value = position.coords.longitude
        }, function (error) {
            console.error(error)
        });
    } else {
        alert('(!) Geolocation is not supported.')
    }
})