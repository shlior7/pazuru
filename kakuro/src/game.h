#include "board.h"

class Game
{
public:
	// const int SUM[] = { 0,1,3,6,10,15,21,28,36,45 };
	unique_ptr<Board> game_board;
	Game(int width, int height) : game_board(make_unique<Board>(width, height)) {}
	Game(std::vector<std::vector<int>> board) : game_board(make_unique<Board>(board)) {}
	bool solver(bool v = true);
	void solve_vertical(sum_cell_ptr b);
	void solve_horizontal(sum_cell_ptr b);
	bool possible(const sum_cell_ptr &k_down, const sum_cell_ptr &k_right, int n);
	bool validate();
};
