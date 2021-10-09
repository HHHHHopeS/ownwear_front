export default function calculateScale(number) {
    function checkDecimal(num,min){
        const calNum = num/min
        if(num%1===0){
            return calNum.toFixed(0)
        }
        else return calNum.toFixed(1)
    }
    let scale = "" 

    let min = 1
    if(number>1000&&number<1000000){
        min=1000
         scale = "k"
    }
    else if(number>=1000000&&number<1000000000){
        min=1000000
        scale = "m"
    }
    else if(number>=1000000000&&number<1000000000000){
        min=1000000000
        scale = "m"
    }
    else if(number>=1000000000000&&number<1000000000000000){
        min=1000000000000
        scale = "b"
    }
    else if(number>=1000000000000000&&number<1000000000000000000){
        min = 1000000000000000
        scale = "t"
    }


    return checkDecimal(number,min) + scale
};
