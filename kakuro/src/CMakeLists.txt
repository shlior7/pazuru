cmake_minimum_required(VERSION 2.8.12)
project(main)

find_package(PythonInterp REQUIRED)
include_directories(${PYTHON_INCLUDE_DIRS})

add_subdirectory(pybind11)
pybind11_add_module(main SHARED main.cpp game.cpp board.cpp)
