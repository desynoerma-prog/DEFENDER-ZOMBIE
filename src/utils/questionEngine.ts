import {
  MathQuestion,
  MathElement,
  MathDifficulty,
  Question,
  QuestionAttempt,
  SessionLearningReport,
  AdventureLevel
} from '../types';
import { GRADE_4_MATH_BANK, WORLD_ELEMENT_MAP, toLegacyQuestion } from '../data/mathCurriculum';

/**
 * 🌱 MATH DEFENDER - QUESTION ENGINE
 *
 * Core Educational Assessment Engine:
 * - Grade 4 Indonesian Curriculum Alignment
 * - 5 STEAM Mathematical Elements: Bilangan, Aljabar, Pengukuran, Geometri, Data
 * - Cognitive Complexity: LOW, MIDDLE, HARD + BOSS challenges
 * - Adaptive Difficulty:
 *    * 3 consecutive LOW correct -> promotes to MIDDLE
 *    * 3 consecutive MIDDLE correct -> promotes to HARD
 *    * 2 consecutive wrong -> provides easier/guided question
 * - Diagnostic Learning Report Generator
 */

export class QuestionEngine {
  private attempts: QuestionAttempt[] = [];
  private consecutiveCorrect: number = 0;
  private consecutiveWrong: number = 0;
  private currentDifficulty: MathDifficulty = 'LOW';
  private usedQuestionIds: Set<string> = new Set();

  constructor(initialTier?: AdventureLevel) {
    if (initialTier === 'lower') {
      this.currentDifficulty = 'LOW';
    } else if (initialTier === 'middle') {
      this.currentDifficulty = 'MIDDLE';
    } else if (initialTier === 'strong') {
      this.currentDifficulty = 'HARD';
    }
  }

  /**
   * Reset session state for a new game or stage
   */
  public resetSession(initialTier?: AdventureLevel): void {
    this.attempts = [];
    this.consecutiveCorrect = 0;
    this.consecutiveWrong = 0;
    this.usedQuestionIds.clear();

    if (initialTier === 'lower') {
      this.currentDifficulty = 'LOW';
    } else if (initialTier === 'middle') {
      this.currentDifficulty = 'MIDDLE';
    } else if (initialTier === 'strong') {
      this.currentDifficulty = 'HARD';
    } else {
      this.currentDifficulty = 'LOW';
    }
  }

  /**
   * Adaptive Difficulty Transition
   * Rule:
   * - 3 consecutive LOW correct -> promote to MIDDLE
   * - 3 consecutive MIDDLE correct -> promote to HARD
   * - 2 consecutive incorrect -> demote to easier level
   */
  public recordAnswer(
    question: MathQuestion | Question,
    isCorrect: boolean,
    hintsUsed: number = 0,
    timeSpentSeconds: number = 15
  ): void {
    const qElement = (question.element as MathElement) || 'Bilangan';
    const qSubtopic = question.subtopic || ('topic' in question ? (question as Question).topic : undefined) || 'Umum';
    const qDiff = (question.difficulty as MathDifficulty) || this.currentDifficulty;
    const qSkill = question.skill || `${qElement} - ${qSubtopic}`;

    this.attempts.push({
      questionId: question.id,
      element: qElement,
      subtopic: qSubtopic,
      difficulty: qDiff,
      skill: qSkill,
      isCorrect,
      hintsUsed,
      timeSpentSeconds
    });

    if (isCorrect) {
      this.consecutiveCorrect += 1;
      this.consecutiveWrong = 0;

      // Adaptive promotion
      if (this.currentDifficulty === 'LOW' && this.consecutiveCorrect >= 3) {
        this.currentDifficulty = 'MIDDLE';
        this.consecutiveCorrect = 0;
      } else if (this.currentDifficulty === 'MIDDLE' && this.consecutiveCorrect >= 3) {
        this.currentDifficulty = 'HARD';
        this.consecutiveCorrect = 0;
      }
    } else {
      this.consecutiveWrong += 1;
      this.consecutiveCorrect = 0;

      // Adaptive gentle demotion
      if (this.consecutiveWrong >= 2) {
        if (this.currentDifficulty === 'HARD') {
          this.currentDifficulty = 'MIDDLE';
        } else if (this.currentDifficulty === 'MIDDLE') {
          this.currentDifficulty = 'LOW';
        }
        this.consecutiveWrong = 0;
      }
    }
  }

