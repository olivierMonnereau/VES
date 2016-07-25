// Computation of resistivity transform adapted from Koefoed (1970) by Ghosh (1971)

// Number of samples:
var nSamples = 44;
// AB/2 spacing:
var OA = 
    [0.0139790406440197, 0.0205184256193513, 0.0301169300968417, 0.0442056079391693, 0.0648849589579011, 0.0952380952380952, 0.139790406440197, 0.205184256193513, 0.301169300968417, 0.442056079391693, 0.648849589579011, 0.952380952380952, 1.39790406440197, 2.05184256193513, 3.01169300968417, 4.42056079391693, 6.48849589579011, 9.52380952380952, 13.9790406440197, 20.5184256193513, 30.1169300968417, 44.2056079391693, 64.8849589579011, 95.2380952380952, 139.790406440197, 205.184256193513, 301.169300968417, 442.056079391693, 648.849589579011, 952.380952380952, 1397.90406440197, 2051.84256193513, 3011.69300968417, 4420.56079391693, 6488.49589579011, 9523.80952380952, 13979.0406440197, 20518.4256193513, 30116.9300968417, 44205.6079391693, 64884.9589579011, 95238.0952380952, 139790.406440197, 205184.256193513];


function resistivityTransform(resistivities, thicknesses) {
    // Number of layers (basement include):
    var nLayers = resistivities.length;
    // Resistivity transforms:
    var RT = [];
    RT.length = nSamples;
    
    var T = [];
    T.length = nSamples - 1;
    var index;
    
    for (var i = 0; i < nSamples; i++) {
        index = 0;
        var K = (resistivities[nLayers-1] - resistivities[nLayers -2])/(resistivities[nLayers-1] + resistivities[nLayers-2])
        T[index] = resistivities[nLayers-2] * (1 + K * Math.exp(-2*thicknesses[nLayers-2]/OA[i]))/(1 - K * Math.exp(-2*thicknesses[nLayers-2]/OA[i]));
        for (var j = nLayers-3; j >= 0; j--) {
            var Tab = resistivities[j]*(1-Math.exp(-2*thicknesses[j]/OA[i]))/(1+Math.exp(-2*thicknesses[j]/OA[i]));
            index += 1;
            T[index] = (Tab+T[index-1])/(1+Tab*T[index-1]/(resistivities[j]*resistivities[j]));
        }
        RT[i] = T[index];
    }
    return RT;
}