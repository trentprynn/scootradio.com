import structlog
import subprocess


log = structlog.get_logger()


def lint():
    log.info("running mypy")
    mypy_result = subprocess.run(
        ["mypy", "."], check=False, capture_output=True, text=True
    )
    if mypy_result.returncode != 0:
        log.error("Mypy errors:")
        log.error(mypy_result.stdout)
        log.error(mypy_result.stderr)
        return

    log.info("running ruff lint")
    ruff_lint = subprocess.run(
        [
            "ruff",
            "check",
            "--fix",
        ],
        check=False,
        capture_output=True,
        text=True,
    )
    if ruff_lint.returncode != 0:
        log.error("Ruff lint errors:")
        log.error(ruff_lint.stdout)
        log.error(ruff_lint.stderr)
        return

    log.info("running ruff format")
    ruff_format = subprocess.run(
        ["ruff", "format"],
        check=False,
        capture_output=True,
        text=True,
    )
    if ruff_format.returncode != 0:
        log.error("Ruff format errors:")
        log.error(ruff_format.stdout)
        log.error(ruff_format.stderr)
        return


def entrypoint():
    lint()


def main():
    entrypoint()


if __name__ == "__main__":
    main()
