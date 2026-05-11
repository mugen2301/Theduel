#!/usr/bin/env sh
set -eu

echo "Updating packages"
apt-get update
apt-get upgrade -y

echo "Installing base tooling"
apt-get install -y ca-certificates curl git ufw fail2ban unattended-upgrades

echo "Installing Docker"
install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
chmod a+r /etc/apt/keyrings/docker.asc
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo "$VERSION_CODENAME") stable" > /etc/apt/sources.list.d/docker.list
apt-get update
apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

echo "Configuring firewall"
ufw allow OpenSSH
ufw allow 80/tcp
ufw allow 443/tcp
ufw --force enable

echo "Enabling unattended upgrades"
dpkg-reconfigure -f noninteractive unattended-upgrades

echo "Bootstrap complete. Create /opt/theduel, clone the repo, copy env files, then run scripts/init-ssl.sh and scripts/deploy.sh."
