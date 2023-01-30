package com.gems;

import org.springframework.web.bind.annotation.GetMapping;
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
		return new ResponseEntity<>(solved, HttpStatus.OK );
	}
	@PostMapping("/history")
	public ResponseEntity<String[]> history(@RequestBody int[][] board) {
		SudokuSolver solver = new SudokuSolver(board);
		int[][] solved = solver.SolveSudoku();
		return new ResponseEntity<>(solver.getHistory(), HttpStatus.OK);
	}
}
