var formElt = document.querySelector("form");
var layersDescriptionElt = document.getElementById("layersDescription");

function setup() {
    var canvasElt = document.getElementById("curveCanvas");
    if (canvasElt.getContext) {
        var ctx = canvasElt.getContext('2d');
        
        ctx.strokeRect(0, 0, 300, 300);
    }
    
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
    alert(resistivities);
    alert(thicknesses);
});


