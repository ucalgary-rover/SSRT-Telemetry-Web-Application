# Exit immediately if a command exits with a non-zero status
set -e

# Run tests
echo "Running vitest unit tests for React Vite App"
npm run test || { echo "Vitest unit tests failed, exiting."; exit 1; }

# For running more tests just add below:

# echo "Running some test"
# npm run test || { echo "Tests failed, exiting"; exit 1; }


# Display completion.
echo "Tests completed successfully."