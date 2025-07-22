output "public_ips" {
  description = "Map of Public IPs for all VMs"
  value       = module.vm.public_ips
}

output "private_ips" {
  description = "Map of Private IPs for all VMs"
  value       = module.vm.private_ips
}

output "db_host" {
  value = module.postgres.db_host
}

output "dns_zone_name_servers" {
  value       = azurerm_dns_zone.public.name_servers
  description = "NS-сервери для делегування домену"
}
