const getUniqueValues=(arr,atr)=>{
    const newArr=arr.map(obj=>obj[atr])        
    const set =new Set(newArr)
    return Array.from(set).sort((a,b)=>a.localeCompare(b))
}