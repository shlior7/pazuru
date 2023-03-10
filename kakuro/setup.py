import sys

# Available at setup time due to pyproject.toml
from pybind11 import get_cmake_dir
from pybind11.setup_helpers import Pybind11Extension, build_ext
from setuptools import setup, find_packages

__version__ = "0.0.1"

# The main interface is through Pybind11Extension.
# * You can add cxx_std=11/14/17, and then build_ext can be removed.
# * You can set include_pybind11=false to add the include directory yourself,
#   say from a submodule.
#
# Note:
#   Sort input source files if you glob sources to ensure bit-for-bit

ext_modules = [
    Pybind11Extension(
        "kakuro",
        ["src/main.cpp", "src/game.cpp", "src/board.cpp"],
        # Example: passing in the version to the compiled code
        cxx_std=14,
        define_macros=[('VERSION_INFO', __version__)],
    ),
]

setup(
    name="kakuro",
    version=__version__,
    author="Lior Shtaimberg",
    ext_modules=ext_modules,
    # Currently, build_ext only provides an optional "highest supported C++
    # level" feature, but in the future it may provide more features.
    cmdclass={"build_ext": build_ext},
    zip_safe=False,
    python_requires=">=3.9",
)
