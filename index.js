// javascript
const hexInput = document.getElementById('hexInput');
const inputColor = document.getElementById('input-color');
const alteredColor = document.getElementById('altered-color');
const alteredColorText = document.getElementById('alteredColorText');
const slider = document.getElementById("slider");
const sliderText = document.getElementById("sliderText");
const lightenText = document.getElementById("lightenText");
const darkenText = document.getElementById("darkenText");
const toggleBtn = document.getElementById("toggleBtn");

toggleBtn.addEventListener("click", () => {
    //lightenText.classList.toggle("unselected");
    
    if (toggleBtn.classList.contains("toggled")) {
        // Lighten text is already selected.  Un-select it.
        toggleBtn.classList.remove("toggled");
        lightenText.classList.remove("unselected");
        darkenText.classList.add("unselected");
    } else {
        // Lighten text is not selected.  Toggle and select it.
        lightenText.classList.add("unselected");
        toggleBtn.classList.add("toggled");
        darkenText.classList.remove("unselected");
    }
});

darkenText.addEventListener("click", () => {
    
});

hexInput.addEventListener("keyup", () => {
   const hex = hexInput.value; 
   if (!isValidHex(hex)) return;
   
   const strippedHex = hex.replace('#', '');
   inputColor.style.backgroundColor = "#" + strippedHex;
});


const isValidHex = (hex) => {
    if (!hex) return false;
    
    const strippedHex = hex.replace('#', '');
    
    return strippedHex.length === 3 || strippedHex.length === 6;
}

const convertHexToRGB = (hex) => {
    if(!isValidHex(hex)) return null;
    
    let strippedHex = hex.replace('#', '');
    
    if (strippedHex.length === 3) {
        strippedHex = strippedHex[0] + strippedHex[0]
        + strippedHex[1] + strippedHex[1]
        + strippedHex[2] + strippedHex[2];
    }
    
    // Sending 16 to parseInt converts hex to decimal
    const r = parseInt(strippedHex.substring(0,2), 16);
    const g = parseInt(strippedHex.substring(2,4), 16);
    const b = parseInt(strippedHex.substring(4,6), 16);
    
    return {r,g,b}
}

const convertRGBToHex = (r, g, b) => {
    var convertedR = ("0" + r.toString(16)).slice(-2);
    var convertedG = ("0" + g.toString(16)).slice(-2);
    var convertedB = ("0" + b.toString(16)).slice(-2);
    
    return "#" + convertedR + convertedG + convertedB;
}


const alterColor = (hex, percentage) => {
    //console.log(`hex: ${hex}, percentage: ${percentage}`);
    
    const {r,g,b} = convertHexToRGB(hex);
    
    const amount = Math.floor((percentage/100) * 255);
    const adjR = increaseWithin0To255(r,amount);
    const adjG = increaseWithin0To255(g,amount);
    const adjB = increaseWithin0To255(b,amount);
    
    return convertRGBToHex(adjR, adjG, adjB);
    
};

const increaseWithin0To255 = (hex, amount) => {
    const newHex = hex + amount;
    
    return Math.min(255, Math.max(0, hex + amount));
}

slider.addEventListener("input", () => {
    // check if hex is valid
    
    if (!isValidHex(hexInput.value)) return;
    
    sliderText.textContent = `${slider.value}%`;
    
    const sliderVal = toggleBtn.classList.contains('toggled') ? -slider.value : slider.value;
    
    // get altered hex value
    const alteredHex = alterColor(hexInput.value,sliderVal);
    alteredColor.style.backgroundColor = alteredHex;
    alteredColorText.innerText = `Altered Color ${alteredHex}`;
});











