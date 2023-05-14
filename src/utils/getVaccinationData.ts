import { AgeWise, StateData, V } from "./vaccinationData";

export const getVaccinationData = async () => {
    const resp = await fetch("https://api.cowin.gov.in/api/v1/reports/v2/getPublicReports?state_id=&district_id=&date=2023-05-14");
    const data = await resp.json();
    const stateWiseData: StateData[] = data.getBeneficiariesGroupBy;
    const ageWiseData: AgeWise = data.vaccinationByAge;
    const registrationData = data.topBlock.registration;
    const sitesConductingVaccination = data.topBlock.sites;
    const vaccination = vaccinationData(data.topBlock.vaccination);
    return { registrationData, sitesConductingVaccination, ...vaccination, ageWiseData, stateWiseData }
}


const vaccinationData = (Data: V) => {
    const genderWiseData = [
        {
            category: "male",
            value: Data.male,
        },
        {
            category: "female",
            value: Data.female,
        },
        {
            category: "others",
            value: Data.others
        }
    ]
    const vaccineWiseData = [
        {
            name: "covishield",
            value: Data.covishield,
        },
        {
            name: "covaxin",
            value: Data.covaxin,
        }, {
            name: "sputnik",
            value: Data.sputnik,
        }, {
            name: "zycov",
            value: Data.zycov,
        }, {
            name: "corbevax",
            value: Data.corbevax,
        },
        {
            name: "covovax",
            value: Data.covovax,
        }
    ]

    const doseWiseData = {
        tot_dose_1: Data.tot_dose_1,
        tot_dose_2: Data.tot_dose_2,
        tot_pd: Data.tot_pd,
        total_doses: Data.total_doses
    }
    return { genderWiseData, vaccineWiseData, doseWiseData }
}
