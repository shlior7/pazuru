#include "game.h"

int i = 0;

int empty_cells_count(unique_ptr<block> &b)
{
	int empty_cells = 0;
	if (!b)
		return empty_cells;
	for (number_cell_ptr &n_cell : b->numbers_block.the_list)
		if (n_cell->get_val() == 0)
			empty_cells++;
	return empty_cells;
}

bool Game::solver(bool v)
{
	for (auto &b : game_board->sum_cells.the_list)
	{
		if (v)
		{
			solve_vertical(b);
			if (b->v_physical_sum() != b->v_logical_sum())
				return false;
		}
		else
		{
			solve_horizontal(b);
			if (b->h_physical_sum() != b->h_logical_sum())
				return false;
		}
	}
	return true;
}

void Game::solve_vertical(sum_cell_ptr b)
{
	if (b->vertical_block)
		for (auto &n_cell : b->vertical_block->numbers_block.the_list)
		{
			if (!n_cell->val)
				for (int n = b->vertical_block->min; n <= b->vertical_block->max; n++)
					if (possible(n_cell->v_sum_cell, n_cell->h_sum_cell, n))
					{
						n_cell->val = n;
						n_cell->v_sum_cell->vertical_block->add_to_sum(n);
						if (n_cell->h_sum_cell)
							n_cell->h_sum_cell->horizontal_block->add_to_sum(n);

						if ((b->vertical_block->empty_cells_count() == 0 && b->vertical_block->remain() != 0) || !solver(false))
						{
							n_cell->val = 0;
							n_cell->v_sum_cell->vertical_block->add_to_sum(-n);
							if (n_cell->h_sum_cell)
								n_cell->h_sum_cell->horizontal_block->add_to_sum(-n);
						}
						else
							break;
					}
			if (!n_cell->val)
				break;
		}
}

void Game::solve_horizontal(sum_cell_ptr b)
{

	if (b->horizontal_block)
		for (auto &n_cell : b->horizontal_block->numbers_block.the_list)
		{
			if (!n_cell->val)
				for (int n = b->horizontal_block->min; n <= b->horizontal_block->max; n++)
				{
					if (possible(n_cell->v_sum_cell, n_cell->h_sum_cell, n))
					{
						n_cell->val = n;
						n_cell->h_sum_cell->horizontal_block->add_to_sum(n);
						if (n_cell->v_sum_cell)
							n_cell->v_sum_cell->vertical_block->add_to_sum(n);

						if (!solver(true))
						{
							n_cell->val = 0;
							n_cell->h_sum_cell->horizontal_block->add_to_sum(-n);
							if (n_cell->v_sum_cell)
								n_cell->v_sum_cell->vertical_block->add_to_sum(-n);
						}
						else
							break;
					}
				}
			if (!n_cell->val)
				break;
		}
}

bool Game::possible(const sum_cell_ptr &v_sum_cell, const sum_cell_ptr &h_sum_cell, int n)
{

	if (n > v_sum_cell->vertical_block->max || n < v_sum_cell->vertical_block->min)
		return false;
	if (n > h_sum_cell->horizontal_block->max || n < h_sum_cell->horizontal_block->min)
		return false;
	if (n > v_sum_cell->vertical_block->remain())
		return false;
	if (n > h_sum_cell->horizontal_block->remain())
		return false;
	if (!std::all_of(v_sum_cell->vertical_block->numbers_block.the_list.cbegin(), v_sum_cell->vertical_block->numbers_block.the_list.cend(),
									 [n](auto &n_cell)
									 { return n_cell->val != n; }))
		return false;
	if (!std::all_of(h_sum_cell->horizontal_block->numbers_block.the_list.cbegin(), h_sum_cell->horizontal_block->numbers_block.the_list.cend(),
									 [n](auto &n_cell)
									 { return n_cell->val != n; }))
		return false;

	if (empty_cells_count(v_sum_cell->vertical_block) > 1 && v_sum_cell->v_physical_sum() + n == v_sum_cell->v_logical_sum())
		return false;

	if (empty_cells_count(h_sum_cell->horizontal_block) > 1 && h_sum_cell->h_physical_sum() + n == h_sum_cell->h_logical_sum())
		return false;

	return true;
}

bool Game::validate()
{
	for (auto &sum_cell : game_board->sum_cells.the_list)
	{
		if (!sum_cell->validate() || empty_cells_count(sum_cell->vertical_block) != 0 || empty_cells_count(sum_cell->horizontal_block) != 0)
		{
			cout << "sum_cell: " << sum_cell->v_logical_sum() << " " << sum_cell->v_physical_sum() << " " << sum_cell->h_logical_sum() << " " << sum_cell->h_physical_sum() << endl;
			return false;
		}
	}
	return true;
}
