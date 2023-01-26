#include <pybind11/pybind11.h>
#include <iostream>
#include <pybind11/stl.h>
#include "stdio.h"
#include "game.h"

#define STRINGIFY(x) #x
#define MACRO_STRINGIFY(x) STRINGIFY(x)

std::vector<std::vector<int>> solve_kakuro(std::vector<std::vector<int>> board)
{
    Game kakuro(board);
    kakuro.solver();
    kakuro.game_board->print();
    return kakuro.game_board->toVector();
}

namespace py = pybind11;

PYBIND11_MODULE(kakuro, m)
{
    // optional module docstring
    m.doc() = "pybind11 main plugin";

    m.def(
        "solve_kakuro", &solve_kakuro, R"pbdoc("A function which solves kakuro")pbdoc");
}
