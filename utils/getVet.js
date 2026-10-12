export const getVet =(allVets,vetID)=>{
    let vet = allVets.filter(v=> v._id == vetID)
    return vet[0]
}