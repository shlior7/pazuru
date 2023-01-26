#define _CRTDBG_MAP_ALLOC
// #include <crtdbg.h>
#ifdef _DEBUG
#define DEBUG_NEW new (_NORMAL_BLOCK, __FILE__, __LINE__)
#define new DEBUG_NEW
#endif
#include <iostream>
#include <fstream>
#include <string>
#include <list>
#include <algorithm>
#include <vector>
#include <iomanip>
#include <memory>
#include <unistd.h>

#define OK 2
#define ALREADY_EXISTS 1
#define NOT_FOUND -1

#define MAX_SIZE 100
#define rcastcc reinterpret_cast<const char *>
#define rcastc reinterpret_cast<char *>

#define cell_ptr shared_ptr<cell>
#define sum_cell_ptr shared_ptr<sum_cell>
#define number_cell_ptr shared_ptr<number_cell>

using namespace std;
/*Getting input int between range*/
// int getInt(int rangeL, int rangeR, const string& prompt);
