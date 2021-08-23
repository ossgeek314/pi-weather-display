var tempdata = {"temp":"78.9", "humidity":"67.3", "pressure": "1020"};

function getJSON(path){
    return new Promise((resolve, reject) => {
        try {
            const fs = require('fs')

            fs.readFile(path, (error, data) => {
                if (error) {
                   reject(error)
		} else {
		   resolve(data)
		}
	    })

        } catch (error) {
            console.log('Failed to load module "fs"', error)
            throw error
        }

    }).then(JSON.parse).catch(error => {
        console.log('Failed to load JSON file', path, error)
        throw error
    })
}

function getTemp(){
    promisedata = getJSON('data/data.json');
    promisedata.then(function(data){
	tempdata=data;
        document.getElementById('temp_livingroom').innerHTML=tempdata.temp;    
        document.getElementById('humidity_livingroom').innerHTML=tempdata.humidity;    
        document.getElementById('pressurebox').innerHTML=tempdata.pressure;    
	});
    promisedata = getJSON('data/data-kitchen.json');
    promisedata.then(function(data){
	tempdata=data;
        document.getElementById('temp_kitchen').innerHTML=tempdata.temp;    
        document.getElementById('humidity_kitchen').innerHTML=tempdata.humidity;    
	});
    promisedata = getJSON('data/data-bedroom.json');
    promisedata.then(function(data){
	tempdata=data;
        document.getElementById('temp_bedroom').innerHTML=tempdata.temp;    
        document.getElementById('humidity_bedroom').innerHTML=tempdata.humidity;    
	});
    promisedata = getJSON('data/data-office.json');
    promisedata.then(function(data){
	tempdata=data;
        document.getElementById('temp_office').innerHTML=tempdata.temp;    
        document.getElementById('humidity_office').innerHTML=tempdata.humidity;    
	});
	
}
