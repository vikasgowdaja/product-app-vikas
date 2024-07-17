import React, { useState } from 'react'
import {Slider, Box} from "@mui/material"


function sliderValueText(value) {
    return `₹${value}`;
}

function SliderComponent({onSliderValueChange}) {
    const [sliderValueRange, setSliderValueRange] = useState([0,5000])
    const handleChange = (_, newValue) => {
        setSliderValueRange(newValue);
    };
    return (
        <Box sx={{ width: "100%" }}>
            <Slider
                getAriaLabel={() => 'Price range'}
                value={sliderValueRange}
                disableSwap
                onChange={handleChange}
                valueLabelDisplay="auto"
                step={100}
                min={100}
                max={5000}
                onChangeCommitted={()=>onSliderValueChange(sliderValueRange)}
                getAriaValueText={sliderValueText}
            />
        </Box>
    )
}

export default SliderComponent