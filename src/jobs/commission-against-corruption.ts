import FetchAPI from "../libraries/fetch";
import { Category, Institution, Person, StructuredPEPData } from "../dtos/pep/caciaf";
import { PEP_SOURCES } from "../utils/configuration";
import { COMMISSION_AGAINST_CORRUPTION_DATA_PER_YEAR } from "../utils/constants/pep-sources";
import { logger } from "../utils/logger";
import PepModel from "../models/caciaf";

export async function monitorCACIAFData() {
    try {
        logger.info('Running monitor CACIAF data job...');

        const fetchedPEPList = await getAllTimePEPListFromCommissionAgainstCorruption();
        const savedPEPData = await PepModel.find();
        if (!savedPEPData || savedPEPData.length === 0) {
            await PepModel.insertMany(fetchedPEPList);
            logger.info('There were no records for CACIAF data in the database. So they were saved');
            return;
        }

        fetchedPEPList.forEach(async (fetchedPEP) => {
            const savedPEP = savedPEPData.find(saved => saved.name === fetchedPEP.name);

            if (!savedPEP) {
                // If the document doesn't exist, create a new one
                await PepModel.create(fetchedPEP);
            } else {
                // If the document exists, update its history
                savedPEP.history = fetchedPEP.history;
                await savedPEP.save();
            }
        });
        
    } catch (error) {
        logger.error('Error in daily job: ' + JSON.stringify(error));
    }
}

export async function getAllTimePEPListFromCommissionAgainstCorruption(): Promise<StructuredPEPData[]> {
    const pepListPerYear: Array<Person[]> = [];
    let index = 2013; // From this year there are records in the commission database
    for (const year of COMMISSION_AGAINST_CORRUPTION_DATA_PER_YEAR) {
        const fetchedData = await getPEPListFromCommissionAgainstCorruption(PEP_SOURCES.CACIF + year);
        pepListPerYear.push(convertPEPListFromCommissionAgainstCorruptionToJSON(fetchedData, index.toString()));

        index++;
    }

    const formattedArray = formatPEPListFromCommissionAgainstCorruptionPerPerson(pepListPerYear.flat())

    return formattedArray;
}

function formatPEPListFromCommissionAgainstCorruptionPerPerson(pepList: Person[]): StructuredPEPData[] {
    const outputArray: StructuredPEPData[] = [];
    const nameMap: { [name: string]: StructuredPEPData } = {};
  
    pepList.forEach(obj => {
      const { name, position, category, institution, year } = obj;
  
      if (!nameMap[name]) {
        nameMap[name] = {
          name: name,
          history: []
        };
        outputArray.push(nameMap[name]);
      }
  
      nameMap[name].history.push({
        year: year,
        position: position,
        category: category,
        institution: institution
      });
    });
  
    return outputArray;
  
}

async function getPEPListFromCommissionAgainstCorruption(url: string):Promise<string> {
    const request = await FetchAPI.get(url);

    return request.data;
}

function convertPEPListFromCommissionAgainstCorruptionToJSON(data: string, year: string): Person[] {
    const categories: Person[] = [];

    const allCategories = data.split('</Category>');

    // Initialize variables to store the current category, institution, person, and position
    let currentCategory: Category | undefined;
    let currentInstitution: Institution | undefined;
    let currentPerson: Person | undefined;

    for (const line of allCategories) {
        const categoryName = line.match(/<Category Name="(.*?)"><Institution/)?.[1];
        if(categoryName) {
            currentCategory = { name: categoryName, institution: [] }
        }
        const allInstitutions = line.split('</Institution>');
        for (const institutionLine of allInstitutions) {
            const institutionName = institutionLine.match(/<Institution Name="(.*?)" Show="False">/)?.[1];
            if (currentCategory && institutionName) {
                currentInstitution = { name: institutionName, person: [] }
                currentCategory.institution.push(currentInstitution);
            }

            const allPeople = institutionLine.split('</Position></Person>');

            for (const peopleLine of allPeople) {
                const personName = peopleLine.match(/<Person><Name>(.*?)<\/Name><Position>/)?.[1];
                const positionName = peopleLine.match(/<\/Name><Position><Name>(.*?)<\/Name>/)?.[1];
                if (currentInstitution && personName && positionName) {
                    currentPerson = { 
                        name: personName, 
                        position: positionName,
                        category: categoryName as string,
                        institution: institutionName as string,
                        year: year
                    };
                    categories.push(currentPerson);
                }
            }
        }
    }

    return categories as Person[];
}