export class StringComparison {

    private static calculate(s1: string, s2: string): number {
      s1 = s1.toLowerCase();
      s2 = s2.toLowerCase();
  
      const dp: number[][] = [];
  
      for (let i = 0; i <= s1.length; i++) {
        dp[i] = [];
        for (let j = 0; j <= s2.length; j++) {
          if (i === 0) {
            dp[i][j] = j;
          } else if (j === 0) {
            dp[i][j] = i;
          } else {
            dp[i][j] = StringComparison.min(
              dp[i - 1][j - 1] + StringComparison.costOfSubstitution(s1.charAt(i - 1), s2.charAt(j - 1)),
              dp[i - 1][j] + 1,
              dp[i][j - 1] + 1
            );
          }
        }
      }
  
      return dp[s1.length][s2.length];
    }
  
    private static costOfSubstitution(a: string, b: string): number {
      return a === b ? 0 : 1;
    }
  
    private static min(...numbers: number[]): number {
      return Math.min(...numbers);
    }
  
    public static areSimilar(s1: string, s2: string): boolean {
      const distance = StringComparison.calculate(s1, s2);
      return distance <= 3;
    }
  
    public static recommendSimilarWords(input: string, words: string[]): string[] {
      const similarWords: string[] = [];
  
      for (const word of words) {
        if (StringComparison.areSimilar(input, word)) {
          similarWords.push(word);
        }
      }
  
      return similarWords;
    }
  }
  