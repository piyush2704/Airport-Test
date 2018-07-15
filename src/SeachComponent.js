import airports from './Destination';
import availableFlights from './availableFlights';
import _6E from './images/6E.png';
import icon_7 from './images/icon_7.svg';
import icon_8 from './images/icon_8.svg';
import AI from './images/AI.png';
import SG from './images/SG.png';
import _9W from './images/9W.png';
class SearchComponent {
    constructor() {

        //  document.addEventListener(document.getElementsByName('travelOption'), this.toggleTrip);

    }
    renderData() {
        const dest = airports.map(airport => {
            return `<option>${airport.cityName}</option>`
        });
        sessionStorage.setItem('trip', 'oneWay');
        const from = document.getElementById('from');
        from.innerHTML = dest;
        const to = document.getElementById('to');
        to.innerHTML = dest;
        const passengerDetails = document.getElementById("passengerDetails");
        let passengerInfo = {
            adults: 1,
            children: 1,
            infants: 1,

        }
        let closeModal;
        document.getElementById('seach-icon').addEventListener("click", () => {
            this.toggleTrip();
        }, this);
        passengerDetails.addEventListener("click", () => {
            document.getElementById('modal').innerHTML = `<div class = "backdrop-modal"></div>
                <div class = "modal">
                    <div class = "modal-header guestsHeader fixed paddingLR16">
                    
                        <h1> <a class = "back-to" id = "backTo"><img src = ${icon_8}></a> Passenger Detail</h1>
                    </div>
                    <div class = "modal-content paddingLR16">
                        <div class = "split-section">
                            <div class = "split-1">
                                <div class = "l12 passenger-details"> 
                                    <p class = "big-text">
                                    Adults <span class =  "small-text">12 yrs & above</span></p>
                                    <p class = "small-text"> on the day of check-in</p>
                                    
                                </div>
                                <div class = "l12 passenger-details"> 
                                    <p class = "big-text">
                                    Children <span class =  "small-text">12 yrs & below</span></p>
                                    <p class = "small-text"> on the day of check-in</p> 
                                </div>
                                <div class = "l12 passenger-details"> 
                                    <p class = "big-text">
                                    Infants <span class =  "small-text">5 yrs & below</span></p>
                                    <p class = "small-text"> on the day of check-in</p> 
                                </div>
                            </div>
                            <div class = "split-2">
                                <div class = "l12 passenger-details"> 
                                    <select name = "passengerDetails" id = "adults">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                    </select>
                                </div>
                                <div class = "l12 passenger-details"> 
                                    <select name = "passengerDetails" id = "children">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                    </select>
                                </div>
                                <div class = "l12 passenger-details"> 
                                    <select name = "passengerDetails" id = "infants">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                `
            passengerInfo = {
                adult: document.getElementById('adults').value,
                children: document.getElementById('children').value,
                infants: document.getElementById('infants').value,
            }
            passengerDetails.value = `${passengerInfo.adult} Adults , ${passengerInfo.children} Children , ${passengerInfo.infants} Infants  `
            closeModal = document.getElementById('backTo');
            closeModal.addEventListener('click', () => {
                document.getElementById('modal').innerHTML = null;
            });
            const passengerDom = document.getElementsByName('passengerDetails');
            console.log(passengerDom);
            passengerDom.forEach(elm => {
                //console.log(elm);
                elm.addEventListener("change", function () {
                    switch (elm.id) {
                        case 'children':
                            passengerInfo.children = elm.value;
                            break;
                        case 'adults':
                            passengerInfo.adult = elm.value;
                            break;
                        case 'infants':
                            passengerInfo.infants = elm.value;
                            break;
                    }
                    passengerDetails.value = `${passengerInfo.adult} Adults , ${passengerInfo.children} Children , ${passengerInfo.infants} Infants  `

                });
            })
        });
        document.getElementsByName("date-picker").forEach(elm => {
            elm.addEventListener('change', () => {
                this.checkDate();
            }, this);
        }, this);
        const el = document.getElementsByName("travelOption");
        el.forEach(function (element) {
            element.addEventListener("change", () => {
                sessionStorage.setItem('trip', element.value);
                if (element.value === 'oneWay') {
                    document.getElementById('endDate').disabled = true;
                } else {
                    document.getElementById('endDate').disabled = false;
                }
            }, false);
        }, this);
        const searchFlight = document.getElementById("searchFilghts");
        const searchForm = document.getElementById("form1");
        searchFlight.addEventListener("click", () => {
            this.searchResult(searchForm);

        });
        console.log(el);

    }
    validateForm() {
        // todo
        let message = [];
        const startPoint = document.getElementById('from');
        const endPoint = document.getElementById('to');
        const startDate = document.getElementById('startDate');
        const endDate = document.getElementById('endDate');
        const passengerDetails = document.getElementById('passengerDetails');
        const trip = sessionStorage.getItem('trip');
        console.log(trip);
        if (trip === 'oneWay') {

            if (startPoint.value === endPoint.value) {
                debugger
                message.push('Start point and End point cannot be same');
            }
            if ((startDate.value && new Date(startDate.value) < new Date())) {
                message.push('Date cannot be less than today');
            } else if ((!startDate.value)) {
                message.push('Please select Date of Journey');
            }
            if (!passengerDetails.value) {
                message.push('Please enter pessanger Detail');
            }
        } else {
            if (startPoint.value === endPoint.value) {
                message.push('Start point and End point cannot be same');
            }
            if ((startDate.value && new Date(startDate.value) < new Date()) || (endDate.value && new Date(endDate.value) < new Date())) {
                message.push('Date cannot be less than today');
            } else if ((!startDate.value) || (!endDate.value)) {
                message.push('Please select Date of Journey');
            } else if ((endDate.value && startDate.value && new Date(startDate.value) > new Date(endDate.value))) {
                message.push('End Date cannot be less than start date');
            }
            if (!passengerDetails.value) {
                message.push('Please enter pessanger Detail');
            }
        }
        if (message.length > 0) {
            return {
                valid: false,
                errorMessage: message
            };
        } else {
            return {
                valid: true,
                errorMessage: message
            };
        }
    }
    searchResult(searchForm) {

        const validForm = this.validateForm();
        if (validForm.valid) {
            const flighticon = {
                "AI": AI,
                "6E": _6E,
                "SG": SG,
                "9W": _9W,
            }
            const searchFlights = {
                startPoint: searchForm.from.value,
                endPoint: searchForm.to.value,
                startDate: searchForm.startDate.value,
                endDate: searchForm.endDate.value
            }
            if(availableFlights[searchFlights.startDate]) {
                const flights = Object.keys(availableFlights[searchFlights.startDate]);
            const startPoint = airports.filter(airport => {
                return airport.cityName === searchFlights.startPoint;
            });
            const endPoint = airports.filter(airport => {
                return airport.cityName === searchFlights.endPoint;
            });
            const searchString = `${startPoint[0].iataCode}-${endPoint[0].iataCode}`;
            const resultSet = flights.filter(flight => {
                return flight.includes(searchString);
            });
            const flightResult = document.getElementById("oneWayFlight");
            flightResult.innerHTML = this.setFlight(resultSet, flighticon , searchFlights.startDate);
            document.getElementById('search-box').className = 'search-box-fixed';
            document.getElementById('flightResult').className = "display-result";
            document.getElementById('mainContent').className = "main-content fixed-content"; 
            if (sessionStorage.getItem('trip') == 'return') {
                 if(availableFlights[searchFlights.endDate]) {
                const flights = Object.keys(availableFlights[searchFlights.endDate]);
                const startPoint = airports.filter(airport => {
                    return airport.cityName === searchFlights.startPoint;
                });
                const endPoint = airports.filter(airport => {
                    return airport.cityName === searchFlights.endPoint;
                });
                document.getElementById('flightResult').className = "display-result split";
                const searchString = `${endPoint[0].iataCode}-${startPoint[0].iataCode}`;
                const resultSet = flights.filter(flight => {
                    return flight.includes(searchString);
                });
                document.getElementById("returnFlight").innerHTML = this.setFlight(resultSet, flighticon , searchFlights.endDate);
                 } else {
                        document.getElementById('modal').innerHTML = `<div class = "backdrop-modal"></div>
                <div class = "modal">
                    <div class = "modal-header guestsHeader fixed paddingLR16">
                    
                        <h1> <a class = "back-to" id = "backTo"><img src = ${icon_8}></a> No Flight Found</h1>
                    </div>
                    <div class = "modal-content paddingLR16">
                                <p class= "errorMessage">No Flight Found </p>
                    </div>
                </div>
                `
            document.getElementById('backTo').addEventListener('click', () => {
                document.getElementById('modal').innerHTML = null;
            });
                 }
            } else {
                document.getElementById("returnFlight").innerHTML = null
            }
            } else {
                 document.getElementById('modal').innerHTML = `<div class = "backdrop-modal"></div>
                <div class = "modal">
                    <div class = "modal-header guestsHeader fixed paddingLR16">
                    
                        <h1> <a class = "back-to" id = "backTo"><img src = ${icon_8}></a> No Flight Found</h1>
                    </div>
                    <div class = "modal-content paddingLR16">
                                <p class= "errorMessage">No Flight Found </p>
                    </div>
                </div>
                `
            document.getElementById('backTo').addEventListener('click', () => {
                document.getElementById('modal').innerHTML = null;
            });
            }
            
        } else {
            console.log(validForm.errorMessage);
            const error =
                validForm.errorMessage.map(m => {
                    return `<p class= "errorMessage"> ${m ? m : null}</p>`;
                });
            let er = ''
            error.forEach(err => { er = er + err; });
            document.getElementById('modal').innerHTML = `<div class = "backdrop-modal"></div>
                <div class = "modal">
                    <div class = "modal-header guestsHeader fixed paddingLR16">
                    
                        <h1> <a class = "back-to" id = "backTo"><img src = ${icon_8}></a> Invaid Details</h1>
                    </div>
                    <div class = "modal-content paddingLR16">
                            ${er}
                    </div>
                </div>
                `
            document.getElementById('backTo').addEventListener('click', () => {
                document.getElementById('modal').innerHTML = null;
            });
        }
    }
    checkDate() {
        // todo
        const startDate = document.getElementById('startDate').value;
        const endDate = document.getElementById('endDate').value;

    }
    toggleTrip() {
        const temp = document.getElementById('from').value;
        document.getElementById('from').value = document.getElementById('to').value;
        document.getElementById('to').value = temp;
    }
    setFlight(resultSet, flighticon , searchDate) {
        let resultFlightToDisplay = [];
        resultSet.forEach(res => {
            resultFlightToDisplay.push(availableFlights[searchDate][res]);
        })
        if (!resultSet.length) {
            document.getElementById('modal').innerHTML = `<div class = "backdrop-modal"></div>
                <div class = "modal">
                    <div class = "modal-header guestsHeader fixed paddingLR16">
                    
                        <h1> <a class = "back-to" id = "backTo"><img src = ${icon_8}></a> No Flight Found</h1>
                    </div>
                    <div class = "modal-content paddingLR16">
                                <p class= "errorMessage">No Flight Found </p>
                    </div>
                </div>
                `
            document.getElementById('backTo').addEventListener('click', () => {
                document.getElementById('modal').innerHTML = null;
            });
        }
        const appendResult = resultSet.map(result => {
            return {
                flightNo: result.split("-")[2],
                timeofDeparture: availableFlights[searchDate][result].split("||")[1].split("|")[0],
                timeofArival: availableFlights[searchDate][result].split("||")[1].split("|")[1],
                noOfStops: availableFlights[searchDate][result].split("||")[1].split("|")[2],
                totalTime: availableFlights[searchDate][result].split("||")[1].split("|")[3],
                price: availableFlights[searchDate][result].split("||")[3].split("|")[2],
            }


        });
        const flightForDom = appendResult.map(data => {
            return `<div class="flight-block">
            <div class="l2 flight-section-1">
                <div class="flight-logo l12">
                    <img alt="flight" src ="${flighticon[data.flightNo.substr(0, 2)]}">
                </div>
                <div class="l12 flight-number">
                    <span>${data.flightNo}</span>
                </div>
            </div>
            <div class="l5 flight-section-2">
                <div class="l12">
                    <div class="l5">
                        <div class="l12 time">${data.timeofDeparture.substr(0, 2)}:${data.timeofDeparture.substr(2, 2)}</div>
                        <div class="l12 small-font">${data.totalTime.substr(0, 1)}hr ${data.totalTime.substr(1, 2)}min</div>
                    </div>
                    <div class = "l1">
                        <img src = "${icon_7}"></img>
                    </div>
                    <div class = "l5 ">
                        <div class="l12 time">${data.timeofArival.substr(0, 2)}:${data.timeofArival.substr(2, 2)}</div>
                        <div class="l12 small-font">${data.noOfStops} Stops</div>
                    </div>
                </div>
                <div class="l12"></div>
            </div>
            <div class="l4 flight-section-3">
                <div class="l12">
                    <span class="cost">
                &#x20b9;${data.price}</span>
                </div>
                <div class="l12">
                <button id = "${data.flightNo}" class = "select-flight">Select</button></div>
            </div>
        </div>`
    });
        let displayResult = ''
        flightForDom.forEach(dom => {
            displayResult = displayResult  + dom;
        })
        return displayResult;
    }
}
export default SearchComponent;