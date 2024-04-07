import logging
import subprocess

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


def main():
    logger.info("running mypy")
    mypy_result = subprocess.run(
        ["mypy", "."], check=False, capture_output=True, text=True
    )
    if mypy_result.returncode != 0:
        logger.error("Mypy errors:")
        logger.error(mypy_result.stdout)
        logger.error(mypy_result.stderr)
        return

    logger.info("running ruff lint")
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
        logger.error("Ruff lint errors:")
        logger.error(ruff_lint.stdout)
        logger.error(ruff_lint.stderr)
        return

    logger.info("running ruff format")
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
        logger.error("Ruff format errors:")
        logger.error(ruff_format.stdout)
        logger.error(ruff_format.stderr)
        return


if __name__ == "__main__":
    main()
