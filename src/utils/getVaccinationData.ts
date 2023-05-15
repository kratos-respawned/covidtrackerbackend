import { AgeWise, StateData, V } from "./vaccinationData";

export const getVaccinationData = async () => {
    const resp = await fetch("https://api.cowin.gov.in/api/v1/reports/v2/getPublicReports?state_id=&district_id=&date=2023-05-14");
    const data = await resp.json();
    const stateWiseData: StateData[] = data.getBeneficiariesGroupBy;
    const ageWiseResp:AgeWise = data.vaccinationByAge;
    
    const ageWiseData = [
        {
            title: "12-14",
            value: ageWiseResp["vac_12_14"],
            color:"#1b096c"
        },
        {
            title: "15-17",
            value: ageWiseResp["vac_15_17"],
            color:"#3b15c2"
        },
        {
            title: "18-45",
            value: ageWiseResp["vac_18_45"],
            
            color:"#32139f"
            
        },
        {
            title: "45-60",
            value: ageWiseResp["vac_45_60"],
            color:"#4719e8"
            
        },
        {
            title: "above_60",
            value: ageWiseResp["above_60"],
            color:"#542bfc"
        },
    ]
    

    const registrationData = data.topBlock.registration;
    const sitesConductingVaccination = data.topBlock.sites;
    const vaccination = vaccinationData(data.topBlock.vaccination);
    return { registrationData, sitesConductingVaccination, ...vaccination, ageWiseData, stateWiseData }
}


const vaccinationData = (Data: V) => {
    const genderWiseData = [
        {
            title: "male",
            value: Data.male,
            color:"#542bfc"
        },
        {
            title: "female",
            value: Data.female,
            color:"#4719e8"
        },
        // {
        //     title: "others",
        //     value: Data.others,
        //     color:"#8fe101"
        // }
    ]

    const vaccineWiseData = [
        {
            title: "covishield",
            value: Data.covishield,
            color:"#32139f"
            
        },
        {
            title: "covaxin",
            value: Data.covaxin,
            color:"#4619e8"
        }, {
            title: "corbevax",
            value: Data.corbevax,
            color:"#32139f"
        },
        
    ]
    const doseWiseData = {
        tot_dose_1: Data.tot_dose_1,
        tot_dose_2: Data.tot_dose_2,
        tot_pd: Data.tot_pd,
        total_doses: Data.total_doses
    }
    return { genderWiseData, vaccineWiseData, doseWiseData }
}
