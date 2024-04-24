// codeforces.service.ts
import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class CodeforcesService {
  async getUserInfo(username: string) {
    // count = 1 in user.status
    // handel = username
    const response = await axios.get(`https://codeforces.com/api/user.status?count=10&handle=${username}`);
    console.log(response.data.result);
    return response.data.result[0];
  }

  async getRandomProblem() {
    const response = await axios.get('https://codeforces.com/api/problemset.problems');
    const problems = response.data.result.problems;
    const randomProblemIndex = Math.floor(Math.random() * problems.length);
    return problems[randomProblemIndex];
  }

  async checkCompilationError(username: string, contestId: string, indexProblem: string): Promise<boolean> {
    const response = await axios.get(`https://codeforces.com/api/user.status?handle=${username}&count=3`);
    // iterar sobre los 3 ultimos problemas
    for (const submission of response.data.result) {
        // hace cuantos segundos se hizo la submission
        const submissionTime = new Date(submission.creationTimeSeconds * 1000);
        const currentTime = new Date();
        const diff = (currentTime.getTime() - submissionTime.getTime()) / 1000;
        console.log('contestId', submission.problem.contestId, 'index', submission.problem.index, 'diff', diff, 'verdict', submission.verdict);
        console.log(submission.problem.contestId == contestId, submission.problem.index === indexProblem, diff < 120, submission.verdict === 'COMPILATION_ERROR');
        if (submission.problem.contestId == contestId && submission.problem.index == indexProblem && diff < 120 && submission.verdict == 'COMPILATION_ERROR') {
            return true;
        }
    }
    return false;
  }

  async checkAuthenticationName(username: string) {
    // count = 1 in user.status
    // handel = username
    const response = await axios.get(`https://codeforces.com/api/user.info?handles=${username}`);
    console.log(response.data.result[0].firstName);
    return (response.data.result[0].firstName == "P2P-Auth");
  }

}
