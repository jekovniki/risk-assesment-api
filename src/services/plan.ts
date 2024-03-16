import { TPlans } from "../dtos/base";
import { IPlanData } from "../dtos/users";


export function getPlanDataByName(plan: TPlans): IPlanData {
    if (plan === 'Free') {
        return {
            reports: 3,
            searches: 10
        }
    }

    if (plan === 'Standard') {
        return {
            reports: 10,
            searches: 100
        }
    }

    if (plan === 'Pro') {
        return {
            reports: 100,
            searches: 2000
        }
    }

    if (plan === 'Custom') {
        return {
            reports: 10000,
            searches: 20000
        }
    }

    throw new Error('Provided plan: ' + plan + ' is not one of the allowed in the system - Free, Standard, Pro');
}