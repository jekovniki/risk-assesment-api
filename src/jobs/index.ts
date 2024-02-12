import { logger } from "../utils/logger";
import { monitorCACIAFData } from "./commission-against-corruption";

export async function scheduledJobs(): Promise<void> {
    await executeDailyJobs();
}

async function executeDailyJobs() {
    const currentTime = new Date();
    const nextExecutionTime = new Date(
        currentTime.getFullYear(),
        currentTime.getMonth(),
        currentTime.getDate(),
        8, 0, 0, 0)
  
    let timeUntilNextJob = nextExecutionTime.getTime() - currentTime.getTime();
    if (timeUntilNextJob < 0) {
        timeUntilNextJob += 24 * 60 * 60 * 1000;
    }
    logger.info('Checking scheduled daily jobs')
    await monitorCACIAFData();
    logger.info('Daily jobs are up to date')

    setTimeout(async () => {
        logger.info('Checking scheduled daily jobs')
        await monitorCACIAFData();
        logger.info('Daily jobs are up to date')
        executeDailyJobs()
      }, timeUntilNextJob);
}