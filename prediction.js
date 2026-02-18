function getBathValue() {
    const uiBathrooms = document.getElementsByName("uiBathrooms");
    for (let i = 0; i < uiBathrooms.length; i++) {
        if (uiBathrooms[i].checked) {
            return parseInt(uiBathrooms[i].value);
        }
    }
    return -1;
}

function getBHKValue() {
    const uiBHK = document.getElementsByName("uiBHK");
    for (let i = 0; i < uiBHK.length; i++) {
        if (uiBHK[i].checked) {
            return parseInt(uiBHK[i].value);
        }
    }
    return -1;
}

function onClickedEstimatePrice() {

    const sqft = document.getElementById("uiSqft").value;
    const bhk = getBHKValue();
    const bath = getBathValue();
    const location = document.getElementById("uiLocations").value;
    const estPrice = document.getElementById("uiEstimatedPrice");

    if (!sqft || sqft <= 0) {
        estPrice.innerHTML = "<h2>Please enter valid square feet</h2>";
        return;
    }

    const url = "/api/predict_home_price";

    $.post(url, {
        total_sqft: parseFloat(sqft),
        bhk: bhk,
        bath: bath,
        location: location
    }, function (data, status) {
        estPrice.innerHTML = `<h2>Estimated Price: ₹ ${data.estimated_price} Lakh</h2>`;
    });
}

function onPageLoad() {

    const url = "/api/get_location_names";

    $.get(url, function (data, status) {
        if (data) {
            const locations = data.locations;
            const uiLocations = document.getElementById("uiLocations");

            $('#uiLocations').empty();

            for (let i = 0; i < locations.length; i++) {
                const opt = new Option(locations[i]);
                $('#uiLocations').append(opt);
            }
        }
    });
}

window.onload = onPageLoad;
