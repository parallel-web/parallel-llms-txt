#!/usr/bin/env bash
set -euo pipefail

# Start from main with an empty index; never include somebody else's staged work.
test "$(git branch --show-current)" = main
git diff --cached --quiet
git add -A -- public
if git diff --cached --quiet; then
  echo "Generated context is unchanged."
else
  # Publish generated documents, not maintained code or routing.
  while IFS= read -r -d '' filename; do
    case "$filename" in
      public/*.md|public/llms.txt) ;;
      *) echo "Refusing to publish non-generated file: $filename"; exit 1 ;;
    esac
  done < <(git diff --cached --name-only -z)

  git -c user.name='github-actions[bot]' -c user.email='github-actions[bot]@users.noreply.github.com' commit -m "Refresh generated Parallel context"
fi

# Checkout supplies GITHUB_TOKEN credentials. Never force or rebase a snapshot.
# Push even when unchanged: an advanced main must block deploying this old tree.
git push origin HEAD:refs/heads/main
