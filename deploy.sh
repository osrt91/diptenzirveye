#!/bin/bash
# DiptenZirveye - Deploy & Rollback Script
#
# Deploy:   bash deploy.sh "commit mesajı"
# Rollback: bash deploy.sh --rollback

set -e

VPS_USER="root"
VPS_HOST="72.61.178.25"
VPS_KEY="$HOME/.ssh/kismet_vps"
VPS_REPO="/docker/diptenzirveye/repo"
PM2_APP="diptenzirveye"
BRANCH="main"
SITE_URL="https://www.diptenzirveye.com"

# ============ ROLLBACK ============
if [ "$1" = "--rollback" ]; then
  echo "========================================="
  echo "  ROLLBACK - DiptenZirveye"
  echo "========================================="

  echo ""
  echo "Son 5 commit:"
  git log --oneline -5
  echo ""

  PREV=$(git log --oneline -2 | tail -1 | cut -d' ' -f1)
  echo "Geri donulecek commit: $PREV"
  echo ""
  read -p "Emin misin? (e/h): " CONFIRM
  if [ "$CONFIRM" != "e" ]; then
    echo "Iptal edildi."
    exit 0
  fi

  git revert HEAD --no-edit
  git push origin $BRANCH

  echo ""
  echo "VPS guncelleniyor..."
  ssh -i "$VPS_KEY" -o StrictHostKeyChecking=no "$VPS_USER@$VPS_HOST" "
    cd $VPS_REPO && \
    git pull origin $BRANCH && \
    npm run build && \
    pm2 restart $PM2_APP
  "

  echo ""
  echo "========================================="
  echo "  Rollback tamamlandi!"
  echo "========================================="
  exit 0
fi

# ============ DEPLOY ============
MSG="${1:-update}"
DEPLOY_LOG="/tmp/diptenzirveye-deploys.log"
DEPLOY_LIMIT=10
DEPLOY_WINDOW=3600

NOW=$(date +%s)
CUTOFF=$((NOW - DEPLOY_WINDOW))
RECENT=0
if [ -f "$DEPLOY_LOG" ]; then
  RECENT=$(awk -v cutoff="$CUTOFF" '$1 > cutoff' "$DEPLOY_LOG" 2>/dev/null | wc -l)
fi

if [ "$RECENT" -ge "$DEPLOY_LIMIT" ]; then
  echo "  !! Son 1 saatte $RECENT deploy yapildi (limit: $DEPLOY_LIMIT)"
  read -p "  Devam edilsin mi? (e/h): " CONFIRM
  if [ "$CONFIRM" != "e" ]; then
    echo "  Iptal edildi."
    exit 0
  fi
fi

echo "$NOW" >> "$DEPLOY_LOG"

echo "========================================="
echo "  DiptenZirveye Deploy (#$((RECENT + 1)) bu saat)"
echo "========================================="

echo ""
echo "[1/4] Lokal commit..."
git add -A
git commit -m "$MSG" || echo "  (commit edilecek degisiklik yok)"

echo ""
echo "[2/4] GitHub'a push..."
git push origin $BRANCH

echo ""
echo "[3/4] VPS guncelleniyor..."
ssh -i "$VPS_KEY" -o StrictHostKeyChecking=no "$VPS_USER@$VPS_HOST" "
  cd $VPS_REPO && \
  git pull origin $BRANCH && \
  npm run build && \
  pm2 restart $PM2_APP
"

echo ""
echo "========================================="
echo "[4/4] Deploy tamamlandi!"
echo ""
echo "  Site: $SITE_URL"
echo ""
echo "========================================="
