output "public_ips" {
  value = { for k, ip in azurerm_public_ip.pip : k => ip.ip_address }
}

output "private_ips" {
  value = { for k, nic in azurerm_network_interface.nic : k => nic.private_ip_address }
}