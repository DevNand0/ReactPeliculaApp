import ImageColors from "react-native-image-colors";
export const getImageColors = async(url:string)=>{
    const colors = await ImageColors.getColors(url,{});
    console.log(colors);

    let primary;
    let secondary;
    
    if(colors.platform==="android"){
        primary = colors.dominant
        secondary=colors.average
    }else{
        //const backgroundColor = colors.background
        
    }
    return [primary, secondary]
}
