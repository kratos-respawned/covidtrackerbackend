 type StateData={
    state_id: string;
    id: string;
    title: string;
    state_name: string;
    total: number;
    partial_vaccinated: number;
    totally_vaccinated: number;
    precaution_dose: number;
    today: number;
}
 type V={
    total: number,
    male: number,
    female: number,
    others: number,
    covishield: number,
    covaxin: number,
    sputnik: number,
    zycov: number,
    corbevax: number,
    covovax: number,
    tot_dose_1: number,
    tot_dose_2: number,
    tot_pd: number,
    total_doses: number,       
}


 type AgeWise={
    total: number;
    vac_12_14: number;
    vac_15_17: number;
    vac_18_45: number;
    vac_45_60: number;
    above_60: number;
}

export {StateData,V,AgeWise}