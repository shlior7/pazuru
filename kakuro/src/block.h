#pragma once
#include "cell_list.h"

class number_cell;
class block
{
public:
	int logical_sum, physical_sum, min, max, empty_cells;
	cell_list<number_cell> numbers_block;
	block(int log_sum = 0) : logical_sum(log_sum), physical_sum(0), min(1), max(9), empty_cells(log_sum) {}
	~block() {}
	int size() const { return numbers_block.size(); }
	int remain() const { return logical_sum - physical_sum; }
	void print() const
	{
		numbers_block.print();
	}
	void setminmax()
	{
		int len = size();
		max = (2 * logical_sum - len * (len - 1)) / 2;
		min = (2 * logical_sum + len * len - 21 * len + 20) / 2;

		min = std::max(min, 1);
		max = std::min(max, 9);
	}
	void push_back(number_cell_ptr &c) { numbers_block.push_back(c); }
	int empty_cells_count() const
	{
		return std::count_if(numbers_block.the_list.cbegin(), numbers_block.the_list.cend(),
												 [](auto &n_cell)
												 { return !n_cell->val; });
	}
	void add_to_sum(int n)
	{
		physical_sum += n;
		n > 0 ? empty_cells-- : empty_cells++;
	}
};
