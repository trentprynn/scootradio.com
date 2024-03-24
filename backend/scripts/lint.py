import subprocess


def main():
    mypy_result = subprocess.run(
        ["mypy", "."], check=False, capture_output=True, text=True
    )
    if mypy_result.returncode != 0:
        print("Mypy errors:")
        print(mypy_result.stdout)
        print(mypy_result.stderr)
        return

    ruff_lint = subprocess.run(
        [
            "ruff",
            "--fix",
        ],
        check=False,
        capture_output=True,
        text=True,
    )
    if ruff_lint.returncode != 0:
        print("Ruff lint errors:")
        print(ruff_lint.stdout)
        print(ruff_lint.stderr)
        return

    ruff_format = subprocess.run(
        [
            "ruff",
            "format",
        ],
        check=False,
        capture_output=True,
        text=True,
    )
    if ruff_format.returncode != 0:
        print("Ruff format errors:")
        print(ruff_format.stdout)
        print(ruff_format.stderr)
        return


if __name__ == "__main__":
    main()
