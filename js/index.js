var formElt = document.querySelector("form");
var layersDescriptionElt = document.getElementById("layersDescription");


function setup() {
    drawCanvas();
    
    formElt.elements.numberOfLayers.value = 4;
    createLayersInputs();
    formElt.elements.resistivity1.value = "38";
    formElt.elements.thickness1.value = "6";
    formElt.elements.resistivity2.value = "20";
    formElt.elements.thickness2.value = "15";
    formElt.elements.resistivity3.value = "160";
    formElt.elements.thickness3.value = "40";
    formElt.elements.resistivity4.value = "3.5";
}

var x0 = 80, y0 = 10;
var width = 250, height = 250;

function drawCanvas(OA, resistivities) {
    var canvasElt = document.getElementById("curveCanvas");
    if (canvasElt.getContext) {
        var ctx = canvasElt.getContext('2d');
        
        ctx.clearRect(0, 0, 400, 300);
        // Draw grid and axes of the graph
        ctx.strokeStyle = 'rgb(0, 0, 0)';

        for (var i = 1; i <= 10000; i *= 10) {
            var point = getScreenCoordinates(i, i);
                     
            // Draw horizontal grid
            ctx.beginPath();
            ctx.moveTo(x0, point.y);
            ctx.lineTo(x0 + width, point.y);
            ctx.stroke();
            
            // Draw apparent resistivity ticks
            ctx.fillStyle ='rgb(0, 0, 0)';
            ctx.textAlign = "right";
            ctx.font = "0.8em arial";
            ctx.fillText(i, x0 - 5, point.y);
              
            // Draw vertical grid
            ctx.beginPath();
            ctx.moveTo(point.x, y0);
            ctx.lineTo(point.x, y0 + height);
            ctx.stroke();
            
            // Draw AB/2 ticks
            ctx.fillText(i, point.x, y0 + height + 15);
            
            // Draw AB/2 title
            ctx.textAlign = "center";
            ctx.font = "0.8em arial";
            ctx.fillText("AB/2 (m)", x0 + width / 2, y0 + height + 30);
              
            // Draw apparent resistivity title
            ctx.textAlign = "left";
            ctx.fillText("Rho", 0, y0 + height / 2 - 10);
            ctx.fillText("(ohm.m)", 0, y0 + height /2 + 10)

        }
        
        // Draw apparent resistivity curve
        ctx.strokeStyle = 'rgb(255, 0, 0)';
        ctx.beginPath();
        if (OA !== undefined && resistivities !== undefined) {
            var point = getScreenCoordinates(OA[0], resistivities[0]);
            ctx.moveTo(point.x, point.y);
            for (var i = 1; i < OA.length; i++) {
                point = getScreenCoordinates(OA[i], resistivities[i]);
                ctx.lineTo(point.x, point.y);
            }
        }
        ctx.stroke();
        ctx.closePath();
    }   
}

function getScreenCoordinates(OA, resistivity) {
    return {
        x: x0 + (Math.log(OA) - Math.log(1)) * width / (Math.log(10000) - Math.log(1)),
        y: y0 + height - (Math.log(resistivity) - Math.log(1)) * height / (Math.log(10000) - Math.log(1))
    }
}

function createLayersInputs() {
    layersDescriptionElt.innerHTML = ""; 
    
    var nLayers = formElt.elements.numberOfLayers.value;
    
    for (var i=0; i < nLayers - 1; i++) {
        var layerElt = createLayerElt(String(i + 1));
        layersDescriptionElt.appendChild(layerElt);
    }
    
    layersDescriptionElt.appendChild(createBasementElt(nLayers));    
}

function createLayerElt(number) {
    var paragraphElt = document.createElement("p");
    
    var layerLabelElt = document.createElement("label");
    layerLabelElt.textContent = "Layer " + number + ":";
    
    var resistivityInputElement = document.createElement("input");
    resistivityInputElement.type = "text";
    resistivityInputElement.name = "resistivity" + number;
    resistivityInputElement.id = "resistivity" + number;
    resistivityInputElement.required = true;
    resistivityInputElement.placeholder = "Resisitivity";
    
    var resistivityLabelElt = document.createElement("label");
    resistivityLabelElt.htmlFor = "resistivity" + number;
    resistivityLabelElt.textContent = "ohm.m";
    
    var thicknessInputElement = document.createElement("input");
    thicknessInputElement.type = "text";
    thicknessInputElement.name = "thickness" + number;
    thicknessInputElement.id = "thickness" + number;
    thicknessInputElement.required = true;
    thicknessInputElement.placeholder = "Thickness";
    
    var thicknessLabelElt = document.createElement("label");
    thicknessLabelElt.htmlFor = "thickness" + number;
    thicknessLabelElt.textContent = "m";
    
    paragraphElt.appendChild(layerLabelElt);
    paragraphElt.appendChild(document.createTextNode(" "));
    paragraphElt.appendChild(resistivityInputElement);
    paragraphElt.appendChild(document.createTextNode(" "));
    paragraphElt.appendChild(resistivityLabelElt);
    paragraphElt.appendChild(document.createTextNode(" "));
    paragraphElt.appendChild(thicknessInputElement);
    paragraphElt.appendChild(document.createTextNode(" "));
    paragraphElt.appendChild(thicknessLabelElt);
    
    return paragraphElt;
}

function createBasementElt (number) {
    var paragraphElt = document.createElement("p");
    
    var layerLabelElt = document.createElement("label");
    layerLabelElt.textContent = "Layer " + number + ":";
    
    var resistivityInputElement = document.createElement("input");
    resistivityInputElement.type = "text";
    resistivityInputElement.name = "resistivity" + number;
    resistivityInputElement.id = "resistivity" + number;
    resistivityInputElement.required = true;
    resistivityInputElement.placeholder = "Resistivity";
    
    var resistivityLabelElt = document.createElement("label");
    resistivityLabelElt.htmlFor = "resistivity" + number;
    resistivityLabelElt.textContent = "ohm.m";
    
    paragraphElt.appendChild(layerLabelElt);
    paragraphElt.appendChild(document.createTextNode(" "));
    paragraphElt.appendChild(resistivityInputElement);
    paragraphElt.appendChild(document.createTextNode(" "));
    paragraphElt.appendChild(resistivityLabelElt);
   
    return paragraphElt;
}

document.getElementById("numberOfLayers").addEventListener("change", createLayersInputs);

formElt.addEventListener("submit", function(e) {
    e.preventDefault();
    
    var resistivities = [];
    var thicknesses = [];
    
    var inputElts = document.querySelectorAll("#layersDescription input");
    for (var i = 0; i < inputElts.length; i += 2) {
        resistivities.push(parseFloat(inputElts[i].value));
    }
    for (var i = 1; i < inputElts.length - 1; i += 2) {
        thicknesses.push(parseFloat(inputElts[i].value));
    }

    var data = getApparentResisityCurve(resistivities, thicknesses);    
    drawCanvas(data.halfSpacing, data.apparentResistivities);
    
});