  /**
   * Fetch the next optimal question tailored to the student's current level & world
   */
  public getNextQuestion(options: {
    worldId?: number;
    preferredElement?: MathElement;
    isBossWave?: boolean;
    tier?: AdventureLevel;
  }): Question {
    const { worldId, preferredElement, isBossWave, tier } = options;

    // 1. Determine target element (e.g. World 1 = Bilangan, World 2 = Aljabar, etc.)
    let targetElement: MathElement | undefined = preferredElement;
    if (!targetElement && worldId && WORLD_ELEMENT_MAP[worldId]) {
      targetElement = WORLD_ELEMENT_MAP[worldId];
    }

    // 2. Filter available questions
    let candidatePool = GRADE_4_MATH_BANK.filter((q) => {
      if (targetElement && q.element !== targetElement) return false;
      return true;
    });

    if (candidatePool.length === 0) {
      candidatePool = GRADE_4_MATH_BANK;
    }

    // 3. Handle Boss Wave Questions (combines multi-step skills)
    if (isBossWave) {
      const bossPool = candidatePool.filter((q) => q.isBossQuestion);
      if (bossPool.length > 0) {
        const picked = bossPool[Math.floor(Math.random() * bossPool.length)];
        return this.formatAndRandomize(picked);
      }
    }

    // 4. Filter by difficulty
    let targetDiff = this.currentDifficulty;
    if (tier === 'lower') targetDiff = 'LOW';
    else if (tier === 'middle' && this.currentDifficulty === 'LOW') targetDiff = 'MIDDLE';
    else if (tier === 'strong') targetDiff = 'HARD';

    let diffPool = candidatePool.filter((q) => q.difficulty === targetDiff);
    if (diffPool.length === 0) {
      diffPool = candidatePool;
    }

    // Prefer unused questions first
    const unused = diffPool.filter((q) => !this.usedQuestionIds.has(q.id));
    const finalPool = unused.length > 0 ? unused : diffPool;

    const selected = finalPool[Math.floor(Math.random() * finalPool.length)];
    this.usedQuestionIds.add(selected.id);

    return this.formatAndRandomize(selected);
  }

  /**
   * Randomize multiple choice options safely
   */
  private formatAndRandomize(mq: MathQuestion): Question {
    const legacy = toLegacyQuestion(mq);
    const originalChoices = [...legacy.choices];
    const correctText = originalChoices[legacy.correctAnswerIndex];

    // Fisher-Yates shuffle
    const shuffled = [...originalChoices];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    const newCorrectIndex = shuffled.indexOf(correctText);

    return {
      ...legacy,
      choices: shuffled,
      correctAnswerIndex: newCorrectIndex
    };
  }

  /**
   * Generate comprehensive learning diagnostic report for student/teacher
   */
  public generateSessionReport(score: number, highestCombo: number, finalEnergy: number): SessionLearningReport {
    const totalQuestions = this.attempts.length;
    const correctAnswers = this.attempts.filter((a) => a.isCorrect).length;
    const wrongAnswers = totalQuestions - correctAnswers;
    const accuracy = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;

    const elementPerformance: Record<MathElement, { total: number; correct: number; percentage: number }> = {
      Bilangan: { total: 0, correct: 0, percentage: 0 },
      Aljabar: { total: 0, correct: 0, percentage: 0 },
      Pengukuran: { total: 0, correct: 0, percentage: 0 },
      Geometri: { total: 0, correct: 0, percentage: 0 },
      Data: { total: 0, correct: 0, percentage: 0 }
    };

    const skillMap: Record<string, { total: number; correct: number }> = {};

    this.attempts.forEach((attempt) => {
      const elem = attempt.element;
      if (elementPerformance[elem]) {
        elementPerformance[elem].total += 1;
        if (attempt.isCorrect) {
          elementPerformance[elem].correct += 1;
        }
      }

      if (!skillMap[attempt.skill]) {
        skillMap[attempt.skill] = { total: 0, correct: 0 };
      }
      skillMap[attempt.skill].total += 1;
      if (attempt.isCorrect) {
        skillMap[attempt.skill].correct += 1;
      }
    });

    // Calculate percentages for elements
    (Object.keys(elementPerformance) as MathElement[]).forEach((elem) => {
      const e = elementPerformance[elem];
      e.percentage = e.total > 0 ? Math.round((e.correct / e.total) * 100) : 100;
    });

    const masteredSkills: string[] = [];
    const needsPracticeSkills: string[] = [];

    Object.entries(skillMap).forEach(([skill, stat]) => {
      const passRate = stat.correct / stat.total;
      if (passRate >= 0.75) {
        masteredSkills.push(skill);
      } else {
        needsPracticeSkills.push(skill);
      }
    });

    // Fallback if no specific skills recorded yet
    if (masteredSkills.length === 0 && correctAnswers > 0) {
      masteredSkills.push('Konsep Dasar Bilangan & Operasi');
    }

    return {
      score,
      totalQuestions,
      correctAnswers,
      wrongAnswers,
      accuracy,
      highestCombo,
      finalEnergy,
      elementPerformance,
      masteredSkills,
      needsPracticeSkills
    };
  }

  public getCurrentDifficulty(): MathDifficulty {
    return this.currentDifficulty;
  }
}

// Global Singleton Instance for easy integration across components
export const questionEngine = new QuestionEngine();
