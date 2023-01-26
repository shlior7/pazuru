package com.gems;

import java.util.Arrays;

public class SudokuValidator {

  static int N = 9;

  static boolean isinRange(int[][] board) {
    for (int i = 0; i < N; i++) {
      for (int j = 0; j < N; j++) {

        if (board[i][j] <= 0 ||
            board[i][j] > 9) {
          return false;
        }
      }
    }
    return true;
  }

  static boolean isValidSudoku(int board[][]) {
    if (isinRange(board) == false) {
      return false;
    }

    boolean[] unique = new boolean[N + 1];

    for (int i = 0; i < N; i++) {
      Arrays.fill(unique, false);
      for (int j = 0; j < N; j++) {
        int Z = board[i][j];

        if (unique[Z]) {
          return false;
        }
        unique[Z] = true;
      }
    }

    for (int i = 0; i < N; i++) {

      Arrays.fill(unique, false);

      for (int j = 0; j < N; j++) {

        int Z = board[j][i];

        if (unique[Z]) {
          return false;
        }
        unique[Z] = true;
      }
    }

    for (int i = 0; i < N - 2; i += 3) {

      for (int j = 0; j < N - 2; j += 3) {

        Arrays.fill(unique, false);

        for (int k = 0; k < 3; k++) {
          for (int l = 0; l < 3; l++) {

            int X = i + k;

            int Y = j + l;

            int Z = board[X][Y];

            if (unique[Z]) {
              return false;
            }
            unique[Z] = true;
          }
        }
      }
    }

    return true;
  }
}
