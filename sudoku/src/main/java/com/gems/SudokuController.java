package com.gems;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@CrossOrigin
@RestController
public class SudokuController {

	@PostMapping("/solve")
	public ResponseEntity<int[][]> solve(@RequestBody int[][] board) {
		SudokuSolver solver = new SudokuSolver(board);
		int[][] solved = solver.SolveSudoku();
		boolean isSolved = SudokuValidator.isValidSudoku(solved);
		System.out.println(isSolved);
		return new ResponseEntity<>(solved, isSolved ? HttpStatus.OK : HttpStatus.I_AM_A_TEAPOT);
	}
}
